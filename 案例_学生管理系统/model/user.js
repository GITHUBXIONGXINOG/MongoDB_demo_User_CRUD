//3.3 引入mongoose
const mongoose = require('mongoose')
//3.4 创建学生集合规则
    //通过创建mongoose的Schema实例来创建集合规则
const studentsSchema = new mongoose.Schema({
    //设置集合字段
    name:{
        type: String,
        required:true,
        //最小长度
        minlength:2,
        maxlength:10
    },
    age:{
        type: Number,
        required: true,
        //最小范围
        min:7,
        max:80
    },
    sex:{
        type: String
    },
    email:String,
    //爱好是String数组
    hobbies:[ String ],
    collage :String,
    enterDate:{
        type: Date,
        default: Date.now
    }
})

//3.5 使用集合规则创建学生集合
    //使用mongoose.model方法创建集合 集合的名字,集合的规则
    //返回集合的构造函数
const Student = mongoose.model('Student',studentsSchema)

//3.6 通过model.export开放集合,让其它模块能导入该学生信息集合
module.exports = Student
