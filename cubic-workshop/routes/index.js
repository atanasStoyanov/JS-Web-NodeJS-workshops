const { Router } = require('express');
const { getAllCubes, getCube, updateCube } = require('../controllers/cube');
const { getAccessories } = require('../controllers/accessory');

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

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Cube | Cube Workshop'
    });
});

router.post('/create', (req, res) => {

    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel });

    cube.save((err) => {
        if (err) {
            console.error(err);
            res.redirect('/create');
        } else {
            res.redirect('/');
        }
    });

});

router.get('/details/:id', async (req, res) => {
    const cube = await getCube(req.params.id);

    res.render('details', {
        title: 'Details | Cube Workshop',
        ...cube
    });
});

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: "Create Accessory"
    });
});

router.post('/create/accessory', async (req, res) => {
    const {
        name,
        imageUrl,
        description
    } = req.body;

    const accessory = new Accessory({ name, imageUrl, description });

    await accessory.save((err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/create/accessory')
        }
    });
});

router.get('/attach/accessory/:id', async (req, res) => {
    const cube = await getCube(req.params.id);
    const accessories = await getAccessories();

    const canAttachAccessory = cube.accessories.length !== accessories.length && accessories.length > 0;

    res.render('attachAccessory', {
        title: 'Attach Accessory',
        ...cube,
        accessories,
        canAttachAccessory
    });
});

router.post('/attach/accessory/:id', async (req, res) => {
    const {
        accessory
    } = req.body;

    await updateCube(req.params.id, accessory);

    res.redirect(`/details/${req.params.id}`);
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error Page | Cube Workshop'
    });
});

module.exports = router;