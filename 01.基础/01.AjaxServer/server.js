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

//test路由，对应01.html
app.get('/test',(request,response)=>{
    //响应
     response.send({name:"Ajax",message:"您好~~~~"});
    //response.status(400).send({name:"Ajax",message:"您好~~~~"});//手动输出错误情况
});
app.post('/test',(request,response)=>{
    //响应
    response.send(request.body);
});

//get路由 ，对应02.html
app.get('/get',(request,response)=>{
    //响应
    response.send(request.query);
});

//post路由 ，对应03.html
app.post('/post',(request,response)=>{
    //响应
    response.send(request.body);
});

//post路由 ，对应04.html
app.post('/json',(request,response)=>{
    //响应
    response.send(request.body);
});

//get路由 ，对应05.html
app.get('/readyState',(request,response)=>{
    //响应
    response.send('hello!');
});

//get路由 ，对应06.html
app.get('/error',(request,response)=>{
    //响应
    //console.log(abc);//500状态码，服务端错误，因为abc未定义
    response.status(400).send('not ok!');
});

//get路由 ，对应07.html
app.get('/cache',(request,response)=>{
   fs.readFile('./test.txt',(err,result)=>{
     response.send(result);
   })
});

//get路由 ，对应11.html
app.get('/verifyEmailAdress',(request,response)=>{
    //响应
    const email = request.query.email;
	if (email == "1425271996@qq.com") {
		response.status(400).send({message: "邮箱地址已被注册"})
	} else {
		response.send({message: "邮箱地址可用"})
	}    
});

//get路由 ，对应12.html
app.get('/searchAutoPrompt',(request,response)=>{
    //响应
    const key = request.query.key;
    var result=["无匹配内容"];
	if (key == "合肥") {
        result=['合肥蜀山区','合肥瑶海区','合肥肥西','合肥肥东','合肥新站区'];
		response.send(result)
	} else if(key == "阜阳") {
        result=['阜阳市阜南县','阜阳卷膜','阜阳火车站','阜阳格拉条'];
		response.send(result)
	}else {
        response.send(result)
    }  
});


//get路由 ，对应 province
app.get('/province',(request,response)=>{
    //响应
    var data= new Array({id:1,name:"黑龙江省"},{id:2,name:"四川省"},{id:3,name:"河北省"},{id:4,name:"安徽省"});
    response.send(data)
});

//get路由 ，对应 cities
app.get('/cities',(request,response)=>{
    //响应
    const id = request.query.id;
    var data= new Array();
	if (id == 1) {      
        data =new Array({id:101,name:"哈尔滨市"},{id:102,name:"齐齐哈尔市"},{id:103,name:"牡丹江市"},{id:104,name:"佳木斯市"},{id:105,name:"其他市"});
		response.send(data)
	} else if(id == 2) {
        data =new Array({id:201,name:"成都市"},{id:202,name:"绵阳市"},{id:203,name:"德阳市"},{id:204,name:"攀枝花市"},{id:205,name:"其他市"});
		response.send(data)
	}
    else if(id == 3) {
        data =new Array({id:301,name:"河北市"},{id:302,name:"石家庄市"},{id:303,name:"唐山市"},{id:304,name:"保定市"},{id:305,name:"其他市"});
		response.send(data)
	}
    else if(id == 4) {
        data =new Array({id:401,name:"合肥市"},{id:402,name:"滁州市"},{id:403,name:"宿州市"},{id:404,name:"阜阳市"},{id:405,name:"其他市"});
		response.send(data)
	} 
});


//get路由 ，对应 areas
app.get('/areas',(request,response)=>{
   //响应
   const id = request.query.id;
   var data= new Array();
   if (id == 101) {      
       data =new Array({id:1011,name:"依兰县"},{id:1012,name:"方正县"},{id:1013,name:"宾县"},{id:1014,name:"木兰县"},{id:1015,name:"其他县"});
       response.send(data)
   } else if(id == 102) {
    data =new Array({id:1021,name:"龙江县"},{id:1022,name:"依安县"},{id:1023,name:"泰来县"},{id:1024,name:"拜泉县"},{id:1025,name:"其他县"});
       response.send(data)
   }
   else if(id == 103) {
    data =new Array({id:1031,name:"林口县"},{id:1032,name:"其他县"});
       response.send(data)
   }
   else if(id == 104) {
    data =new Array({id:1041,name:"桦南县"},{id:1042,name:"桦川县"},{id:1043,name:"其他县"});
       response.send(data)
   } else if(id == 105) {
    data =new Array({id:1051,name:"其他县"});
    response.send(data)
    } 
// 其他城市的就不写进行测试了，实际项目中还维护到数据库中，然后从数据库查询带出
});


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
