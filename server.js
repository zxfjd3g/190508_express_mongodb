/* 
应用的入口js
1. 连接数据库
2. 启动服务器: 在连接数据库成功之后
3. 使用express相关中间件
4. 设置ejs模板相关
*/
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
var session = require("express-session")
const app = express()

// 4. 设置ejs模板相关
app.set('view engine', 'ejs')
app.set('views', 'views')

// 3. 使用express相关中间件
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser()) // 用来解体请求头中的cookie
app.use(session({
  secret: 'abc', // 用于解码的密钥(cookie中携带的sessionid编码后的密文)
  name: 'sessionid', // 对应cookie的key
  cookie: { // 对应cookie成为持久化cookie ===> 关闭浏览器再打开还是以前的session
    maxAge: 1000*60*60*24*7
  }
})) // 用来处理session

// 注册路由器中间件
const router = require('./router')
app.use('/api', router)
const cookieRouter = require('./router/cookie')
app.use('/cookie', cookieRouter)
const sessionRouter = require('./router/session')
app.use('/session', sessionRouter)



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
