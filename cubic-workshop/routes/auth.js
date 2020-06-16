const express = require('express');
const bcrypt = require('bcrypt');
const {saveUser} = require('../controllers/user');

const User = require('../models/user');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.get('/signup', (req, res) => {
    res.render('registerPage');
});

router.post('/signup', async (req, res) => {
    const status = await saveUser(req, res);

    if(status) {
        return res.redirect('/');
    }

    res.redirect('/');
});

module.exports = router;