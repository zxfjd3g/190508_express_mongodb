/* 
路由器中间件模块
*/
const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
  res.send('hello router1')
})

// 向外暴露路由器
module.exports = router