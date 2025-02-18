const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkAuth } = require('../middlewares/authMiddleware'); // Ensure correct import

// Handle '/' based on login status
router.get('/', checkAuth, (req, res) => {
    console.log(req.user); 
    if (req.user) {
        return res.render('home'); // If logged in, show home page
    }
    return res.render('landing'); // If not logged in, show landing page
});

// Authentication routes
router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);

module.exports = router;
