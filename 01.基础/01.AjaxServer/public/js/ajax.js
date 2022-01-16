function ajax(options){
           
    //定义默认
    var defaults ={
        type:'get',
        url:'',
        data:{},
        Headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        success:function(){},
        error:function(){}
    };
    //用options中的对象覆盖defaults中对象
    Object.assign(defaults,options);
    //创建
    var xhr= new XMLHttpRequest();
    //拼接请求参数变量
    var params='';
    //循环用户传递进来的对象格式参数
    for(var attr in defaults.data){
        //将参数转换成字符串格式
        params+= attr +'='+ defaults.data[attr] +'&';
    }
    //字符串截取，将最后的&截取掉
    params= params.substr(0,params.length -1);

    //判断请求方式
    if(defaults.type=='get'){
        defaults.url=defaults.url +'?'+ params;
    }

    //配置
    xhr.open(defaults.type,defaults.url);
    //发送请求
    if(defaults.type=='post'){
        //用户期望的向服务端传递的请求参数类型
        var contentType=defaults.Headers['Content-Type'];
        //post请求时必须设置的
        xhr.setRequestHeader('Content-Type',contentType);
        //判断请求参数类型
        if(contentType=='application/json'){
            xhr.send(JSON.stringify(defaults.data));
        }else{
            xhr.send(JSON.stringify(params));
        }
        
    }else{                
        xhr.send();
    }

    //监听onload事件,当接收完响应数据后触发
    xhr.onload=function(){
    //xhr.getResponseHeader()
    //获取响应头部数据
    var contentType=xhr.getResponseHeader('Content-Type');
    //服务端返回的数据
    var responseText=xhr.responseText;
    if(contentType.includes('application/json')){
        //把JSON字符串转换为JSON 对象
        responseText = JSON.parse(responseText);
    }

    //对http状态码判断，判断是否等于200
    if(xhr.status==200){
        //调用处理成功情况的函数
        defaults.success(responseText,xhr);
    }else{
        //调用处理失败的情况函数
        defaults.error(responseText,xhr);
    }       
    
    }
}
