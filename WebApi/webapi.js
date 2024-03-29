const cors=require('cors')//跨域
const express=require('express')
const router=require('./Router.js')//路由
const app=express()
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api',router)

//错误处理
app.use((err,req,res,next)=>{
    res.status(500).send(err.message);
    })
//启动服务
app.listen(80,()=>{
    console.log('Express server running at http://127.0.0.1')
})