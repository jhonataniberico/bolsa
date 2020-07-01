'use strict'

global.ensureAuth = (req, res, next) => {
    try {
        console.log('llegue')
        // Obtener el path
        let path = req._parsedUrl.pathname;

        // Quitar los slack y backslash
        let trimmedPath = path.replace(/^\/+|\/+$/g,'');

        // Url que omitan la validación de token
        let url_NoToken = [
            'insert',
        ];

        if (/* url_NoToken.indexOf(trimmedPath) < 0 */false) {
            let token = (req.body.token) ? req.body.token : req.query.token;
            if(token == null) {
                throw {msj : 'La petición no tiene la cabecera de autenticación', status : global.HTTP_400};
            }
            let payload  = null;
            token        = token.replace(/['"]+/g,'');
            let segments = token.split('.');
            if (segments.length !== 3) {
                throw {msj : 'El token no tiene el formato correcto', status : global.HTTP_400};
            }
            // payload = token ? jwt.decode(token, JWT_KEY) : null;
            // if(payload.exp == undefined || payload.exp <= moment().unix()) {
            //     //return res.status(200).send({message: 'Token ha expirado', error: 2});
            // }
            req.user = payload;
        }
        /********************************************* CONEXION A BD *******************************/
        if (!global.pgpromise) {
            global.pgpromise = require("pg-promise") ({
                noWarnings: false
            });
        }
        let database = require('./database.json');
        global.__BD_USER__  = database.user;
        global.__BD_PASS__  = database.pass;
        global.__BD_HOST__  = database.host;
        global.__BD_PORT__  = database.port;
        global.__DATABASE__ = database.database;

        let __conexion = 'postgres://' + global.__BD_USER__ + ':' + global.__BD_PASS__ + '@' + global.__BD_HOST__ + ':' + global.__BD_PORT__ + '/' + global.__DATABASE__;
        if (global.dbp) {
            let connString = global.dbp.$pool.options.connectionString;
            if (!connString.includes(global.__DATABASE__) || (connString.includes(global.__DATABASE__) && global.dbp.$pool.ending)) {
                global.dbp = pgpromise(__conexion);
            }
        } else {
            global.dbp = pgpromise(__conexion);
        }
        /**************************************************************************************** */
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}