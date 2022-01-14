/**** server.js ****/
// 一个简单的后端路由

//1.引入express框架
const express=require('express')

//2.引入路径处理模块
const path=require('path')

//3.创建web服务器
const app=express();

//4.配置路由 request 请求       response 响应,回应
app.get('/test',(request,response)=>{
    //响应
    response.send({name:"Ajax",message:"您好~~~~"});
})

//5.静态资源访问服务器功能
app.use(express.static(path.join(__dirname,'public')))

//6.监听端口,进行回调
app.listen(3000,(err)=>{
    // 函数体
    if(!err) {
        console.log('测试ajax请求的服务器开启成功了!');
        console.log('正在监听3000端口...........');
    }
})
