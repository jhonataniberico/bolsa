'use strict'
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan'),
    app = express(),
    http = require('http').Server(app);

require('./authenticated');

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cors())
    .use(morgan('dev'));

// Routes
const r_user = require('./User/r_user');

app
    .use('/user', r_user);


http.listen(process.env.PORT || 3000, () => { });