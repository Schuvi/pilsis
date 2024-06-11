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
    }
}