const express = require('express');
const router = express.Router();

// 引入文章集合
const TagModel = require('../../models/TagModels')

//引入moment模块
const moment = require('moment')

// 获取所有标签
router.get('/', function(req, res, next) {
    TagModel.find().then(data=>{
        res.json({
            code:'0000',
            msg:'读取成功',
            data:data
        })
    }).catch(()=>{
        res.json({
            code:'1001',
            msg:'读取失败',
            data:null
        })
    })
});


//添加标签
router.post('/',(req,res)=>{
    TagModel.create({
        ...req.body,
    }).then(data=>{
        res.json({
            code:'0000',
            msg:'标签添加成功~~',
            data:data
        })
    }).catch(()=>{
        res.json({
            code:'1002',
            msg:'标签添加失败~~',
            data:null
        })
    })
})

//删除标签
router.delete('/delete/:id',(req,res)=>{
    let id = req.params.id;
    TagModel.deleteOne({_id:id}).then(data=>{
        res.json({
            code:'0000',
            msg:'删除标签成功',
            data:{}
        })
    }).catch(()=>{
        res.json({
            code:'1003',
            msg:'删除标签失败',
            data:null
        })
    })
})

module.exports = router;
