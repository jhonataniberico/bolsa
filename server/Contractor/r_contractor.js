'use strict'

const express = require('express'),
    controller = require('./c_contractor'),
    api = express.Router();

api
    .post('/insert', ensureAuth, controller.insert);

module.exports = api;