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
        default : true, // not sold
        required : true
    },
    desc : {
        type :String,
        required : true
    }
    
});
paintingSchema.virtual('coverImagePath').get(function (){
    if(this.img != null && this.imgType != null){
        return `data:${this.imgType};charset=utf-8;base64,${this.img.toString('base64')}`;
    }
})
module.exports = mongoose.model('painting', paintingSchema);