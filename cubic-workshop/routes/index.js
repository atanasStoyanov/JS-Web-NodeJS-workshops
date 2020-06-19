const { Router } = require('express');
const { getAllCubes } = require('../controllers/cube');
const { getUserStatus } = require('../controllers/user');

const Cube = require('../models/cube');
const Accessory = require('../models/accessory');


const router = Router();

router.get('/', getUserStatus, async (req, res) => {
    const cubes = await getAllCubes();

    res.render('index', {
        title: 'Cube Workshop',
        cubes,
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('aid');

    res.redirect('/');
});

router.get('/about', getUserStatus, (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error Page | Cube Workshop'
    });
});

module.exports = router;