const Pengguna = require('../models/penggunaModels');

exports.getRegister = (req, res) => {
    res.render('user/register', {title: 'Register - Pilsis'});
}

exports.registerUser = async (req, res) => {
    const {username, password, role, confirmPassword} = req.body;

    if (password !== confirmPassword) {
        req.flash('error msg', 'Password tidak sama!');
        return res.redirect('/pengguna/register')
    }

    try {
        const existingUser = await Pengguna.getPenggunaByName(username);
        if (existingUser) {
            req.flash('error_msg', 'Username sudah ada');
            return res.redirect('/pengguna/register')
        }

        await Pengguna.addPengguna({username, password, role});
        req.flash('success_msg', 'Register akun berhasil');
        res.redirect('/pengguna/login');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getLogin = (req, res) => {
    res.render('pengguna/login', {title: 'Login - Pilsis'});
}

exports.loginPengguna = async (req, res) => {
    const {username, password} = req.body;

    try {
        const pengguna = await Pengguna.getPenggunaByName(username);
        if (!pengguna) {
            req.flash('error_msg', 'Pengguna Tidak Ditemukan');
            return res.redirect('/pengguna/login');
        }

        const isMatch = await Pengguna.comparePassword(pasword, pengguna.password);
        if (!isMatch) {
            req.flash('error_msg', 'Password salah');
            return res.redirect('pengguna/login');
        }

        req.session.user = user;
        req.flash('success_msg', 'Anda Berhasil Login');
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.redirect('/');
    });
};

exports.getAllPengguna = async (req, res) => {
    try {
        const pengguna = await Pengguna.getAllPengguna();
        res.render('pengguna/search', {pengguna});
    } catch (error) {
        res.status(500).send(error_message);
    }
};

exports.getPenggunaByName = async (req, res) => {
    try {
        const username = req.query.username;
        const pengguna = await Pengguna.getPenggunaByName(username);
        res.render('pengguna/search');
   } catch (error) {
    res.status(500).send(error_message);
   }
};