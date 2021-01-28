const User = require('../models/user');

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome to SecureVault!');
    const redirectUrl = req.session.returnTo || '/'
    const user = req.user;
    req.session.user = user;
    req.session.save();
    res.redirect(redirectUrl);
}

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { name, email, username, password } = req.body;

        const user = new User({ name, email, username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to SecureVault!');
            res.redirect('/');
        })
    }
    catch (e) {
        res.send(e)
    }
}

module.exports.logout = (req, res) => {
    req.logout();
    delete req.session.user;
    req.flash('success', 'Goodbye!');
    res.redirect('/login');
}