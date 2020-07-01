'use strict'

const M_work = require('./m_work');


const controller = {};


controller.insert = async (req, res) => {
    try {
        const data = req.body;
       
       __isNull([data.id_contractor, data.id_professional, data.description, data.amount_proposed],  { status: 400, msg: global.ANP });

        const response = await M_work.insert(data);

        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).send(err);
    }
}

controller.update = async (req, res) => {
    try {
        
        res.status(201).send({msj: 'Se actualizó'});
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).send(err);
    }
}

controller.delete = async (req, res) => {
    try {
        
        res.status(201).send({msj: 'Se elimnó'});
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).send(err);
    }
}

controller.list = async (req, res) => {
    try {
        const {id_professional, state} = req.query;
        const response = await M_work.list(id_professional, state);
        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).send(err);
    }
}


controller.detail = async (req, res) => {
    try {
        
        const {id_work} = req.query;

        __isNull(id_work, { status: 400, msg: global.ANP });

        const response = await M_work.detail(id_work);

        res.status(200).send(response);
    } catch (err) {
        global.print_response_error(req.url, err, res);
    }
}

module.exports = controller;