const mysql2 = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.getAllKandidat = async () => {
    const [rows] = await pool.query('SELECT * FROM kandidat');
    return rows;
};

exports.addKandidat = async (kandidat) => {
    const {nama_kandidat, kelas, visi, misi, profiles} = kandidat;
    await pool.query('INSERT INTO kandidat (nama_kandidat, kelas, visi, misi, profile) VALUES (?, ?, ?, ?, ?)', [nama_kandidat, kelas, visi, misi, profiles]);
};

exports.addPemilih = async () => {
    const {nama_pemilih, kelas, role} = pemilih;
    await pool.query('INSERT INTO pemilih (nama_pemilih, kelas, role) VALUES (?,?,?)', [nama_pemilih, kelas, role]);
};

exports.getKandidatByName = async (nama_kandidat) => {
    const [rows] = await pool.query('SELECT * FROM kandidat WHERE nama_kandidat = ?', [nama_kandidat]);
    return rows;
};

exports.updateKandidat = async (id_kandidat, kandidat) => {
    const {nama_kandidat, kelas, visi, misi, profiles} = kandidat;
    await pool.query('UPDATE kandidat SET nama_kandidat = ?, kelas = ?, visi = ?, misi = ?, profiles = ? WHERE id_kandidat = ?', [nama_kandidat, kelas, visi, misi, profiles, id_kandidat]);
};