/**** server.js ****/
// 一个简单的后端路由

//1.引入express框架
const express=require('express');

const fs=require('fs');

//2.引入路径处理模块
const path=require('path');
const bodyParser=require('body-parser');//post
//引入formidable
const formidable=require('formidable');//post

//3.创建web服务器
const app=express();

//post
//extended:返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
//解析urlencoded
app.use(bodyParser.urlencoded({extended: false}));
//解析json
app.use(bodyParser.json());

//4.静态资源访问服务器功能
app.use(express.static(path.join(__dirname,'public')));


//5.配置路由 request 请求   response 响应,回应
app.post('/formData',(request,response)=>{
    //创建formidable表单解析对象
    const form =new formidable.IncomingForm();
    //解析客户端传递过来的FormData对象
    form.parse(request,(err,fields,files) => {
        response.send(fields);
    });
});





//6.监听端口,进行回调
app.listen(3000,(err)=>{
    // 函数体
    if(!err) {
        console.log('测试ajax请求的服务器开启成功了!');
        console.log('正在监听3000端口...........');
    }
});
