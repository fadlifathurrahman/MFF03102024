import { Link } from "react-router-dom";
import studentsImageURL from "../assets/students.png";
import mapImageURL from "../assets/map.png";

export default function Landing() {
  return (
    <div className="flex justify-center gap-24 h-screen items-center -mt-28">
      <Link to="/kelola-siswa">
        <div className="flex flex-col w-fit gap-5 justify-center items-center">
          <img src={studentsImageURL} alt="" className="w-36" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Kelola Data Siswa</button>
        </div>
      </Link>

      <div className="flex flex-col w-fit gap-5 justify-center items-center">
        <img src={mapImageURL} alt="" className="w-36" />
        <Link to="/kelola-kota">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Kelola Data Kota</button>
        </Link>
        <Link to="/kelola-kecamatan">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Kelola Data Kecamatan</button>
        </Link>
      </div>
    </div>
  );
}
