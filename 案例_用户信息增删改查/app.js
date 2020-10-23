// 1.搭建网站服务器，实现客户端与服务器端的通信
// 2.连接数据库，创建用户集合，向集合中插入文档
// 3.当用户访问/list时，将所有用户信息查询出来
    //实现路由功能 -->获取路由的请求方式和请求地址,对请求方式和请求地址进行判断
    //程序用户列表页面
    //从数据库中查询用户信息,将用户信息展示在列表中
// 4.将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
// 5.当用户访问/add时，呈现表单页面，并实现添加用户信息功能
// 6.当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
// 7.当用户访问/delete时，实现用户删除功能

//1.1.导入http模块
const http = require('http')
//2.1 导入mongoose模块
const mongoose = require('mongoose')

//2.2 数据库连接 27017是mongodb数据库的默认端口
mongoose.connect('mongodb://localhost/playground',{ useUnifiedTopology: true,useNewUrlParser: true  })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))

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


//1.2.创建服务器
const app = http.createServer()

//1.3.监听端口
app.listen(3000)

//1.4.为服务器对象添加请求事件
    //1.请求事件request
    //2.事件处理函数(req请求对象,res响应对象)
    //3.res.end 结束响应过程。用于快速结束没有任何数据的响应。
app.on('request',(req,res) =>{
    res.end('ok')
})
