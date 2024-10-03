import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function KelolaKota() {
  const [kota, setKota] = useState([]); // Data kota
  const [kotaSedangDiEdit, setKotaSedangDiEdit] = useState(null); // Untuk edit kota
  const [formData, setFormData] = useState({
    id_kota_kabupaten: "",
    nama_kota_kabupaten: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false); // State untuk kontrol tampilan form

  // Fetch data kota
  useEffect(() => {
    fetch(`http://localhost:3000/api/kota`)
      .then((res) => res.json())
      .then((data) => setKota(data));
  }, []);

  // Handle edit kota
  const handleEdit = (kt) => {
    setKotaSedangDiEdit(kt);
    setFormData({
      id_kota_kabupaten: kt.id_kota_kabupaten,
      nama_kota_kabupaten: kt.nama_kota_kabupaten,
    });
  };

  // Handle delete kota
  const handleDelete = (id_kota) => {
    fetch(`http://localhost:3000/api/kota/delete-kota/${id_kota}`, {
      method: "PUT", 
    }).then((res) => {
      if (res.ok) {
        setKota(kota.filter((k) => k.id_kota_kabupaten !== id_kota));
        alert("Data Kota Berhasil Dihapus");
      }
    });
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit untuk menambah kota
  const handleSubmitAdd = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/kota/tambah-kota`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_kota: formData.nama_kota_kabupaten,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("Kota berhasil ditambahkan");
        setKota([...kota, { ...formData, id_kota_kabupaten: Date.now() }]); // Tambahkan kota baru ke daftar
        setFormData({ id_kota_kabupaten: "", nama_kota_kabupaten: "" }); // Reset form
        setIsFormVisible(false); // Sembunyikan form setelah penambahan
      } else {
        alert("Nama kota sudah ada");
      }
    });
    window.location.reload();
  };

  // Handle form submit untuk update kota
  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/kota/update-kota/${formData.id_kota_kabupaten}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_kota: formData.nama_kota_kabupaten,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("Data Kota Berhasil Diupdate");
        setKotaSedangDiEdit(null);
        setKota(kota.map((k) => (k.id_kota_kabupaten === formData.id_kota_kabupaten ? { ...k, ...formData } : k)));
      }
    });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <p className="text-5xl font-semibold mb-9">Kelola Data Kota</p>

      {/* Button untuk toggle form tambah kota */}
      <button onClick={() => setIsFormVisible(!isFormVisible)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        {isFormVisible ? "Tuttup Form" : "Tampilkan Form Tambah Kota"}
      </button>

      {/* Form untuk tambah kota */}
      {isFormVisible && (
        <form onSubmit={handleSubmitAdd} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_kota_kabupaten">
              Nama Kota
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="nama_kota_kabupaten"
              value={formData.nama_kota_kabupaten}
              onChange={handleChange}
              placeholder="Nama Kota"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Tambah Kota
          </button>
        </form>
      )}

      <section className="my-[30px] mx-auto bg-slate-700 rounded overflow-hidden border border-white">
        <TableContainer component={Paper} style={{ background: "transparent" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-[#0c1632]">
              <TableRow className="text-white">
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Id Kota</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Nama Kota</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kota.map((k) => (
                <TableRow key={k.id_kota_kabupaten} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    <p>{k.id_kota_kabupaten}</p>
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    <p>{k.nama_kota_kabupaten}</p>
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {kotaSedangDiEdit === k ? (
                      <form onSubmit={handleSubmitUpdate} className="flex flex-col gap-2">
                        <input className="text-black" type="text" name="nama_kota_kabupaten" value={formData.nama_kota_kabupaten} onChange={handleChange} placeholder="Nama Kota" />
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                          Simpan
                        </button>
                        <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => setKotaSedangDiEdit(null)}>
                          Batal
                        </button>
                      </form>
                    ) : (
                      <div className="flex space-x-2">
                        <button type="button" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-yellow-600" onClick={() => handleEdit(k)}>
                          Edit
                        </button>
                        <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleDelete(k.id_kota_kabupaten)}>
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
