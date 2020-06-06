const express = require('express');
const handlebars = require('express-handlebars');

module.exports = (app) => {
    app.use(express.json());       // to support JSON-encoded bodies
    app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies

    //Setup the view engine
    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }));

    app.set('view engine', '.hbs');

    //Setup the static files
    app.use('/static', express.static('static'));

};