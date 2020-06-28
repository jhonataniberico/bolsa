'use strict'

const express = require('express'),
    controller = require('./c_professional'),
    api = express.Router();

api
    .post('/insert', ensureAuth, controller.insert);

module.exports = api;