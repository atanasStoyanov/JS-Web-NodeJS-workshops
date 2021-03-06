const { Router } = require('express');
const { getAccessories } = require('../controllers/accessory');
const { getCube, updateCube } = require('../controllers/cube');
const { authAccess, getUserStatus } = require('../controllers/user');

const Accessory = require('../models/accessory');

const router = Router();

router.get('/create/accessory', authAccess, getUserStatus, (req, res) => {
    res.render('createAccessory', {
        title: "Create Accessory",
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/create/accessory', authAccess, getUserStatus, async (req, res) => {
    const {
        name,
        imageUrl,
        description
    } = req.body;

    const accessory = new Accessory({ name, imageUrl, description });

    try {
        await accessory.save();
        res.render('createAccessory', {
            title: "Create Accessory",
            isLoggedIn: req.isLoggedIn
        });

    } catch (err) {
        res.render('createAccessory', {
            title: "Create Accessory",
            isLoggedIn: req.isLoggedIn,
            error: 'Accessory details are not valid'
        });
    }

});

router.get('/attach/accessory/:id', authAccess, getUserStatus, async (req, res) => {
    const cube = await getCube(req.params.id);
    const accessories = await getAccessories();

    const cubeAccessories = cube.accessories.map(acc => acc._id.valueOf().toString());

    const notAttchedAccessories = accessories.filter(acc => {
        const accessoryString = acc._id.valueOf().toString();

        return !cubeAccessories.includes(accessoryString);
    });

    const canAttachAccessory = cube.accessories.length !== accessories.length && accessories.length > 0;

    res.render('attachAccessory', {
        title: 'Attach Accessory',
        ...cube,
        accessories: notAttchedAccessories,
        canAttachAccessory,
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/attach/accessory/:id', authAccess, async (req, res) => {
    const {
        accessory
    } = req.body;

    await updateCube(req.params.id, accessory);

    res.redirect(`/details/${req.params.id}`);
});

module.exports = router;