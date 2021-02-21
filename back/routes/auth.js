const express = require('express');
const router = express.Router();

const { signup, signin, signout } = require('../controllers/auth');
const { userSingupValidator } = require('../validator');

// Routes
router.post('/signup', userSingupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;
