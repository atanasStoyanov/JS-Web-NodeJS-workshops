const {Router} = require('express');
const {getCubes} = require('../controllers/cube');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Cube Workshop',
        cubes: getCubes()
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube Workshop'
    });
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Cube | Cube Workshop'
    });
})

router.get('/details/:id', (req, res) => {
    res.render('details', {
        title: 'Details | Cube Workshop'
    });
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error Page | Cube Workshop'
    });
})

module.exports = router;