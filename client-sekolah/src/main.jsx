import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import KelolaSiswa from "./pages/KelolaSiswa.jsx";
import RegistrasiSiswa from "./pages/RegistrasiSiswa.jsx";
import KelolaKota from "./pages/KelolaKota.jsx";
import KelolaKecamatan from "./pages/KelolaKecamatan.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/kelola-siswa",
        element: <KelolaSiswa />,
      },
      {
        path: "/registrasi-siswa",
        element: <RegistrasiSiswa />,
      },
      {
        path: "/kelola-kota",
        element: <KelolaKota />,
      },
      {
        path: "/kelola-kecamatan",
        element: <KelolaKecamatan />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
