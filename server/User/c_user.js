'use strict'

const M_user = require('./m_user');


const controller = {};


controller.insert = async (req, res) => {
    try {
        const data = req.body;

        __isNull([data.name, data.last_name, data.type_doc, data.number_doc, data.email, data.phone],
            { status: 400, msg: global.ANP });
        
        const lengthName = 60;
        __maxLengthString(data.name, lengthName, {status: 400, msg: `Máximo ${lengthName} caracteres para el nombre`});
        __maxLengthString(data.last_name, lengthName, {status: 400, msg: `Máximo ${lengthName} caracteres para el los apellidos`});

        __validTypeDoc(data.type_doc, {status: 400, msg: 'El tipo de docuemnto no es válido'});

        __validNumberDoc(data.number_doc, data.type_doc, {status: 400, msg: 'Número de documento inválido'});

        const response = await M_user.userInsert(data);

        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).send(err);
    }
}


module.exports = controller;