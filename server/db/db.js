//引入mongoose数据库
const mongoose =require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
module.exports=function (success,error){
    if(typeof error !=='function'){
        error=()=>{
            console.log('连接失败~~~')
        }
    }

    const{DBHOST , DBPORT , DBNAME} = require('../config/config');

    mongoose.set('strictQuery',true);

    //连接数据库
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`).then(()=>{
        success();
    }).catch(()=>{
        error();
    })
}
