 export function ajaxp(url,callback){

 $.ajax({

    type: "get",

    url:url, // 这个就是不同于当前域的一个URL地址，这里单纯演示，所以同域

    dataType: "jsonp",

    jsonp: "jsonpReturn",  // 指定回调函数，这里名字可以为其他任意你喜欢的，比如callback，不过必须与下一行的GET参数一致

    data: "", // jsonpcallback与上面的jsonp值一致

    success: function (data) {
       callback;

       console.log(data)

    }
});

}

