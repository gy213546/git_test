const express = require('express')
const router = express.Router()
const api = require('./api')
const fs = require('fs')
const path = require('path')
const sqlMap = require('./sqlMap')

const JwtUtil = require('./jwt')

router.get('/getValue', (req, res, next) => {
  api.getValue(req, res, next)
})

router.post('/setValue', (req, res, next) => {
  api.setValue(req, res, next, [])
})

// 图片上传
router.post('/edit/uploadimg', function (req, res) {
  let oldfile = req.files[0].path
  let newfile = req.files[0].path + path.parse(req.files[0].originalname).ext
  fs.renameSync(oldfile, newfile)
  return res.send({
    err: 0,
    msg: '上传文件成功',
    url:
      'http://localhost:3000/upload/' +
      req.files[0].filename +
      path.parse(req.files[0].originalname).ext,
  })
})

//保存文章
router.post('/saveArticle', function (req, res, next) {
  api
    .trans((conn) => {
      return api.trans
        .query(conn, sqlMap.setAtricle, [req.body.md, req.body.html])
        .then((result) => {
          return api.trans.query(conn, sqlMap.setArticleList, [
            result.insertId,
            req.body.title,
            req.tokenId,
          ])
        })
    })
    .then((result) => {
      console.log('事务提交成功')
      return res.send(result)
    })
    .catch((err) => {
      console.log('事务提交失败')
      res.status(500).send()
      throw err
    })
})
/**
 * 首页获取文章列表
 */
router.post('/getArticleList', function (req, res) {
  api
    .trans((conn) => {
      return api.trans.query(conn, sqlMap.getArticleList, [])
    })
    .then((result) => {
      console.log('事务提交成功')
      return res.send(result)
    })
    .catch((err) => {
      console.log('事务提交失败')
      res.status(500).send()
      throw err
    })
})
/**
 * 获取文章内容
 */
router.post('/getArticle', function (req, res) {
  api
    .trans((conn) => {
      return api.trans.query(conn, sqlMap.getArticle, [req.body.id])
    })
    .then((result) => {
      console.log('事务提交成功')
      return res.send(result)
    })
    .catch((err) => {
      console.log('事务提交失败')
      res.status(500).send()
      throw err
    })
})

/**
 * 用户注册
 */
router.post('/register', function (req, res) {
  api
    .trans((conn) => {
      return api.trans
        .query(conn, sqlMap.register, [req.body.userName, req.body.userPsw])
        .then((result) => {
          return res.send(result)
        })
    })
    .then((result) => {
      console.log('事务提交成功')
    })
    .catch((err) => {
      console.log('事务提交失败')
      throw err
    })
})

/**
 * login
 */
router.post('/login', function (req, res, next) {
  api
    .setValue(req, res, next, {
      sql: sqlMap.login,
      params: [req.body.userName, req.body.userPsw],
    })
    .then((result) => {
      if (result.length) {
        // 登陆成功，添加token验证
        let _id = result[0].id.toString()
        // 将用户id传入并生成token
        let jwt = new JwtUtil(_id)
        let token = jwt.generateToken()
        // 将 token 返回给客户端
        return res.send({
          err: 0,
          msg: '登陆成功',
          data: { userName: result[0].userName },
          token: token,
        })
      } else {
        return res.send({
          err: 1,
          msg: '账号密码错误',
        })
      }
    })
    .catch((err) => {
      throw err
    })
})
module.exports = router
