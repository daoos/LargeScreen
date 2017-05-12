# 电子投屏前端项目文档
## 目录结构
```
--build              //生产目录
	--css            //css
	--data           //
	--font           //
	--image          //
	--screen         // 新闻爬虫程序    

--src               // 开发目录
	--common        // 公共模块
	--data          // 本地json数据
	--images        // 图片资源
	--fonts         // 字体资源
	--vandor        // 其它依赖包
	--view          // 多页面目录
	--app.js        // 接口请求模块
	--config.js     // 投屏程序配置
	
--webpack.config.js  // 
--node_modules       // 第三方库包 
--template.html      // 生成html模版文件
--package.json       //
--README.md          //开发必读

```




## 开发步骤
npm install    // 安装依赖

npm run start  //开启本地服务 访问localhost:9090

  //构建打包（生产环境：自动压缩、合并，去除console.log等）


## 图表与地图 echarts2
采用基于cavans方案的echart库来绘制图表与地图。


### 配置方式：
具体配置查看echart配置文档

### 定时器&重绘

通过下面挂载在全局变量timer下的定时器，设定各区域渲染一次的间隔时间

```

TIMER

```




## 数据更新
### 每小时更新一次数据

```
## index.js

let everyHalfRequestData ＝ function()｛。。。｝
设定每半个小时更新一次数据，
通过everyHalfRequestData函数设定每个整点的10分与40分去服务端ajax一次数据，
服务端会每半小时重新生成一次数据，这里设置10分钟的延迟，
拉取数据成功后会重绘页面各区域
```

### 每小时内数据增长模拟
```
starttime: 每次拉取数据时会存入一个当前时间段的starttime时间戳；
_s: 	   已知半小时的增长总量（服务端返回），可以得到平均每s的增率；
getCurrentDate:(new Date().getTime() - starttime)/1000*_s  //得到当前数据量。
render: 通过render(getCurrentDate)函数渲染到页面。

```




## 响应式方案

```
* 通过js给根html设定基准fontSize值；

* 计算公式：（游览器窗口宽度／1237／100）（这里采用1237px作为标准设计稿尺寸）

* 其它元素尺寸采用‘rem’单位；（rem数值＊根font－size ＝ 元素最终显示尺寸）

* 通过webpack插件，不用手动去计算rem数值，直接按照标准设计稿定义px尺寸，webpack打包的时候会自动帮我们计算好rem数值； 
 	eg： #main｛width:1000px;height:400px｝//在样式文件我们只需这样正常写
		 #main｛width:10rem;height:4rem;｝//webpack会自动转化

其它api：  var px@rem ＝ lib.flexible.rem  ／／获取基准rem值


```