const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use(cookieParser());
    app.use(express.json());       // to support JSON-encoded bodies
    app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

    //Setup the view engine
    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }));

    const hbs = handlebars.create();

    hbs.handlebars.registerHelper('select', function (selected, options) {
        return options.fn(this).replace(
            new RegExp(' value=\"' + selected + '\"'),
            '$& selected="selected"');
    });

    app.set('view engine', '.hbs');

    //Setup the static files
    app.use('/static', express.static('static'));

};