const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cprSchema = new Schema({
    paintaingId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    relation: {
        type: String,
        required: true
    },
    date : {
        type : Date,
        default:new Date()
    },

    
});

module.exports = mongoose.model('cpr', cprSchema);