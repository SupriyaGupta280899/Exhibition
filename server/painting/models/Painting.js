const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paintingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: Buffer,
        required: true
    },
    imgType: {
        type: String,
        required: true
    },
    price : {
        type : Number,
        required : true
    },
    status : {
        type : Boolean,
        default : false, // not sold
        required : true
    },
    desc : {
        type :String,
        required : true
    }
    
});

module.exports = mongoose.model('painting', paintingSchema);