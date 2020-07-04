'use strict'

const M_professional = require('./m_professional');
const M_work = require('../Work/m_work');
const validator = require('./validator_professional');


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
    } catch (err) {
        global.print_response_error(req.url, err, res);
    }
}

controller.updCurriculum = async (req, res) => {
    try {
        const data = req.body;

        __isNull([data.id_professional, data.profession_title, data.summary, data.hourly_rate], { status: 400, msg: global.ANP });


        if (!validator.validSchedule(data.schedule)) {
            throw { status: 400, msg: 'Error al subir el horario' };
        }

        if (!validator.validStudies(data.studies)) {
            throw { status: 400, msg: 'Error al subir los estudios' };
        }

        if (!validator.validWorkExperence(data.work_experence)) {
            throw { status: 400, msg: 'Error al subir la experiencia laboral' };
        }

        __maxLengthString(data.profession_title, 150, { status: 400, msg: 'Máximo 150 caracteres en título profesional' });
        __maxLengthString(data.summary, 1000, { status: 400, msg: 'Máximo 1000 caracteres en el resumen' });
        __isNumeric(data.hourly_rate, { status: 400, msg: 'Error en la tarifa' });

        const response = await M_professional.updCurriculum(data);

        res.status(201).send(response);
    } catch (err) {
        global.print_response_error(req.url, err, res);
    }
}

module.exports = controller;