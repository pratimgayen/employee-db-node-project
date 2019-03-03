const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../../config/config').get(process.env.NODE_ENV);
const { validationResult } = require('express-validator/check');
const validate = require('../../service/createValidator');
const dbvalidate = require('../../service/databaseValidator');

mongoose.Promise = global.Promise;
mongoose.connect(`${config.DATABASE_CONNECTOR}://${config.DATABASE_HOST}/${config.DATABASE_NAME}`, { useNewUrlParser: true })

const { Employee } = require('../../models/employeeDetail');
const { Address } = require('../../models/employeeAddress');

router.use(bodyParser.json());

// UPDATE //
router.post('/update/employeedetails',
    validate.validatecombine,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        dbvalidate.empempidCheck(req.body.empid).then(returnValue => {
            if (returnValue == true) {
                Employee.findOneAndUpdate({ empid: req.body.empid }, req.body, (err, doc) => {
                    if (err) {
                        res.status(404).send("There was a problem with a remote server");
                    }
                    else {
                        res.status(200).json({
                            success: "successfully updated"
                        })
                    }
                })
            }
            else if (returnValue == false) {
                res.status(422).send("No records found for empid: " + req.body.empid);
            }
            else {
                res.status(404).send("There was a problem with a remote server");
            }
        })
    });

router.post('/update/employeeaddress',
    validate.validatecombine,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        dbvalidate.addempidCheck(req.body.empid).then(returnValue => {
            if (returnValue == true) {
                Address.findOneAndUpdate({ empid: req.body.empid }, req.body, (err, doc) => {
                    if (err) {
                        res.status(404).send("There was a problem with a remote server");
                    }
                    else {
                        res.status(200).json({
                            success: "successfully updated"
                        })
                    }
                })
            }
            else if (returnValue == false) {
                res.status(422).send("No records found for empid: " + req.body.empid);
            }
            else {
                res.status(404).send("There was a problem with a remote server");
            }
        })
    });

// DELETE //
router.delete('/delete', (req, res, next) => {
    let id = req.query.empid;
    dbvalidate.empempidCheck(id).then(returnValue => {
        if (returnValue == true) {
            Employee.findOneAndRemove(id)
                .exec()
                .then(doc => {
                    dbvalidate.addempidCheck(id).then(addreturnValue => {
                        if (addreturnValue == true) {
                            Address.findOneAndRemove(id)
                                .exec()
                                .then(doc => {
                                    res.status(200).json({
                                        success: "successfully deleted data from employee and address tables"
                                    })
                                }).catch(error => {
                                    res.status(404).send("successfully deleted data from employee. But there was an error while deleting data from address table");
                                });
                        }
                        else {
                            res.status(200).json({
                                success: "successfully deleted data from employee table"
                            })
                        }
                    });
                }).catch(error => {
                    res.status(404).send("There was a problem with a remote server");
                });
        }
        else if(returnValue == false){
            res.status(422).send("empid does not exist");
        }
        else{
            res.status(404).send("There was a problem with a remote server");
        }
    })
});

module.exports = router;