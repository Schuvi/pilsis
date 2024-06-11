const Kandidat = require('../models/kandidatModels');

exports.getKandidat = async (req, res) => {
    try {
        const kandidat = await Kandidat.getAllKandidat();
        res.render('kandidat/index', {kandidat});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.addKandidat = async (req, res) => {
    try {
        const {nama_kandidat, kelas, visi, misi, profiles} = req.body;
        await Kandidat.addKandidat({nama_kandidat, kelas, visi, misi, profiles});
        res.redirect('/kandidat');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getEditKandidat = async (req, res) => {
    try {
        const kandidat = await Kandidat.getEditKandidat(req.params.id);
        res.render('kandidat/edit', {kandidat});
    } catch (error) {
        res.status(500).send(error.message)
    }
};

exports.updateKandidat = async (req, res) => {
    try {
        const {nama_kandidat, kelas, visi, misi, profiles} = req.body;
        await Kandidat.updateKandidat(req.params.id, {nama_kandidat, kelas, visi, misi, profiles})
        res.redirect('/kandidat');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchKandidat = async (req, res) => {
    try {
        const nama_kandidat = req.query.nama_kandidat;
        const kandidat = await Kandidat.getKandidatByName(nama_kandidat);
        res.render('kandidat/search', {kandidat});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteKandidat = async (req, res) => {
    try {
        await Kandidat.deleteKandidat(req.params.id);
        res.redirect('/kandidat')
    } catch (error) {
        res.status(500).send(error.message);
    }
};