const express = require('express')
const routerApi = require('./router')
const bodyParser = require('body-parser')
const multer = require('multer')
const JwtUtil = require('./jwt')
const app = express()

app.use((req, res, next) => {
  console.log(req.url)
  if (req.url == '/saveArticle' || req.url == '/uploadimg') {
    let token = req.headers['authorization']
    if (!token) {
      res.status(401).send({
        msg: '未登录',
      })
    }
    let jwt = new JwtUtil(token)
    let result = jwt.verifyToken()
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result === 'err') {
      res.status(401).send({
        msg: '登录过期，请重新登录',
      })
    } else {
      req.tokenId = result
      next()
    }
  } else {
    next()
  }
})

app.use(bodyParser.json())

// 静态资源托管
app.use(express.static('./static'))

//2.实例化multer   配置中间件
let objMulter = multer({
  dest: './static/upload',
}) //dest  指定  保存位置(服务器)
// server.use(objMulter.image())   仅允许上传图片类型的文件
app.use(objMulter.any()) //允许上传所有类型的文件

app.use('/', routerApi)

module.exports = {
  path: 'api',
  handler: app,
}
