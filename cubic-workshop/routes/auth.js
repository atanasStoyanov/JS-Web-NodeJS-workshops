const express = require('express');
const { saveUser, verifyUser, guestAccess, getUserStatus } = require('../controllers/user');

const User = require('../models/user');

const router = express.Router();

router.get('/login', guestAccess, getUserStatus, (req, res) => {
    res.render('loginPage', {
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/signup', guestAccess, getUserStatus, (req, res) => {
    const error = req.query.error ? 'Username or password is not valid' : null;

    res.render('registerPage', {
        isLoggedIn: req.isLoggedIn,
        error
    });
});

router.post('/signup', async (req, res) => {
    const {error} = await saveUser(req, res);

    if (error) {
        return res.redirect('/signup?error=true');
    }

    return res.redirect('/');
});

router.post('/login', async (req, res) => {
    const status = await verifyUser(req, res);

    if (status) {
        return res.redirect('/');
    }
 
    res.redirect('/');
});


module.exports = router;