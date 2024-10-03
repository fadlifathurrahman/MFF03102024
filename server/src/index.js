import "dotenv/config";

import cors from "cors";
import express from "express";

import routerSiswa from "./routes/siswa.js";
import routerKota from "./routes/kota.js";
import routerKecamatan from "./routes/kota_kecamatan.js";

export const app = express();

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// json
app.use(express.json());

// routes
const router = express.Router();
app.use("/api", router);
router.use("/siswa", routerSiswa);
router.use("/kota", routerKota);
router.use("/kecamatan", routerKecamatan);

// server
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
