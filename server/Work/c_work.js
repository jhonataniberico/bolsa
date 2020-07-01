'use strict'

const M_work = require('./m_work');


const controller = {};


controller.insert = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

        // Validaciones
       
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


module.exports = controller;