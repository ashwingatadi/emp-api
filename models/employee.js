var mongoose = require('mongoose');
var employee = mongoose.model('employee',{
    name:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    message: {
        type: String,
        required: false,
        trim: true,
        default: null
    }
});

module.exports = {employee} 