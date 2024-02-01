const mongoose = require('mongoose');

let tagSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

let tagModel = mongoose.model('tags',tagSchema);

module.exports = tagModel;
