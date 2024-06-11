const mysql = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.getAllPemilih = async () => {
    const [rows] = await pool.query('SELECT * FROM pemilih');
    return rows;
};

exports.addPemilih = async () => {
    const {nama_pemilih, kelas, role} = pemilih;
    await pool.query('INSERT INTO pemilih (nama_pemilih, kelas, role) VALUES (?,?,?)', [nama_pemilih, kelas, role]);
};

exports.getPemilihByName = async (nama_pemilih) => {
    const [rows] = await pool.query('SELECT * FROM pemilih WHERE nama_pemilih = ?', [nama_pemilih]);
    return rows;
};

exports.updatePemilih = async (id_pemilih, pemilih) => {
    const {nama_pemilih, kelas, role} = pemilih;
    await pool.query('UPDATE pemilih SET nama_pemiih = ?, kelas = ?, role = ? WHERE id_pemilih = ?', [nama_pemilih, kelas, role, id_pemilih]);
};

exports.deletePemilih = async (id_pemilih) => {
    await pool.query('DELETE FROM pemilih WHERE id_pemilih = ?', [id_pemilih]);
}