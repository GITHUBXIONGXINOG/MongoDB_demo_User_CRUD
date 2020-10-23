// 1.搭建网站服务器，实现客户端与服务器端的通信
// 2.连接数据库，创建用户集合，向集合中插入文档
// 3.当用户访问/list时，将所有用户信息查询出来 -->地址栏进行请求都是GET方式
    //实现路由功能 -->获取路由的请求方式和请求地址,对请求方式和请求地址进行判断
    //程序用户列表页面
    //从数据库中查询用户信息,将用户信息展示在列表中
// 4.将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
// 5.当用户访问/add时，呈现表单页面，并实现添加用户信息功能
// 6.当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
    //修改用户信息分为两大步骤
    //1.增加页面路由 呈现页面
        //1.在点击修改按钮时,将用户id传递到当前页面
        //2.从数据库中查询当前用户信息 将用户信息展示到页面中
    //2.实现用户修改功能
        //1.指定表单的提交地址以及请求方式
        //2.接收客户端传递过来的修改信息 找到用户 将用户信息更改为最新的
// 7.当用户访问/delete时，实现用户删除功能

//1.1.导入http模块
const http = require('http')

//3.1 导入url模块
const url = require('url')
//5.1 导入querystring模块 用于解析和格式化 URL 查询字符串的实用工具
const querystring = require('querystring')
//导入数据库
require('./model/index')
//导入创建用户集合的方式
const User = require('./model/user')



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
        //query 对象类型,里面有id属性 要设置为true
        // id参数存储在query中,通过query.id获取id
        //在标签中,通过提交地址 如 a href="/remove?id=${item._id}" 来提交id
    const { pathname,query } = url.parse(req.url,true)
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
<!--						7.1 给删除按钮添加路由-->
						    <a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
<!--						    6.1 给修改按钮添加href
                                    通过问号将id传递id
-->
						    <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
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
        //6.2 增加修改路由
        else if (pathname == '/modify'){
            //6.5 查询利用id用户信息
                //findOne 查询一条数据 对象
          let user =  await User.findOne({_id:query.id})
            //6.7 创建数组 保存爱好
            let hobbies = ['足球','篮球','橄榄球','敲代码','抽烟','喝酒','烫头','吃饭','睡觉','打豆豆']
          //6.6 接下来去表单里进行拼接
            //6.3 呈现修改用户的页面
            let modify = `
        <!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<title>用户列表</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
				</head>
				<body>
					<div class="container">
						<h3>修改用户</h3>
<!--						5.5 将表单提交方式设置为post
                            5.9 设置action 属性 /add 点击时通过post发送到/add
-->
<!--id通过地址栏提交-->
						<form method="post" action="/modify?id=${user._id}">
<!--						5.6 为每一个表单字段设置名字name属性
                                有name属性服务器才能接收表单的数据
-->

						  <div class="form-group">
						    <label>用户名</label>
<!--						    6.6 表单拼接
                                input 里面用 value表示内容
-->
						    <input value="${user.name}" name="name" type="text" class="form-control" placeholder="请填写用户名">
						  </div>
						  <div class="form-group">
						    <label>密码</label>
						    <input value="${user.password}"  name="password" type="password" class="form-control" placeholder="请输入密码">
						  </div>
						  <div class="form-group">
						    <label>年龄</label>
						    <input value="${user.age}" name="age" type="text" class="form-control" placeholder="请填写年龄">
						  </div>
						  <div class="form-group">
						    <label>邮箱</label>
						    <input value="${user.email}" name="email" type="email" class="form-control" placeholder="请填写邮箱">
						  </div>
						  <div class="form-group">
						    <label>请选择爱好</label>
<!--						    5.7 爱好使用相同的name 为一组-->
						    <div>
<!--						    6.8 动态生成label爱好标签-->   
                `;

          hobbies.forEach(item =>{
              //判断当前循环在不在用户的爱好数据组
              //includes 判断item在不在数组hobbies里,在返回true,否则返回false
              //item为hobbies循环遍历
            let isHobby = user.hobbies.includes(item)

              if (isHobby){//选中爱好
                  modify += `
                  <label class="checkbox-inline">
						    	  <input type="checkbox" value="${item}" name="hobbies" checked>${item}
				  </label>
                  `;
              }else {//没有选中爱好
                  modify += `
                  <label class="checkbox-inline">
						    	  <input type="checkbox" value="${item}" name="hobbies" >${item}
						    	</label>
                  `;
              }
          })
          //字符串拼接
          modify += ` </div>
						  </div>
						  <button type="submit" class="btn btn-primary">修改用户</button>
						</form>
					</div>
				</body>
				</html>`

            //6.4 end 请求结束返回modify页面
            res.end(modify)
        }
        //7.2 添加删除路由
        else if (pathname == '/remove'){
            //res.end(query.id)
            //删除操作
          await  User.findOneAndDelete({_id:query.id})
          //重定向到列表
          res.writeHead(301,{
              Location: '/list'
          })
            //结束请求
            res.end()
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
        //6.9 添加修改请求
        else if (pathname == '/modify'){
            let formDataByModify = ''
            //接收POST参数
            req.on('data',(param)=>{
                //formData += 每次传过来的参数
                formDataByModify += param
            })
            //当POSY参数传完时,触发end事件
            req.on('end',async ()=>{
                //querystring.parse 将url字符串转换成对象
                let user = querystring.parse(formDataByModify)
                //修改用户信息
                await User.updateOne({_id:query.id},user)
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
