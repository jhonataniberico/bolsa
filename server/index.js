'use strict'
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan'),
    app = express(),
    http = require('http').Server(app);

require('./authenticated');
require('./Helpers/constants');
require('./Helpers/validator');

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cors())
    .use(morgan('dev'));

// Routes
const r_professional = require('./Professional/r_professional');
const r_contractor = require('./Contractor/r_contractor');
const r_work = require('./Work/r_work');

app
    .use('/professional', r_professional)
    .use('/contractor', r_contractor)
    .use('/work', r_work);


http.listen(process.env.PORT || 3000, () => { });