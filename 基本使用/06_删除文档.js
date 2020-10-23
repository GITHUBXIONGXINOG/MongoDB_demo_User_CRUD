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
// 创建集合规则
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
});

//4.使用规则创建集合
//User 是查询的集合的名字
const User = mongoose.model('User',userSchema)
//查找到一条文档并删除
//如果查询条件匹配了多个文档,那么只会删除第一个匹配的文档
// User.findOneAndDelete({_id:'5c09f2b6aeb04b22f846096a'}).then(result => console.log(result))
//删除多个文档  {}为空删除所有文档
User.deleteMany({}).then(result => console.log(result))
