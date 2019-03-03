const mongoose = require('mongoose');
const config = require('../config/config').get(process.env.NODE_ENV);
mongoose.connect(`${config.DATABASE_CONNECTOR}://${config.DATABASE_HOST}/${config.DATABASE_NAME}`, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

const { Employee } = require('../models/employeeDetail');
const { Address } = require('../models/employeeAddress');

module.exports.empempidCheck = (value) => {
    return new Promise(function (resolve, reject) {
        Employee.find({ empid: value })
            .exec()
            .then(doc => {
                if (doc.length > 0) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }).catch(error => {
                reject("database error");
            })
    })
}


module.exports.addempidCheck = (value) => {
    return new Promise(function (resolve, reject) {
        Address.find({ empid: value })
            .exec()
            .then(doc => {
                if (doc.length > 0) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }).catch(error => {
                reject("database error");
            })
    })
}