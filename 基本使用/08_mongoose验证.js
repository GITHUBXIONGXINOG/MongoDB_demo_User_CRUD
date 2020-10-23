const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground',{useNewUrlParser: true ,useUnifiedTopology: true})
    .then(()=>console.log('数据库连接成功'))
    .catch(err => console.log('数据库连接失败'))
//创建集合规则
const postSchema = new mongoose.Schema({
    title:{
        type:String, //当前title字段的类型
        // required:true //必传字段
        required:[true,'请传入文章标题'], // true必传, 自定义错误信息
        minlength:[2,'文章标题不小于2'], //最小长度
        maxlength:[5,'文字标题不超过5'],
        trim:true //去除两端的空格
    },
    age:{
        type:Number,
        min:18,
        max:100
    },
    publishDate:{
        type:Date,
        default:Date.now
    },
    category:{
        type:String,
        //枚举 列举出当前字段可以拥有的值
        // enum:['html','css','javascript','node.js']
        enum:{
            //value 字段范围
            values:['html','css','javascript','node.js'],
            message:'分类名称要在一定的范围内'
        }
    },
    author:{
        type:String,
        validate: v => {
            //返回布尔值
            //true 验证成功
            //false 验证失败
            // v 要验证的值
            return v && v.length >4
        },
        //自定义错误信息
        message:'传入的值不符合验证规则'
    }
})

//model方法返回集合的构造函数
const Post = mongoose.model('Post',postSchema)

//向集合中插入数据
// Post.create({}).then(result => console.log(result))//插入失败
Post.create({title:'aaa',age:60,category:'java',author:'bd'})
    //插入成功
    .then(result => console.log(result))
    //插入失败 所有信息包含在error对象里面
    .catch(error => {
       // console.log(srror)
        //获取错误信息对象
       const err = error.errors
        // 循环错误信息对象
        for (var attr in err){
            //将错误信息打印到控制台中
            console.log(err[attr]['message'])
        }
    })
