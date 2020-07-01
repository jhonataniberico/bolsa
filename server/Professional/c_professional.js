'use strict'

const M_professional = require('./m_professional');
const M_work = require('../Work/m_work');


const controller = {};


controller.insert = async (req, res) => {
    try {
        const data = req.body;
        __isNull([
            data.name,
            data.last_name,
            data.type_doc,
            data.number_doc,
            data.email,
            data.phone,
            data.user,
            data.password,
            data.type_professional],
            { status: 400, msg: global.ANP });

        const lengthName = 60;
        __maxLengthString(data.name, lengthName, { status: 400, msg: `Máximo ${lengthName} caracteres para el nombre` });
        __maxLengthString(data.last_name, lengthName, { status: 400, msg: `Máximo ${lengthName} caracteres para el los apellidos` });

        __validTypeDoc(data.type_doc, { status: 400, msg: 'El tipo de docuemnto no es válido' });

        __validNumberDoc(data.number_doc, data.type_doc, { status: 400, msg: 'Número de documento inválido' });

        const response = await M_professional.insert(data);

        res.status(200).send(response);
    } catch (err) {
        global.print_response_error(req.url, err, res);
    }
}

controller.listWork = async (req, res) => {
    try {
        const { id_professional, state } = req.query;

        __isNull(id_professional, { status: 400, msg: global.ANP });

        const response = await M_work.list(id_professional, state);

        res.status(200).send(response);
    } catch (error) {
        global.print_response_error(req.url, err, res);
    }
}

module.exports = controller;