const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        required:true,
        default:1 //1代表是用户 0代表是管理员
    }
})

let userModel = mongoose.model('user',userSchema);

module.exports = userModel;
