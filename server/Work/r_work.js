'use strict'

const express = require('express'),
    controller = require('./c_work'),
    api = express.Router();

api
    .post('/insert', ensureAuth, controller.insert)
    .put('/update', ensureAuth, controller.update)
    .delete('/delete', ensureAuth, controller.delete)
    .get('/list', ensureAuth, controller.list)
    .get('/detail', ensureAuth, controller.detail)

module.exports = api;