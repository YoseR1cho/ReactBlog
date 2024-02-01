const express  = require('express')
const router = express.Router();

const jwt = require('jsonwebtoken');
const {expressjwt} = require('express-jwt');

const userModel = require('../../models/UserModels')

//
const {SECRET} = require('../../config/config')


//用户登录
router.post('/login',(req,res)=>{
    let {username,password} = req.body;
    userModel.findOne({username,password}).then(data=>{
        if(!data){
            return res.json({
                code:'3001',
                msg:'用户名或密码错误~~',
                data:null
            })
        }
        const {username,_id:id,role} =data;
        //创建当前用户的token
        const user ={
            username,
            id,
            role
        }
        let token =jwt.sign(user,SECRET,{
            expiresIn: 60*60*24*7
        });
        res.json({
            code:'0000',
            msg:'登录成功',
            data:{token,id,role}
        })
    }).catch(err=>{
        console.log(err);
        return res.json({
            code:'3002',
            msg:'数据库读取失败',
            data:null
        })
    })
})


//用户注册
router.post('/reg',(req,res)=>{
    userModel.create({...req.body}).then(data=>{
        res.json({
            code:'0000',
            msg:'注册成功',
            data:null
        })
    }).catch(err=>{
        if(err.code===11000){
            return res.json({
                code:'3002',
                msg:'您注册的用户名已存在~',
                data:err
            })
        }
        res.json({
            code:'3002',
            msg:'注册失败',
            data:err
        })
    })
})

// token验证
router.get('/admin',expressjwt({
    secret:SECRET,algorithms:["HS256"]
}),(req,res)=>{
    let {username,id,role} = req.auth;
    if(!req.auth){
        return res.json({
            code:'2004',
            msg:'token失败',
            data:null
        })
    }

    let newToken =jwt.sign({username,id,role},SECRET,
        {expiresIn: 60 * 60 * 24 * 7}
    );
    res.json({
        code:'0000',
        msg:'token校验成功',
        data:{username,id,newToken,role}
    })

})

module.exports = router;

