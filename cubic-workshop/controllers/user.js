const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const privetKey = 'CUBE-WORKSHOP-SOFTUNI';

const generateToke = data => {
    const token = jwt.sign(data, privetKey);
    return token;
}

const saveUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    //hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username,
        password: hashedPassword
    });

    const userObject = await user.save();

    const token = generateToke({
        userID: userObject._id,
        username: userObject.username
    });

    res.cookie('aid', token);

    return true;

}

const verifyUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const user = await User.findOne({ username });

    const status = bcrypt.compare(password, user.password);

    if (status) {
        const token = generateToke({
            userID: user._id,
            username: user.username
        });
        res.cookie('aid', token);

    }


    return status;
}

module.exports = {
    saveUser,
    verifyUser
}