const mongoose = require('mongoose')

const registerUserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },

    lastName : {
        type : String,
        required : true,
        trim : true
    },

    dob : {
        type : Date
    },

    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true
    },

    gender : {
        type : String,
        enum : ['male','female','other']
    }

}, {timestamps : true})

const registerUserModel = mongoose.model('registerUser', registerUserSchema)

module.exports = registerUserModel

