const { Router } = require('express');
const { getAllCubes } = require('../controllers/cube');

const Cube = require('../models/cube');
const Accessory = require('../models/accessory');


const router = Router();

router.get('/', async (req, res) => {
    const cubes = await getAllCubes();

    res.render('index', {
        title: 'Cube Workshop',
        cubes
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop'
    });
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error Page | Cube Workshop'
    });
});

module.exports = router;