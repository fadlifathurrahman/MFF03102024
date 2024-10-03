import mariadb from 'mariadb';
import "dotenv/config";

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const conn = await pool.getConnection();
console.log('Connected to database');

export default conn;