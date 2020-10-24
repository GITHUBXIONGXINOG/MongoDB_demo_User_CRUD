//01_导入模板引擎
const template = require('art-template')
//拼接字符串
const path = require('path')

//02 调用template方法告诉模板引擎哪些数据和哪一个模板进行拼接
//template方法用来拼接字符串
//1.模板路径 绝对路径 __dirname 当前文件的绝对路径
//2.对象类型 在模板中要展示的数据
//返回拼接好的字符串
//path.join()用来拼接字符串
const views = path.join(__dirname,'views','01.art')
const html = template(views,{
    name:'张三',
    age:20,
    content: '<h1>我是标题</h1>>'
})

console.log(html)
