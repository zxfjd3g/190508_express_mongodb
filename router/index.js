/* 
路由器中间件模块
*/
const express = require('express')
const md5 = require('blueimp-md5')
const UserModel = require('../models/UserModel')

const router = express.Router()

/* 
查看用户列表
*/
router.get('/users', (req, res) =>{
  UserModel.find({}, {pwd: 0}).then(
    userDocs => {
      res.render('users', {users: userDocs})
    },
    error => {
      res.render('error', {msg: '查询用户列表失败'})
    }
  )
})

/* 
添加用户
  1. 获取请求参数
  2. 处理数据
  3. 返回结果
*/
router.post('/add_user', (req, res) => {
  const {name, pwd, age, sex} = req.body
  UserModel.create({name, pwd: md5(pwd), age, sex}).then(
    userDoc => {
      res.redirect('/api/users')
    },
    error => {
      res.render('error', {msg: '添加用户失败'})
    }
  )
})
/* 
删除用户
*/
router.get('/delete_user', (req, res) => {
  const {id} = req.query
  UserModel.deleteOne({_id: id}).then(
    doc => {
      res.redirect('/api/users')
    },
    error => {
      res.render('error', {msg: '删除用户失败'})
    }
  )
})

// 向外暴露路由器
module.exports = router