//导入mongoose模块
const mongoose = require('mongoose')
//2.3 创建用户集合规则
//minlength 最小长度
//min 最小范围
//[String] 数组,每一个都是字符串类型
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    age:{
        type:Number,
        min:18,
        max:80
    },
    password:{
        type:String,
        required: true
    },
    email:String,
    hobbies:[ String ]
})


//2.4 使用集合规则创建集合
//User 集合名字
//UserSchema 集合引用的规则
//得到集合的构造函数,用变量User接收
const User = mongoose.model('User',UserSchema)

//开放集合 其它可以拿到
module.exports = User
