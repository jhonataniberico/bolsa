
'use strict'

const model = {};

model.insert = (data) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM  __contractor__01_insert($1,$2,$3,$4,$5,$6,$7,$8) res;`;
        sql = pgpromise.as.format(sql, [data.name, data.last_name, data.type_doc, data.number_doc, data.email, data.phone, data.user, data.password]);
        dbp.one(sql).then(data => {
            if (data.res.status !== 0) { return reject(data.res);}
            return resolve(data.res);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

module.exports = model;