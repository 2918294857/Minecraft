const express = require('express')
const jwt = require('jsonwebtoken')//身份验证加密
const expressJWT = require('express-jwt')//身份验证解密
const secreKey = 'itheima N01'//密钥
const router = express.Router()
//app.use(expressJWT({secret:secreKey}).unless({path:[/^\/api\//]}))

var db = require('./config');  



router.get('/a', async (req, res) => {
    let sql = `select * from Knowledge`;
    let data = await db(sql)
    console.log(data);
    res.send('Hello GET');
})



router.get('/login', (req, res) => {
    const data = req.query
    res.send('Hello GET');
})



router.post('/login', (req, res) => {
    const body = req.body
    //登录成功
    //const tokrnStr = jwt.sign({ username: req.body.username }, secreKey, { expiresIn: '30s' })
    res.send({
        //status: 200,
        //message: '登录成功',
        //token: tokrnStr
    })
})
module.exports = router