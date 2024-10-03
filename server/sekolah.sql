DROP DATABASE IF EXISTS sekolah;
CREATE DATABASE IF NOT EXISTS sekolah;
USE sekolah;

CREATE TABLE kota_kabupaten(
	id_kota_kabupaten INT AUTO_INCREMENT,
	nama_kota_kabupaten VARCHAR(256),
	PRIMARY KEY(id_kota_kabupaten)	
);
INSERT INTO kota_kabupaten (nama_kota_kabupaten) VALUES
	("Kota Bandung"),
	("Kota Cimahi"),
	("Kabupaten Bandung Barat");

CREATE TABLE kota_kabupaten_kecamatan(
	id_kecamatan INT AUTO_INCREMENT,
	nama_kecamatan VARCHAR(256),
	id_kota_kabupaten INT,
	PRIMARY KEY(id_kecamatan),
	CONSTRAINT kota FOREIGN KEY (id_kota_kabupaten) REFERENCES kota_kabupaten (id_kota_kabupaten)

);
INSERT INTO kota_kabupaten_kecamatan (nama_kecamatan, id_kota_kabupaten) VALUES
	("Antapani" 		, 1),
	("Bandung Timur"	, 1),
	("Batujajar" 		, 3),
	("Cimahi Selatan" 	, 2),
	("Cimahi Tengah"	, 2),
	("Cimahi Utara"		, 2),
	("Lembang"		, 3),
	("Padalarang" 		, 3);
	
CREATE TABLE siswa (
	id_siswa INT AUTO_INCREMENT,
	nama_siswa VARCHAR(256),
	id_kecamatan INT,
	alamat_siswa TEXT,
	PRIMARY KEY(id_siswa),
	CONSTRAINT kecamatan FOREIGN KEY (id_kecamatan) REFERENCES kota_kabupaten_kecamatan (id_kecamatan)
);
INSERT INTO siswa (nama_siswa, id_kecamatan, alamat_siswa) VALUES
	("Agus"		, 2, "Alamat Siswa"),
	("Budi"		, 6, "Alamat Siswa"),
	("Nana"		, 8, "Alamat Siswa"),
	("Bambang"	, 8, "Alamat Siswa"),
	("Fitri"	, 5, "Alamat Siswa"),
	("Bagus"	, 1, "Alamat Siswa"),
	("Hartoko"	, 1, "Alamat Siswa"),
	("Dadan"	, 7, "Alamat Siswa"),
	("Ceceng"	, 4, "Alamat Siswa"),
	("Ilham"	, 2, "Alamat Siswa"),
	("Iqbal"	, 3, "Alamat Siswa"),
	("Adi"		, 5, "Alamat Siswa");

