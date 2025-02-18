const User = require('../models/user');

const getHomePage = (req, res) => {
    if(!req.user) {
        return res.redirect('/');
    }
    res.render('home', { user: req.user });
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
}

const getCartPage = (req, res) => {
    
}

const getProfilePage = async(req, res) => {
    const user = await User.findById(req.user.userId);
    res.render('profile', { user });
}

module.exports = { getHomePage, logout, getCartPage, getProfilePage };