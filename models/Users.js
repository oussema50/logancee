const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{// this field to know is a user or an admin
        type:Number,
        default:0
    }
},{timestamps:true});
const User = mongoose.model('user',userSchema)
module.exports = User;