const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('../../config/config').get(process.env.NODE_ENV);
const { validationResult } = require('express-validator/check');
const dbvalidate = require('../../service/databaseValidator');
const validate = require('../../service/createValidator');

mongoose.Promise = global.Promise;
mongoose.connect(`${config.DATABASE_CONNECTOR}://${config.DATABASE_HOST}/${config.DATABASE_NAME}`, { useNewUrlParser: true })

const { Employee } = require('../../models/employeeDetail');
const { Address } = require('../../models/employeeAddress');

router.use(bodyParser.json());
router.use(cookieParser());

// GET //
router.get('/getalladdresses', (req, res, next) => {
    Address.find()
        .exec()
        .then(addresses => {
            const response = {
                total_record: addresses.length,
                address: addresses.map(docs => {
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

router.get('/getempaddress', (req, res, next) => {
    const empidprovided = req.query.empid;
    if (empidprovided == undefined) {
        return res.status(404).send("/api/address/getempaddress?empid=  isRequired");
    }
    else if (empidprovided == null) {
        return res.status(404).send("empid params are empty");
    }
    else {
        Address.find({ 'empid': empidprovided })
            .exec()
            .then(addresses => {
                if (addresses.length > 0) {
                    res.status(200).send(addresses);
                }
                else {
                    res.status(200).send("No Data Found");
                }
            }).catch(error => {
                res.status(404).send("There was a problem with a remote server");
            })
    }
});

// POST //
//add employee address
router.post('/addaddress',
    validate.validateaddaddress,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        dbvalidate.addempidCheck(req.body.empid).then(returnValue => {
            if (returnValue == true) {
                res.status(422).json({
                    error: "empid id already exists"
                })
            }
            else if (returnValue == "database error") {
                res.status(404).send("There was a problem with a remote server");
            }
            else {
                const address = new Address(req.body);
                address.save((err, doc) => {
                    if (err) {
                        return res.status(404).send("There was a problem with a remote server");
                    }
                    res.status(200).json({
                        suceess: "successfully inserted data into table"
                    })
                })
            }
        }).catch(error => {
            res.status(404).send("There was a problem with a remote server");
        })
    });

module.exports = router;