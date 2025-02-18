const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Login page
const getLoginPage = (req, res) => {
    error = null;
    res.render('login');
};

const postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.render('login', { error: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.pword);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid username or password' });
        }
        console.log(user);
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Register page
const getRegisterPage = (req, res) => {
    res.render('register');
};

const postRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.createUser( username, email, hashedPassword );
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

module.exports = { getLoginPage, postLogin, getRegisterPage, postRegister };