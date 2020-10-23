//1.引入mongoose
const mongoose = require('mongoose')
//2.连接数据库
//第一个参数
    // mongodb 协议
    // localhost ip地址
    // playground 数据库的名字database 没有该数据库会自动添加
//第二个参数 选项默认
    //{useUnifiedTopology: true, useUnifiedTopology: true  }
//3.promise语法  链式调用
    //.then 使用 then 方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。表示成功
    //.catch 表示失败执行 输出错误对象
    //箭头函数,第一个括号里没有参数不能省略,有一个参数可以省略括号
    //指向的中括号如果只有一个语句中括号也可以省略
mongoose.connect('mongodb://localhost1/playground', {useNewUrlParser: true, useUnifiedTopology: true  })
    .then(()=>{
        console.log('数据库连接成功')
    })
    .catch(err => console.log(err,'数据库连接失败'))

