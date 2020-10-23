// 1.搭建网站服务器，实现客户端与服务器端的通信
// 2.连接数据库，创建用户集合，向集合中插入文档
// 3.当用户访问/list时，将所有用户信息查询出来 -->地址栏进行请求都是GET方式
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
//3.1 导入url模块
const url = require('url')

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
    //4.async 设置响应为异步
app.on('request',async (req,res) =>{
    //3.2 请求方式
    const method = req.method
    //3.3 请求地址 pathname
        //parse 对req.url进行处理,返回一个对象,对象里面有一个属性pathname纯粹的请求地址
        //通过对象解构的方式结构出来 es6里面的方法
    const { pathname } = url.parse(req.url)
    //3.4 请求方式判断
        //GET 一般数据的请求
        //POST 一般添加修改数据
    if (method == 'GET'){
        //3.5呈现用户列表页面
            //将页面保存在变量里,再把变量响应给客户端
        if (pathname == '/list'){
            //3.6 查询用户的信息
                // find() 查询所有数据
            let users = await User.find()

            //3.7 需要将查询到的数据拼接到字符串中
            // ` `模板字符串 允许嵌入表达式的字符串字面量
            //3.71 将页面上面固定部分保存在模板字符串中
            let list = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>用户列表</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
</head>
<body>
<div class="container">
    <h6>
        <a href="/add" class="btn btn-primary">添加用户</a>
    </h6>
    <table class="table table-striped table-bordered">
        <tr>
            <td>用户名</td>
            <td>年龄</td>
            <td>爱好</td>
            <td>邮箱</td>
            <td>操作</td>
        </tr>
           `

            //3.73 将数据插入到字符串中间
            //users是数组 forEach循环遍历
            //${} 模板字符串使用${}显示外部数据
            users.forEach(item =>{
                list += `
                    <tr>
						<td>${item.name}</td>
						<td>${item.age}</td>
						<td>
                `;
                item.hobbies.forEach(item =>{
                    list += `<span>${item}</span> `
                })
                list += `
            </td> 
						<td>${item.email}</td>     
						<td>
						    <a href="" class="btn btn-danger btn-xs">删除</a>
						    <a href="" class="btn btn-success btn-xs">修改</a>
                        </td>
            `
            })



                //3.72 添加页面下面固定部分
            list += `
                    </table>
                </div>
            </body>
        </html>

            `

            //将list作为响应
           res.end(list)
        }
    }else if(method == 'POST'){

    }


})
