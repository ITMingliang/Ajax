/**** server.js ****/
// 一个简单的后端路由

//1.引入express框架
const express=require('express');

//2.引入路径处理模块
const path=require('path');

//3.创建web服务器
const app=express();

//4.静态资源访问服务器功能
app.use(express.static(path.join(__dirname,'public')));


//5.配置路由 request 请求   response 响应,回应

//test路由，对应01.html
app.get('/test',(request,response)=>{
    //响应
    response.send({name:"Ajax",message:"您好~~~~"});
});

//get路由 ，对应02.html
app.get('/get',(request,response)=>{
    //响应
    response.send(request.query);
});

//post路由 ，对应03.html
app.get('/post',(request,response)=>{
    //响应
    response.send(request.query);
});

//6.监听端口,进行回调
app.listen(3000,(err)=>{
    // 函数体
    if(!err) {
        console.log('测试ajax请求的服务器开启成功了!');
        console.log('正在监听3000端口...........');
    }
});
