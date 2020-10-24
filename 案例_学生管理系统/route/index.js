//4.1 引入router模块
const getRouter = require('router')
//4.2 获取路由对象
const router = getRouter()
//3.7 导入学生信息集合
const Student = require('../model/user')
//4.6 引入模板引擎
const template = require('art-template')

//5.3 引入querystring模块 将字符串转换成对象
const querystring = require('querystring')

//4.3 当使用get方法请求,且地址是/test,走当前的路由
//第二个参数是处理请求的函数 请求对象req,响应对象res
//呈递学生档案信息页面
router.get('/add',(req,res)=>{
    //通过响应对象给客户端响应内容
    //4.7 调用template方法 模板所在位置
    let html =  template('index.art',{})
    //将html变量响应给客户端
    res.end(html)
})

//4.4 再创建一个路由
//称帝学生档案信息列表页面
router.get('/list',async (req,res)=>{
    //7.1 查询学生信息
    //只有用async变成异步函数才能用await关键字
    //才能返回值的方式去接受异步api的结果
    let students =  await Student.find()
    // console.log(students)
    //4.12 调用template方法传入列表的模板页面
    let html = template('list.art',{
        //7.2 设置模板显示内容
        students:students
    })
    res.end(html)
})

//5.2 实现学生信息添加功能路由
router.post('/add',(req,res)=>{
    //接收post请求参数
    let formData = ''
    //为req请求事件添加data事件接收参数
    //param 客户端每次发送过来的请求参数
    //formData把每次传入参数接收,形成字符
    req.on('data',(param)=>{
        formData += param
    })
    //为req添加结束事件
    req.on('end',async ()=>{
        //调用querystring的parse方法对字符串进行解析为对象
        //添加到数据库
        //添加async 和await变成异步函数
        await  Student.create(querystring.parse(formData))
        //重定向 301
        res.writeHead(301,{
            //地址
            Location:'/list'
        })
        //结束 给客户端响应
        res.end()
    })
})

//暴露方法
module.exports = router
