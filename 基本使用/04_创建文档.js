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
// model方法用来创建集合
// Course 集合名字
// 想对集合用哪个规则
// 左边的Couse 当前集合的构造函数
const Course = mongoose.model('Course',courseSchema)//courses

//5.创建文档(通过create)
//create 向集合中插入文档
    //第一个参数 对象 文档的内容
    //第二个参数 回调函数
//方法1 回调函数
// Course.create({name:'Javascript',author:'heima',isPublished:false},(err,result)=>{
//     //错误对象
//     console.log(err)
//     //当前插入的文档
//     console.log(result)
// })

//方法2 通过promise对象
Course.create({name:'Javascript',author:'heima',isPublished:false})
    .then(result =>{
        console.log(result)
    })
    .catch(err =>{
        console.log(err)
    })

