
'use strict'

const model = {};

model.userInsert = (data) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM  __user__01_insert($1,$2,$3,$4,$5,$6) res;`;
        sql = pgpromise.as.format(sql, [data.name, data.last_name, data.type_doc, data.number_doc, data.email, data.phone]);
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