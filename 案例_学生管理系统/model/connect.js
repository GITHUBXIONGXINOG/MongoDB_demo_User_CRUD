//3.1 导入连接数据库的mongoose模块
const mongoose = require('mongoose')
//3.2 mongoose的connet方法连接数据库
mongoose.connect('mongodb://localhost/playground',{useNewUrlParser: true,useUnifiedTopology: true  })
    .then(res => console.log('数据库连接成功'))
    .catch(err => console.log('数据库连接失败'))
