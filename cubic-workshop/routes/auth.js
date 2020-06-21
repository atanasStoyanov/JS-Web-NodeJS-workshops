const express = require('express');
const { saveUser, verifyUser, guestAccess, getUserStatus } = require('../controllers/user');

const User = require('../models/user');

const router = express.Router();

router.get('/login', guestAccess, getUserStatus, (req, res) => {
    const error = req.query.error ? 'Username or password is not correct' : null;

    res.render('loginPage', {
        isLoggedIn: req.isLoggedIn,
        error
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
    const {error} = await verifyUser(req, res);

    if (error) {
        return res.redirect('/login?error=true');
    }
 
    res.redirect('/');
});


module.exports = router;