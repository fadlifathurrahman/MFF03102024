import express from "express";
import conn from "../db.js";

const router = express.Router();

// get all kota
router.get("/", async (_req, res) => {
  const kota = await conn.query(`SELECT id_kota_kabupaten,  nama_kota_kabupaten
  FROM kota_kabupaten 
  WHERE nama_kota_kabupaten != "Kota sudah dihapus"
  ORDER BY id_kota_kabupaten ASC`);
  res.json(kota);
});

// add kota
router.post("/tambah-kota", async (req, res) => {
  const cekKota = await conn.query(`SELECT nama_kota_kabupaten FROM kota_kabupaten WHERE nama_kota_kabupaten = ?`, [req.body.nama_kota]);
  if (cekKota.length > 0) {
    res.status(403).send({ status: "failed", message: "Nama kota sudah ada" });
  } else {
    const prepare = await conn.prepare(`INSERT INTO kota_kabupaten (nama_kota_kabupaten) VALUES (?)`);
    await prepare.execute([req.body.nama_kota]);
    res.send({ status: "success" });
  }
});

// delete kota
router.put("/delete-kota/:id", async (req, res) => {
  const cekId = await conn.query(`SELECT id_kota_kabupaten FROM kota_kabupaten WHERE id_kota_kabupaten = ?`, [req.params.id]);
  if (cekId.length === 0) {
    res.status(404).send({ status: "failed", message: "ID kota tidak ditemukan" });
  } else {
    const prepare = await conn.prepare(`UPDATE kota_kabupaten SET nama_kota_kabupaten = "Kota sudah dihapus" WHERE id_kota_kabupaten = ?`);
    await prepare.execute([req.params.id]);
    res.send({ status: "success" });
  }
});

// update kota
router.put("/update-kota/:id", async (req, res) => {
  const cekId = await conn.query(`SELECT id_kota_kabupaten FROM kota_kabupaten WHERE id_kota_kabupaten = ?`, [req.params.id]);
  if (cekId.length === 0) {
    res.status(404).send({ status: "failed", message: "ID kota tidak ditemukan" });
  } else {
    const cekNama = await conn.query(`SELECT nama_kota_kabupaten FROM kota_kabupaten WHERE nama_kota_kabupaten = ? AND id_kota_kabupaten != ?`, [req.body.nama_kota, req.params.id]);
    if (cekNama.length > 0) {
      res.status(403).send({ status: "failed", message: "Nama kota sudah ada" });
    } else {
      const prepare = await conn.prepare(`UPDATE kota_kabupaten SET nama_kota_kabupaten = ? WHERE id_kota_kabupaten = ?`);
      await prepare.execute([req.body.nama_kota, req.params.id]);
      res.send({ status: "success" });
    }
  }
});

export default router;
