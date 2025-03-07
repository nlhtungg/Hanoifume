const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkAuth } = require('../middlewares/authMiddleware'); // Ensure correct import
const homeController = require('../controllers/homeController');

// Handle '/' based on login status
router.get('/', checkAuth, homeController.getHomePage);

// Authentication routes
router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);

module.exports = router;
