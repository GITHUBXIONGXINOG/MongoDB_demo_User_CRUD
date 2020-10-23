//2.1 导入mongoose模块
const mongoose = require('mongoose')
//2.2 数据库连接 27017是mongodb数据库的默认端口
mongoose.connect('mongodb://localhost/playground',{ useUnifiedTopology: true,useNewUrlParser: true  })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))
