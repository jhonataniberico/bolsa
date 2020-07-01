
'use strict'

const model = {};

model.insert = (data) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM  __work__01_insert($1) res;`;
        sql = pgpromise.as.format(sql, [data]);
        console.log(sql);
        dbp.one(sql).then(data => {
            if (data.res.status !== 0) { return reject(data.res);}
            return resolve(data.res);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

model.list = (id_professional, state) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM  __work__02_list($1,$2) res;`;
        sql = pgpromise.as.format(sql, [id_professional, state]);
        dbp.one(sql).then(data => {
            if (data.res.status !== 0) { return reject(data.res);}
            return resolve(data.res);
        }).catch(err => {
            err.detalle = new Error().stack;
            return reject(err);
        });
    });
}

model.detail = (id_work) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM  __work__03_detail($1) res;`;
        sql = pgpromise.as.format(sql, [id_work]);
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