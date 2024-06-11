const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.getAllPengguna = async () => {
    const [rows] = await pool.query('SELECT * FROM pengguna');
    return rows;
};

exports.addPengguna = async () => {
    const {username, password, role} = pengguna;
    const hashedPassword = await bcrypt.hash(password, 15)
    await pool.query('INSERT INTO pengguna (username, password, role) VALUES (?,?,?)', [username, hashedPassword, role]);
};

exports.getPenggunaByName = async (username) => {
    const [rows] = await pool.query('SELECT * FROM pengguna WHERE username = ?', [username]);
    return rows;
};

exports.updatePengguna = async (id_user, pengguna) => {
    const {username, password, role} = pengguna;
    await pool.query('UPDATE pengguna SET username = ?, password = ?, role = ? WHERE id_user = ?', [username, password, role, id_user]);
};

exports.deletePengguna = async (id_user) => {
    await pool.query('DELETE FROM pengguna WHERE id_user = ?', [id_user]);
}

exports.comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};