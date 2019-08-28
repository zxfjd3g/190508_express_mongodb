/* 
路由器中间件模块
*/
const express = require('express')
const router = express.Router()

/* 
向浏览器返回cookie数据
*/
router.get('/test1', (req, res) =>{
  
  // 返回会话cookie
  res.cookie('name', 'tom')
  // 返回持久化cookie
  res.cookie('age', 12, {maxAge: 1000*10})

  res.redirect('/cookie_test.html')
})

/* 
读取浏览器请求携带的cookie
*/
router.get('/test2', (req, res) =>{
  
  const {name, age} = req.cookies
  console.log('/test2 cookie name=', name, 'age=', age)

  // 告诉浏览器删除对应的cookie
  // res.clearCookie('name')
  res.cookie('name', '', {maxAge: 0})

  res.redirect('/cookie_test.html')
})

// 向外暴露路由器
module.exports = router