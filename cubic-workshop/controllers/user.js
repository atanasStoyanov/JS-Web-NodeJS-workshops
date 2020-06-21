const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToke = data => {
    const token = jwt.sign(data, config.privetKey);
    return token;
}

const saveUser = async (req, res) => {
    const {
        username,
        password,
        repeatPassword
    } = req.body;

    try {
        if (password.length < 8 || !password.match(/^[A-Za-z0-9 ]+$/)) {
            throw new Error('Invalid password');
        } else if (password !== repeatPassword) {
            throw new Error('Passwords do not match');
        }

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

        return token;
    } catch (err) {
        return {
            error: true,
            message: err
        }
    }

}

const verifyUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return {
                error: true,
                message: 'There is no such user'
            }
        }

        const status = await bcrypt.compare(password, user.password);

        if (status) {
            const token = generateToke({
                userID: user._id,
                username: user.username
            });

            res.cookie('aid', token);
        }

        return {
            error: !status,
            message: status || 'Wrong password'
        };

    } catch (err) {
        return {
            error: true,
            message: 'There is no such user',
            status
        }
    }

}

const authAccess = (req, res, next) => {
    const token = req.cookies['aid'];

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decodedObject = jwt.verify(token, config.privetKey);
        next()
    } catch (err) {
        res.redirect('/');
    }

}

const authAccessJSON = (req, res, next) => {
    const token = req.cookies['aid'];

    if (!token) {
        return res.json({
            error: "Not authenticated"
        });
    }

    try {
        const decodedObject = jwt.verify(token, config.privetKey);
        next()
    } catch (err) {
        return res.json({
            error: "Not authenticated"
        });
    }

}

const guestAccess = (req, res, next) => {
    const token = req.cookies['aid'];

    if (token) {
        return res.redirect('/');
    }
    next()

}

const getUserStatus = (req, res, next) => {
    const token = req.cookies['aid'];

    if (!token) {
        req.isLoggedIn = false;
    }

    try {
        const decodedObject = jwt.verify(token, config.privetKey);
        req.isLoggedIn = true;
    } catch (err) {
        req.isLoggedIn = false;
    }
    next();

}
module.exports = {
    saveUser,
    authAccess,
    authAccessJSON,
    verifyUser,
    guestAccess,
    getUserStatus
}