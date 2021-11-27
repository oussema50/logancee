const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    category:{
        type:String,
        require:true,
        trim:true,
        maxlength:50
    }
},{timestamps:true});
const Category = mongoose.model('category',categorySchema);
module.exports = Category