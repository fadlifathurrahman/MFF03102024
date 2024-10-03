import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function KelolaKecamatan() {
  const [kota, setKota] = useState([]); // Data kota
  const [kecamatan, setKecamatan] = useState([]); // Data kecamatan
  const [kecamatanSedangDiEdit, setKecamatanSedangDiEdit] = useState(null); // Untuk edit kecamatan
  const [formData, setFormData] = useState({
    // Data form untuk kecamatan
    id_kecamatan: "",
    nama_kecamatan: "",
    id_kota_kabupaten: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false); // State untuk menampilkan/menghilangkan form

  // Fetch data kota
  useEffect(() => {
    fetch(`http://localhost:3000/api/kota`)
      .then((res) => res.json())
      .then((data) => setKota(data));
  }, []);

  // Fetch data kecamatan
  useEffect(() => {
    fetch(`http://localhost:3000/api/kecamatan`)
      .then((res) => res.json())
      .then((data) => setKecamatan(data));
  }, []);

  // Handle edit kecamatan
  const handleEdit = (kec) => {
    setKecamatanSedangDiEdit(kec);
    setFormData({
      id_kecamatan: kec.id_kecamatan,
      nama_kecamatan: kec.nama_kecamatan,
      id_kota_kabupaten: kec.id_kota_kabupaten,
    });
  };

  // Handle delete kecamatan
  const handleDelete = (id_kecamatan) => {
    fetch(`http://localhost:3000/api/kecamatan/delete-kecamatan/${id_kecamatan}`, {
      method: "PUT",
    }).then((res) => {
      if (res.ok) {
        setKecamatan(kecamatan.filter((k) => k.id_kecamatan !== id_kecamatan));
        alert("Data Berhasil Dihapus");
      }
    });
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit untuk menambah kecamatan
  const handleSubmitAdd = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/kecamatan/tambah-kecamatan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_kecamatan: formData.nama_kecamatan,
        id_kota_kabupaten: formData.id_kota_kabupaten,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("Kecamatan berhasil ditambahkan");
        setKecamatan([...kecamatan, { ...formData, id_kecamatan: Date.now() }]); // Tambahkan kecamatan baru ke daftar
        setFormData({ id_kecamatan: "", nama_kecamatan: "", id_kota_kabupaten: "" }); // Reset form
      } else {
        alert("Nama kecamatan sudah ada atau ID kota tidak ditemukan");
      }
    });
    window.location.reload();
  };

  // Handle form submit untuk update kecamatan
  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/kecamatan/update-kecamatan/${formData.id_kecamatan}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_kecamatan: formData.nama_kecamatan,
        id_kota_kabupaten: formData.id_kota_kabupaten,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("Data Berhasil Diupdate");
        setKecamatanSedangDiEdit(null);
        setKecamatan(kecamatan.map((k) => (k.id_kecamatan === formData.id_kecamatan ? { ...k, ...formData } : k)));
      }
    });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <p className="text-5xl font-semibold mb-9">Kelola Data Kecamatan</p>

      {/* Tombol untuk menampilkan/menyembunyikan form */}
      <button onClick={() => setIsFormVisible(!isFormVisible)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        {isFormVisible ? "Sembunyikan Form" : "Tampilkan Form"}
      </button>

      {/* Form untuk tambah kecamatan */}
      {isFormVisible && (
        <form onSubmit={handleSubmitAdd} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_kecamatan">
              Nama Kecamatan
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="nama_kecamatan"
              value={formData.nama_kecamatan}
              onChange={handleChange}
              placeholder="Nama Kecamatan"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_kota_kabupaten">
              Pilih Kota/Kabupaten
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="id_kota_kabupaten"
              value={formData.id_kota_kabupaten}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Kota/Kabupaten</option>
              {kota.map((kt) => (
                <option key={kt.id_kota_kabupaten} value={kt.id_kota_kabupaten}>
                  {kt.nama_kota_kabupaten}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Tambah Kecamatan
          </button>
        </form>
      )}

      <section className="my-[30px] mx-auto bg-slate-700 rounded overflow-hidden border border-white">
        <TableContainer component={Paper} style={{ background: "transparent" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-[#0c1632]">
              <TableRow className="text-white">
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Id Kecamatan</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Nama Kecamatan</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Nama Kota</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kecamatan.map((k) => (
                <TableRow key={k.id_kecamatan} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    <p>{k.id_kecamatan}</p>
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    <p>{k.nama_kecamatan}</p>
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    <p>{k.nama_kota_kabupaten}</p>
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {kecamatanSedangDiEdit === k ? (
                      <form onSubmit={handleSubmitUpdate} className="flex flex-col gap-2">
                        <input className="text-black" type="text" name="nama_kecamatan" value={formData.nama_kecamatan} onChange={handleChange} placeholder="Nama Kecamatan" />
                        
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                          Simpan
                        </button>
                        <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => setKecamatanSedangDiEdit(null)}>
                          Batal
                        </button>
                      </form>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(k)} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(k.id_kecamatan)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                          Hapus
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
