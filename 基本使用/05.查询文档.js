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
//find查询文档 promise链式 永远返回的是数组 返回一组文档
//查询用户集合中的所有文档
//  User.find().then(result => console.log(result))
//查找id为 的数据
// User.find({_id:'5c09f1e5aeb04b22f8460965'}).then(result => console.log(result))
//findOne方法返回一条文档 默认返回当前集合中的第一条文档 返回对象
// User.findOne().then(result => console.log(result))
// User.findOne({name:'李四'}).then(result => console.log(result))
// $gt 大于 $lt 小于
// 查找用户集合中年龄字段大于20小于40的
// User.find({age:{$gt:20,$lt:40}}).then(result => console.log(result))
// $in包含
// User.find({hobbies:{$in:['足球']}}).then(result => console.log(result))

// 链式调用
// select 想要查询的字段
//默认显示_id
// User.find().select('name email').then(result => console.log(result))
//不显示_id  不想查询就在字段前加上-
// User.find().select('name email -_id').then(result => console.log(result))

//sort()排序  根据年龄字段升序排序
// User.find().sort('age').then(result => console.log(result))
//降序排序
// User.find().sort('-age').then(result => console.log(result))

//skip 跳过多少条数据
//limit限制查询数量
//跳过两个,查询2个
User.find().skip(2).limit(2).then(result => console.log(result))
