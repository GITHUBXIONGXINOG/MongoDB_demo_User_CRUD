//2.1 引入http模块
const http = require('http')
//2.2 http模块下的createServer方法就是用来创建网站服务器的
const app = http.createServer()
//2.3 为了客户端能与服务器端之间通信
//    给服务器端添加请求事件
//    当客户端访问服务器端的时候
app.on('request',(req,res)=>{
    //2.4 为客户端响应的内容
    res.end('ok')
})

//2.5 服务器请求端口
app.listen(80)
console.log('服务器请求成功')
