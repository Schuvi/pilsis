module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.session.pengguna) {
            return next();
        }
        req.flash('error_msg', 'Silahkan Untuk Melakukan Login Terlebih Dahulu');
        res.redirect('/pengguna/login');
    },
    ensureAdmin: (req, res, next) => {
        if (req.session.pengguna && req.session.pengguna.role === 'admin') {
            return next();
        }
        req.flash('error_msg', 'Hanya Admin yang Dapat Mengakses Halaman Ini');
        res.redirect('/admin');
    }
};


