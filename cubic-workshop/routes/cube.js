const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const express = require('express');
const { getCubeWithAccessories } = require('../controllers/cube');
const { authAccess, getUserStatus } = require('../controllers/user');
const jwt = require('jsonwebtoken');


const Cube = require('../models/cube');

const router = express.Router();

router.get('/create', authAccess, getUserStatus, (req, res) => {
    res.render('create', {
        title: 'Create Cube | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/create', authAccess, async (req, res) => {

    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const token = req.cookies['aid']
    const decodedObject = jwt.verify(token, config.privetKey);

    const cube = new Cube({
        name: name.trim(),
        description: description.trim(),
        imageUrl,
        difficulty: difficultyLevel,
        creatorId: decodedObject.userID
    });

    try {
        await cube.save();
        return res.redirect('/');

    } catch (err) {
        return res.render('create', {
            title: 'Create Cube | Cube Workshop',
            isLoggedIn: req.isLoggedIn,
            error: 'Cube details are not valid'
        });
    }

});

router.get('/details/:id', getUserStatus, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);

    res.render('details', {
        title: 'Details | Cube Workshop',
        ...cube,
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/edit/:id', authAccess, getUserStatus, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);

    res.render('editCubePage', {
        isLoggedIn: req.isLoggedIn,
        ...cube
    });
});

router.post('/edit/:id', authAccess, getUserStatus, async (req, res) => {
    const { _id } = await getCubeWithAccessories(req.params.id);
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    try {
        await Cube.updateOne({ _id }, {
            name: name.trim(),
            description: description.trim(),
            imageUrl,
            difficulty: difficultyLevel,
        });
        return res.redirect('/');
    } catch (err) {
        return res.redirect(`/details/${cube._id}`)
    }

});

router.get('/delete/:id', authAccess, getUserStatus, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);

    res.render('deleteCubePage', {
        isLoggedIn: req.isLoggedIn,
        ...cube
    });
});

router.post('/delete/:id', authAccess, getUserStatus, async (req, res) => {
    const { _id } = await getCubeWithAccessories(req.params.id);

    try {
        await Cube.deleteOne({ _id });
        return res.redirect('/');
    } catch (err) {
        return res.redirect(`/details/${cube._id}`)
    }

});


module.exports = router;