const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../../config/config').get(process.env.NODE_ENV);
const { validationResult } = require('express-validator/check');
const validate = require('../../service/createValidator');
const dbvalidate = require('../../service/databaseValidator');
const async = require('async');

mongoose.Promise = global.Promise;
mongoose.connect(`${config.DATABASE_CONNECTOR}://${config.DATABASE_HOST}/${config.DATABASE_NAME}`, { useNewUrlParser: true })

const { Employee } = require('../../models/employeeDetail');
const { Address } = require('../../models/employeeAddress');

router.use(bodyParser.json());

// GET //
router.get('/getallemployees', (req, res, next) => {
    Employee.find()
        .select('empid firstname lastname dob')
        .exec()
        .then(doc => {
            const response = {
                total_record: doc.length,
                employee: doc.map(docs => {
                    return {
                        empid: docs.empid,
                        firstname: docs.firstname,
                        lastname: docs.lastname,
                        dob: convertDate(docs.dob)
                    }
                })
            }
            res.status(200).send(response);
        }).catch(error => {
            res.status(404).send("There was a problem with a remote server");
        })
});

router.get('/getempdetails', (req, res, next) => {
    const empidprovided = req.query.empid;
    async.concat([Employee, Address], function (model, callback) {
        model.find({ 'empid': empidprovided })
            .select('empid firstname lastname dob presentaddress permanentaddress officeaddress')
            .exec(function (err, docs) {
                callback(err, docs);
            })
    },
        function (err, result) {
            if (err || result.length == 0) {
                res.status(404).send("There was a problem with a remote server");
            }
            if (result.length > 0) {
                res.status(200).send(result);
            }
            else {
                res.status(200).send("No Data Found");
            }
        })
});

// POST //
//add employee data
router.post('/insertemployee',
    validate.validateaddemployee,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        dbvalidate.empempidCheck(req.body.empid).then(returnValue => {
        if (returnValue == true) {
            res.status(422).json({
                error: "empid id already exists"
            })
        }
        else if (returnValue == "database error") {
            res.status(404).send("There was a problem with a remote server");
        }
        else {
            const employee = new Employee(req.body);
            employee.save((err, doc) => {
                if (err) {
                    res.status(404).send("There was a problem with a remote server");
                }
                else {
                    res.status(200).json({
                        suceess: "successfully inserted data into table"
                    })
                }
            })
        }
        }).catch(error => {
            res.status(404).send("There was a problem with a remote server");
        });
    });

const convertDate = (date) => {
    let dates = new Date(date);

    const d = dates.getDate();
    const m = dates.getMonth() + 1;
    const y = dates.getFullYear();
    const dateformat = y + '-' + m + '-' + d;
    return dateformat;
}


module.exports = router;