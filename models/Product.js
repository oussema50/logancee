const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const productSchema = mongoose.Schema({
    productImg:{
        type:String,
        require:true
    },
    productName:{
        type:String,
        require:true,
        trim:true,
        maxlength:50
    },
    productDesc:{
        type:String,
        trim:true
    },
    productPrice:{
        type:Number,
        require:true
    },
    productCategory:{
        type:ObjectId,
        ref:'category',
        require:true
    },
    productQuantity:{
        type:Number,
        require:true
    }
},{timestamps:true});
productSchema.index({productName:'text'})
const Product = mongoose.model('product',productSchema);
module.exports = Product