import { useEffect, useState } from "react";

export default function RegistrasiSiswa() {
  const [siswa, setSiswa] = useState([]);
  const [siswaBaru, setSiswaBaru] = useState("");
  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [alamat, setAlamat] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/siswa`)
      .then((res) => res.json())
      .then((siswa) => setSiswa(siswa));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/kota/`)
      .then((res) => res.json())
      .then((kota) => setKota(kota));
  }, []);

  const handleKotaChange = (e) => {
    const kotaId = e.target.value;
    fetch(`http://localhost:3000/api/kecamatan/kota/${kotaId}`)
      .then((res) => res.json())
      .then((kecamatan) => setKecamatan(kecamatan));
  };

  const handleKecamatanChange = (e) => {
    console.log(e.target.value);
    setSelectedKecamatan(e.target.value);
  };

  const handleAddSiswa = () => {
    fetch(`http://localhost:3000/api/siswa/tambah-siswa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_siswa: siswaBaru,
        id_kecamatan: selectedKecamatan,
        alamat_siswa: alamat,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setSiswaBaru("");
          setAlamat("");
          setSelectedKecamatan("");
          alert("Data siswa berhasil ditambahkan");
        } else {
          alert("Gagal menambahkan siswa");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Terjadi kesalahan saat menambahkan siswa");
      });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <p className="text-5xl font-semibold">Registrasi Siswa Baru</p>
      <div className="flex flex-col gap-5 mt-10">
        <form>
          <div className="flex flex-col items-center">
            <p>Nama Siswa</p>
            <input type="text" value={siswaBaru} onChange={(e) => setSiswaBaru(e.target.value)} className="p-2 border border-gray-300 rounded-md text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nama siswa" />
          </div>

          <div className="flex flex-col items-center">
            <p>Kota/Kabupaten</p>
            <select className="p-2 border border-gray-300 rounded-md text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleKotaChange}>
              <option value="">-- Pilih Kota/Kabupaten --</option>
              {kota.map((k) => (
                <option key={k.id_kota_kabupaten} value={k.id_kota_kabupaten}>
                  {k.nama_kota_kabupaten}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center">
            <p>Kecamatan</p>
            <select className="p-2 border border-gray-300 rounded-md text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={selectedKecamatan} onChange={handleKecamatanChange}>
              <option value="">-- Pilih Kecamatan --</option>
              {kecamatan.map((kc) => (
                <option key={kc.id_kecamatan} value={kc.id_kecamatan}>
                  {kc.nama_kecamatan}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center">
            <p>Alamat</p>
            <textarea value={alamat} onChange={(e) => setAlamat(e.target.value)} className="p-2 border border-gray-300 rounded-md text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Alamat siswa" />
          </div>
        </form>

        <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleAddSiswa}>
          Daftarkan Siswa
        </button>
      </div>
    </div>
  );
}
