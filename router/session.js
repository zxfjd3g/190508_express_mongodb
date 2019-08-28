/* 
路由器中间件模块
*/
const express = require('express')
const router = express.Router()

const users = []

/* 
登陆 ==> 将用户ID保存到session对象
*/
router.get('/login', (req, res) =>{
  
  const {name, pwd} = req.query
  const user = {
    id: Date.now(),
    name,
    pwd
  }
  users.push(user)

  console.log('登陆查询得到用户', user)

  // 得到session(很可能是新创建的)
  const session = req.session
  // 将用户的id保存到session对象中
  session.userid = user.id


  res.redirect('/session_test.html')
})

/* 
获取当前会话对应的用户信息
*/
router.get('/user_info', (req, res) =>{
  // 得到session保存的用户id
  const userid = req.session.userid
  // 根据userid查询得到对应的用户
  const user = users.find(user => user.id===userid)
  if (user) {
    res.json({status: 0, data: user})
  } else {
    res.json({status: 1, msg: '还未登陆'})
  }
})

/* 
退出登陆
*/
router.get('/logout', (req, res) =>{
  //  删除保存在session对象的用户id
  delete req.session.userid
  res.redirect('/session_test.html')
})



// 向外暴露路由器
module.exports = router