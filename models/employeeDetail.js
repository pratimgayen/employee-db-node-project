const mongoose = require('mongoose');
mongoose.set('debug', true);

const employeeSchema = mongoose.Schema({
    empid: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    dob: {
        type: Date,
        trim: true,
        required: true
    }
})

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = { Employee }