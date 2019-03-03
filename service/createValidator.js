const { check, validationResult } = require('express-validator/check');
const dbCheck = require('./databaseValidator');

module.exports = {
    validateaddemployee: [
        check('empid').isNumeric().withMessage('empid should be a number')
            .isLength({ min: 1 }).withMessage('empid is required'),

        check('firstname').isLength({ min: 1 }).withMessage('firstname is required')
            .isAlphanumeric().withMessage('firstname must be alphanumeric.'),

        check('lastname').isLength({ min: 1 }).withMessage('lastname is required')
            .isAlphanumeric().withMessage('lastname must be alphanumeric.'),

        check('dob').isLength({ min: 1 }).withMessage('date of birth is required')
            .isISO8601().withMessage('date format should be yyyy-mm-dd'),
    ],
    validateaddaddress: [
        check('empid').isNumeric().withMessage('empid should be a number')
        .isLength({ min: 1 }).withMessage('empid is required'),
    ],
    validatecombine: [
        check('empid').isNumeric().withMessage('empid should be a number')
        .isLength({ min: 1 }).withMessage('empid is required'),
    ],
}