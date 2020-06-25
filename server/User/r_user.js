'use strict'

const express = require('express'),
    controller = require('./c_user'),
    api = express.Router();

api
    .post('/insert', ensureAuth, controller.insert);

module.exports = api;