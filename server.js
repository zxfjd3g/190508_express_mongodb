/* 
应用的入口js
1. 连接数据库
2. 启动服务器: 在连接数据库成功之后
*/
const mongoose = require('mongoose')
const express = require('express')
const app = express()


// 注册路由器中间件
const router = require('./router')
app.use('/api', router)


// 1. 连接数据库
mongoose.connect('mongodb://localhost/test4', {useNewUrlParser: true}).then(
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
