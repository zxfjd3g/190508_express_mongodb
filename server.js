/* 
应用的入口js
1. 连接数据库
2. 启动服务器: 在连接数据库成功之后
3. 使用express相关中间件
4. 设置ejs模板相关
*/
const mongoose = require('mongoose')
const express = require('express')
const app = express()

// 4. 设置ejs模板相关
app.set('view engine', 'ejs')
app.set('views', 'views')

// 3. 使用express相关中间件
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// 注册路由器中间件
const router = require('./router')
app.use('/api', router)


// 1. 连接数据库
mongoose.connect('mongodb://localhost/test4', {useNewUrlParser: true, useCreateIndex: true}).then(
  () => {
    console.log('连接数据库成功')
    // 2. 启动服务器: 在连接数据库成功之后
    app.listen('3001', () => {
      console.log('服务器启动成功, 请访问: http://localhost:3001')
    })
  },
  error => {
    console.log('连接数据库失败', error)
  }
)
