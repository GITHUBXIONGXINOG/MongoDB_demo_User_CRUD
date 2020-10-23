//1.引入mongoose第三方模块,用来操作数据库
const mongoose = require('mongoose')
//2.连接数据库
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true,useUnifiedTopology: true })
    //连接成功
    .then(()=>{
        console.log('数据库连接成功')
    })
    //连接失败
    .catch(err => console.log('数据库连接失败'))
//3.创建collection集合规则
const courseSchema = new mongoose.Schema({
// document    文档属性
    name: String, //field 字段
    author:String,
    isPublished:Boolean
})

//4.使用规则创建集合
    // Course 集合名字
    // 想对集合用哪个规则
    // 左边的Couse 当前集合的构造函数
const Course = mongoose.model('Course',courseSchema)//courses
