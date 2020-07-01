
'use strict'

const model = {};

model.insert = (data) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM  __professional__01_insert($1) res;`;
        sql = pgpromise.as.format(sql, [data]);
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