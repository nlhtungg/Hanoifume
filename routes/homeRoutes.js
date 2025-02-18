const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { checkAuth } = require('../middlewares/authMiddleware');

router.get('/home', checkAuth, homeController.getHomePage);
router.get('/logout', homeController.logout);
router.get('/cart', homeController.getCartPage);
router.get('/profile', checkAuth, homeController.getProfilePage);

module.exports = router;
