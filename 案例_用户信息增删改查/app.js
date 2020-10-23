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
//5.1 导入querystring模块 用于解析和格式化 URL 查询字符串的实用工具
const querystring = require('querystring')

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

            //4.1 需要将查询到的数据拼接到字符串中
            // ` `模板字符串 允许嵌入表达式的字符串字面量
            //4,3 将页面上面固定部分保存在模板字符串中
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
<!--       5.4 将href改为/add,点击后进行跳转-->
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

            //4.4 将数据插入到字符串中间
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

                //4.2 添加页面下面固定部分
            list += `
                    </table>
                </div>
            </body>
        </html>

            `

            //将list作为响应
           res.end(list)
            //5.1 添加用户
                //由于请求是在地址栏进行,对地址进行判断
        }else if(pathname == '/add'){
            //5.2 add 值为模板字符串
        let add = `
        <!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<title>用户列表</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
				</head>
				<body>
					<div class="container">
						<h3>添加用户</h3>
<!--						5.5 将表单提交方式设置为post
                            5.9 设置action 属性 /add 点击时通过post发送到/add
-->
						<form method="post" action="/add">
<!--						5.6 为每一个表单字段设置名字name属性
                                有name属性服务器才能接收表单的数据
-->
						  <div class="form-group">
						    <label>用户名</label>
						    <input name="name" type="text" class="form-control" placeholder="请填写用户名">
						  </div>
						  <div class="form-group">
						    <label>密码</label>
						    <input name="password" type="password" class="form-control" placeholder="请输入密码">
						  </div>
						  <div class="form-group">
						    <label>年龄</label>
						    <input name="age" type="text" class="form-control" placeholder="请填写年龄">
						  </div>
						  <div class="form-group">
						    <label>邮箱</label>
						    <input name="email" type="email" class="form-control" placeholder="请填写邮箱">
						  </div>
						  <div class="form-group">
						    <label>请选择爱好</label>
<!--						    5.7 爱好使用相同的name 为一组-->
						    <div>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="足球" name="hobbies"> 足球
						    	</label>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="篮球" name="hobbies"> 篮球
						    	</label>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
						    	</label>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
						    	</label>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
						    	</label>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
						    	</label>
						    	<label class="checkbox-inline">
						    	  <input type="checkbox" value="烫头" name="hobbies"> 烫头
						    	</label>
						    </div>
						  </div>
						  <button type="submit" class="btn btn-primary">添加用户</button>
						</form>
					</div>
				</body>
				</html>
                `;
        //5.3 通过res.end方法响应给客户端
        res.end(add)

        }
    }else if(method == 'POST'){
        //5.8 用户添加功能
            //两个/add地址,一个是GET请求,一个是POST请求
            //5.9 在表单中设置form属性 method='POST' active='/add'
            //点击提交按钮后会程序会运行到此处
        if (pathname == '/add'){
            //5.10 接收用户提交的信息
                //req.on 接收提交的信息两个事件 data,end
            //当参数传来时,触发data事件
            let formData = ''
            //接收POST参数
            req.on('data',(param)=>{
                //formData += 每次传过来的参数
                formData += param
            })
            //当POSY参数传完时,触发end事件
            req.on('end',async ()=>{
                //querystring.parse 将url字符串转换成对象
                let user = querystring.parse(formData)
                //5.11 将用户提交的信息添加到数据库
                    //await 变成同步形式
                User.create(user)
                //301 重定向
                // await 可以用于等待一个 async 函数的返回值
               await res.writeHead(301,{
                    //跳转地址
                    Location:'/list'
                })
                //end 代表请求结束
                res.end()
            })


        }
    }


})
