let config = {
	base:{
		// API_HOST:'3s.maosheng.com' //test
		// API_HOST:'',//本地数据
		API_HOST:'3s.mobvista.com',
		rate:3600000//间隔1小时去服务端拉取一次数据
	},
	clock:{
	    fontSize:0.25, 
	    fontFamily:"myFirstFontBold", 
	    fontColor: "#01dbff", 
	    fontWeight:"bold",
	    lineHight:'1.5', 
	    // bAmPm:true,
	    background:'transparent',
	    bShowHeartBeat:true
	},
	total:{
		impressCardinalNumber:34,
		rate:3000
	},
	worldMap:{
		rate:300000000,
		mun:3000000,//一个呼吸灯亮点代表的数量
		dataRange:false,
		pointColor:[//呼吸灯标注点 颜色分层    注意：要能被随机国家数 (N)整除
		    'rgba(255, 255, 255, 0.8)'
		    ],
        areaColor:[//地图配色，5个等级
        	'#0a7896',
	        '#0a5a78', 
	        '#0f3c55',
	        '#0f2d4b',
	        '#142431'
	    ],
	    company:[//公司办公点  其中美洲地区经度要偏移360度
            {name:"北京",geoCoord:[116.2330,39.5420]},
            // {name:"堪培拉",geoCoord:[149.0229,-35.2059]},
            // {name:"惠灵顿",geoCoord:[174.4657,-41.1858]},
            // {name:"华盛顿",geoCoord:[282.9967,38.5324]},
            {name:"广州",geoCoord:[113.2759952545166,23.117055306224895],symbolSize:5}
        ],
   	    app:{//随机冒泡app
	    	N:9,//随机选择9个国家
	    	S:10000,//驻留10秒
	    	T:15000//间隔15秒
	    }
	},
	pieChart:{
		rate:1000
	},
	barChart:{
		rate:1000
	},
	rollNews:{
		speed:100,
		rate:600000//每小时跟新
	},
	ranking:{
		rate:10000,
	}
}


export default config