// 建立
const mongoose = require('mongoose')
let ArticleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'tags',
        required:true
    }],
    view:{
        type:Number,
        default:0
    },
    createAt:Date
})


let ArticleModel =mongoose.model('articles',ArticleSchema);


module.exports = ArticleModel;
