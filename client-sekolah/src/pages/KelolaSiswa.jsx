import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

export default function KelolaSiswa() {
  const [siswa, setSiswa] = useState([]);
  const [siswaSedangDiEdit, setSiswaSedangDiEdit] = useState(null);
  const [formData, setFormData] = useState({
    id_siswa: "",
    nama_siswa: "",
    id_kecamatan: "",
    alamat_siswa: "",
  });
  const [kecamatanList, setKecamatanList] = useState([]);

  // Fetch data siswa
  useEffect(() => {
    fetch(`http://localhost:3000/api/siswa`)
      .then((res) => res.json())
      .then((data) => setSiswa(data));
  }, []);

  // Fetch data kecamatan
  useEffect(() => {
    fetch(`http://localhost:3000/api/kecamatan`)
      .then((res) => res.json())
      .then((data) => setKecamatanList(data));
  }, []);

  const handleEdit = (s) => {
    setSiswaSedangDiEdit(s);
    setFormData({
      id_siswa: s.id_siswa,
      nama_siswa: s.nama_siswa,
      id_kecamatan: s.id_kecamatan,
      alamat_siswa: s.alamat_siswa,
    });
  };

  const handleDelete = (id_siswa) => {
    fetch(`http://localhost:3000/api/siswa/delete-siswa/${id_siswa}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setSiswa(siswa.filter((s) => s.id_siswa !== id_siswa));
      }
    });
    alert("Data Berhasil Dihapus");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/siswa/update-siswa/${formData.id_siswa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        alert("Data Berhasil Diupdate");
        setSiswaSedangDiEdit(null); // Reset form edit
        setSiswa(siswa.map((s) => (s.id_siswa === formData.id_siswa ? { ...s, ...formData } : s)));
      }
    });
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <p className="text-5xl font-semibold">Kelola Data Siswa</p>

      <div className="mt-5">
        <Link to="/registrasi-siswa">
          <div className="flex w-fit gap-5 justify-center items-center">
            <p className="font-bold">Tambah siswa baru?</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Registrasi Siswa</button>
          </div>
        </Link>
      </div>

      <section className="my-[30px] mx-auto bg-slate-700 rounded overflow-hidden border border-white">
        <TableContainer component={Paper} style={{ background: "transparent" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-[#0c1632]">
              <TableRow className="text-white">
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Id Siswa</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Nama Siswa</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Kota/Kabupaten</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Kecamatan</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Alamat</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {siswa.map((s) => (
                <TableRow key={s.id_siswa} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    <p>{s.id_siswa}</p>
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    <p>{s.nama_siswa}</p>
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    <p>{s.nama_kota_kabupaten}</p>
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    <p>{s.nama_kecamatan}</p>
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    <p>{s.alamat_siswa}</p>
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {siswaSedangDiEdit === s ? (
                      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <input className="text-black" type="text" name="nama_siswa" value={formData.nama_siswa} onChange={handleChange} placeholder="Nama Siswa" />
                        <select className="text-black" name="id_kecamatan" value={formData.id_kecamatan} onChange={handleChange}>
                          <option value="">Pilih Kecamatan</option>
                          {kecamatanList.map((kc) => (
                            <option key={kc.id_kecamatan} value={kc.id_kecamatan}>
                              {kc.nama_kecamatan} - {kc.nama_kota_kabupaten}
                            </option>
                          ))}
                        </select>
                        <input className="text-black" type="text" name="alamat_siswa" value={formData.alamat_siswa} onChange={handleChange} placeholder="Alamat Siswa" />
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                          Simpan
                        </button>
                        <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => setSiswaSedangDiEdit(null)}>
                          Batal
                        </button>
                      </form>
                    ) : (
                      <div className="flex space-x-2">
                        <button type="button" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-yellow-600" onClick={() => handleEdit(s)}>
                          Edit
                        </button>
                        <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleDelete(s.id_siswa)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
}
