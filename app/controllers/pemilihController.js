const Pemilih = require('../models/pemilihModels');

exports.getPemilih = async (req, res) => {
    try {
        const pemilih = await Pemilih.getAllPemilih();
        res.render('pemilih/index', {pemilih});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.addPemilih = async (req, res) => {
    try {
        const {nama_pemilih, kelas, role} = req.body
        await Pemilih.addPemilih({nama_pemilih, kelas, role});
        res.redirect('/kandidat');
    } catch (error) {
        res.status(500).send(error.message)
    }
};

exports.getEditPemilih = async (req, res) => {
    try {
        const pemilih = await Pemilih.getEditPemilih(req.params.id);
        res.render('pemilih/edit', {pemilih});
    } catch (error) {
        res.status(500).send(error.message)
    }
};

exports.addPemilih = async (req, res) => {
    try {
        const {nama_pemilih, kelas, role} = req.body
        await Pemilih.addPemilih(req.params.id, {nama_pemilih, kelas, role});
        res.redirect('/kandidat');
    } catch (error) {
        res.status(500).send(error.message)
    }
};

exports.searchPemilih = async (req, res) => {
    try {
        const nama_pemilih = req.query.nama_pemilih;
        const pemilih = await Pemilih.getPemilihByName(nama_pemilih);
        res.render('pemilih/search', {pemilih});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deletePemilih = async (req, res) => {
    try {
        await Pemilih.deletePemilih(req.params.id);
        res.redirect('/pemilih');
    } catch (error) {
        res.status(500).send(error.message);
    }
};