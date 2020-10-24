//2.1 引入http模块
const http = require('http')


//7.3 引入时间格式化模块
const dateformat = require('dateformat')

//4.6 引入模板引擎
const template = require('art-template')
//4.7引入path模块 路径拼接
const path = require('path')
//4.8 配置模板的根目录
template.defaults.root = path.join(__dirname,'views')
// 7.4 模板中导入方法 处理日期格式
template.defaults.imports.dateformat =dateformat

// 4.9 引入静态资源访问模块
const serveStatic = require('serve-static')

//4.10 实现静态资源访问服务
const serve = serveStatic(path.join(__dirname,'public'))






// 3.3 导入connect数据库连接模块
require('./model/connect')

// 导入route
const router = require('./route/index')

//2.2 http模块下的createServer方法就是用来创建网站服务器的
const app = http.createServer()
//2.3 为了客户端能与服务器端之间通信
//    给服务器端添加请求事件
//    当客户端访问服务器端的时候
app.on('request',(req,res)=>{
    //4.5 调用路由对象 并传入请求对象,响应对象,回调函数(必传参数,不传报错)
    router(req,res,()=>{})
    //4.11 启动静态资源访问服务功能
    serve(req,res,()=>{})
})


//2.5 服务器请求端口
app.listen(80)
console.log('服务器请求成功')
