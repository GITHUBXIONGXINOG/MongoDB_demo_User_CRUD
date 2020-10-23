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
//更新一条
User.updateOne({name: '王二麻子'},{name:'李二愣子'}).then(result => console.log(result))
//更新多条
User.updateMany({},{age:28}).then(result => console.log(result))
