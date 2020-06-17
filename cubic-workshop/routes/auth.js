const express = require('express');
const { saveUser, verifyUser } = require('../controllers/user');

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

    if (status) {
        return res.redirect('/');
    }

    res.redirect('/');
});

router.post('/login', async (req, res) => {
    const status = await verifyUser(req, res);
    console.log(req.cookies)
    if (status) {
        return res.redirect('/');
    }

    res.redirect('/');
});


module.exports = router;