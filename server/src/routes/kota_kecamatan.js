import express from "express";
import conn from "../db.js";

const router = express.Router();

// get all kecamatan
router.get("/", async (_req, res) => {
  const kecamatan = await conn.query(`SELECT kc.id_kecamatan , kc.nama_kecamatan, kt.nama_kota_kabupaten
FROM kota_kabupaten kt JOIN kota_kabupaten_kecamatan kc
WHERE kc.id_kota_kabupaten = kt.id_kota_kabupaten and kc.nama_kecamatan != "Kecamatan sudah dihapus"
ORDER BY kc.id_kecamatan ASC`);
  res.json(kecamatan);
});

// get all kecamatan by id nama_kota_kabupaten
router.get("/kota/:id", async (req, res) => {
  const kecamatan = await conn.query(
    `SELECT kc.nama_kecamatan
FROM kota_kabupaten kt JOIN kota_kabupaten_kecamatan kc
WHERE kc.id_kota_kabupaten = ?
GROUP BY kc.id_kecamatan
ORDER BY kc.nama_kecamatan ASC`,
    [req.params.id] 
  );
  res.json(kecamatan);
});

// add kecamatan
router.post("/tambah-kecamatan", async (req, res) => {
  const cekKecamatan = await conn.query(`SELECT nama_kecamatan FROM kota_kabupaten_kecamatan WHERE nama_kecamatan = ?`, [req.body.nama_kecamatan]);
  const cekIdKota = await conn.query(`SELECT id_kota_kabupaten FROM kota_kabupaten WHERE id_kota_kabupaten = ?`, [req.body.id_kota_kabupaten]);
  if (cekKecamatan.length > 0) {
    res.status(403).send({ status: "failed", message: "Nama kecamatan sudah ada" });
  } else if (cekIdKota.length === 0) {
    res.status(404).send({ status: "failed", message: "ID kota tidak ditemukan" });
  } else {
    const prepare = await conn.prepare(`INSERT INTO kota_kabupaten_kecamatan (nama_kecamatan, id_kota_kabupaten) VALUES (?, ?)`);
    await prepare.execute([req.body.nama_kecamatan, req.body.id_kota_kabupaten]);
    res.send({ status: "success" });
  }
});

// delete kecamatan
router.put("/delete-kecamatan/:id", async (req, res) => {
  const cekId = await conn.query(`SELECT id_kecamatan FROM kota_kabupaten_kecamatan WHERE id_kecamatan = ?`, [req.params.id]);
  if (cekId.length === 0) {
    res.status(404).send({ status: "failed", message: "ID kecamatan tidak ditemukan" });
  } else {
    const prepare = await conn.prepare(`UPDATE kota_kabupaten_kecamatan SET nama_kecamatan = "Kecamatan sudah dihapus" WHERE id_kecamatan = ?`);
    await prepare.execute([req.params.id]);
    res.send({ status: "success" });
  }
});

// update kecamatan
router.put("/update-kecamatan/:id", async (req, res) => {
  const cekId = await conn.query(`SELECT id_kecamatan FROM kota_kabupaten_kecamatan WHERE id_kecamatan = ?`, [req.params.id]);
  if (cekId.length === 0) {
    res.status(404).send({ status: "failed", message: "ID kecamatan tidak ditemukan" });
  } else {
    const cekNama = await conn.query(`SELECT nama_kecamatan FROM kota_kabupaten_kecamatan WHERE nama_kecamatan = ? AND id_kecamatan != ?`, [req.body.nama_kota_kabupaten, req.params.id]);
    if (cekNama.length > 0) {
      res.status(403).send({ status: "failed", message: "Nama kecamatan sudah ada" });
    } else {
      const prepare = await conn.prepare(`UPDATE kota_kabupaten_kecamatan SET nama_kecamatan = ? WHERE id_kecamatan = ?`);
      await prepare.execute([req.body.nama_kecamatan, req.params.id]);
      res.send({ status: "success" });
    }
  }
});

export default router;
