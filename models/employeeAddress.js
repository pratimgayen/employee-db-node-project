const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    empid: {
        type: Number,
        required: true,
        trim: true,
        unique: 1
    },
    presentaddress: {
        type: String,
        default: 'NA'
    },
    permanentaddress: {
        type: String,
        default: 'NA'
    },
    officeaddress: {
        type: String,
        default: 'NA'
    }
})

const Address = mongoose.model('Address', addressSchema)

module.exports = { Address }