const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const express = require('express');
const { getCubeWithAccessories } = require('../controllers/cube');
const { checkAuthentication, getUserStatus } = require('../controllers/user');
const jwt = require('jsonwebtoken');


const Cube = require('../models/cube');

const router = express.Router();

router.get('/create', checkAuthentication, getUserStatus, (req, res) => {
    res.render('create', {
        title: 'Create Cube | Cube Workshop',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/create', (req, res) => {

    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const token = req.cookies['aid']
    const decodedObject = jwt.verify(token, config.privetKey);

    const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel, creatorId: decodedObject.userID });

    cube.save((err) => {
        if (err) {
            console.error(err);
            res.redirect('/create');
        } else {
            res.redirect('/');
        }
    });

});

router.get('/details/:id', getUserStatus, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);

    res.render('details', {
        title: 'Details | Cube Workshop',
        ...cube,
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/edit', checkAuthentication, getUserStatus, (req, res) => {
    res.render('editCubePage', {
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/delete', checkAuthentication, getUserStatus, (req, res) => {
    res.render('deleteCubePage', {
        isLoggedIn: req.isLoggedIn
    });
});



module.exports = router;