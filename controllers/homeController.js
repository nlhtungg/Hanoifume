const User = require('../models/user');
const Product = require('../models/product');

const getHomePage = async(req, res) => {
    if(!req.user) {
        return res.render('landing');
    }
    const bestSellers = await Product.getBestSellers(5);
    res.render('home', { user: req.user, bestSellers});
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

module.exports = 
{   
    getHomePage, 
    logout, 
    getCartPage, 
    getProfilePage 
};