'use strict'

const M_user = require('./m_user');


const controller = {};


controller.insert = async (req, res) => {
    try {
        const data = req.body;
        if (!data.name || !data.last_name || !data.type_doc || !data.number_doc || !data.email || !data.phone) {
            res.status(400).send({msj: 'Acción no permitida'});
        }

        const response = await M_user.userInsert(data);
        
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}


module.exports = controller;