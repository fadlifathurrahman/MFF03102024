# MFF03102024

**MFF03102024** adalah proyek yang dikembangkan untuk Skill Test di PT. Nan Darma Kanigara (Poolapack). Repository ini berisi kode sumber dan dokumentasi terkait proyek tersebut.

## Daftar Isi

- [Fitur](#fitur)
- [Instalasi](#instalasi)
- [Instalasi Backend](#instalasi-backend)
- [Jalankan Query Basis Data](#instalasi-basis-data)
- [Instalasi Frontend](#instalasi-frontend)
- [Penggunaan](#penggunaan)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)

## Fitur

Beberapa fitur utama yang tersedia dalam proyek ini antara lain:

- Kelola Data Siswa
- Kelola Data Kota
- Kelola Data Kecamatan
  
## Instalasi

Berikut langkah-langkah untuk menginstal dan menjalankan proyek ini secara lokal:

1. Clone repository ini:
   ```bash
   git clone https://github.com/fadlifathurrahman/MFF03102024.git
   ```

## Instalasi Backend

1. Masuk ke direktori backend:
   ```bash
   cd server
   ```

2. Instal semua dependensi yang diperlukan:
   ```bash
   pnpm install
   ```
3. Menjalankan program:
   ```bash
   pnpm dev
   ```

## Jalankan Query Basis Data

Lokasi file basis data:

```
MFF03102024/
│
├── /client-sekolah/        # folder frontend   
└── /server/                # folder backend         
    └── sekolah.sql         # file query basis data
```
   
## Instalasi Frontend

1. Buka prompt terminal baru

2. Masuk ke direktori frontend:
   ```bash
   cd client-sekolah
   ```

3. Instal semua dependensi yang diperlukan:
   ```bash
   pnpm install
   ```
4. Menjalankan program:
   ```bash
   pnpm dev
   ```

## Penggunaan

Untuk menjalankan proyek secara lokal:

1. Buka browser dan akses alamat berikut:
   ```
   http://localhost:5173
   ```

## Teknologi yang Digunakan

Proyek ini dikembangkan menggunakan beberapa teknologi utama sebagai berikut:

- **Backend**: 
  - Node.js
  - Express.js
  - MySQL
- **Frontend**: 
  - React.js
- **Tools Lain**:
  - Tailwind CSS
