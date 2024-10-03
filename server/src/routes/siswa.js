import express from "express";
import conn from "../db.js";

const router = express.Router();

// get all siswa
router.get("/", async (_req, res) => {
  const siswa = await conn.query(`SELECT s.id_siswa, s.nama_siswa, kt.nama_kota_kabupaten, kc.nama_kecamatan, s.alamat_siswa
  FROM kota_kabupaten kt JOIN kota_kabupaten_kecamatan kc JOIN siswa s
  WHERE s.id_kecamatan = kc.id_kecamatan AND kc.id_kota_kabupaten = kt.id_kota_kabupaten
  ORDER BY s.id_siswa ASC`);
  res.json(siswa);
});

// add siswa
router.post("/tambah-siswa", async (req, res) => {
  console.log(req.body.id_kecamatan);
  const cekKecamatan = await conn.query(`SELECT id_kecamatan FROM kota_kabupaten_kecamatan WHERE nama_kecamatan = ?`, [req.body.id_kecamatan]);
  if (cekKecamatan.length === 0) {
    res.status(404).send({ status: "failed", message: "Nama kecamatan tidak ditemukan" });
  } else {
    const prepare = await conn.prepare(`INSERT INTO siswa (nama_siswa, id_kecamatan, alamat_siswa) VALUES (?, ?, ?)`);
    await prepare.execute([req.body.nama_siswa, cekKecamatan[0].id_kecamatan, req.body.alamat_siswa]);
    res.send({ status: "success" });
  }
});

// delete siswa
router.delete("/delete-siswa/:id", async (req, res) => {
  const prepare = await conn.prepare(`DELETE FROM siswa WHERE id_siswa = ?`);
  await prepare.execute([req.params.id]);
  res.send({ status: "success" });
});

// update siswa
router.put("/update-siswa/:id", async (req, res) => {
  const prepare = await conn.prepare(`UPDATE siswa SET nama_siswa = ?, id_kecamatan = ?, alamat_siswa = ? WHERE id_siswa = ?`);
  await prepare.execute([req.body.nama_siswa, req.body.id_kecamatan, req.body.alamat_siswa, req.params.id]);
  res.send({ status: "success" });
});

export default router;
