import {randomNum} from './common/index';
let config = {
	base:{
		// API_HOST:'3s.maosheng.com' //test
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
             // 'red',
        	'#0a7896',
	        '#0a5a78', 
	        '#0f3c55',
	        '#0f2d4b',
	        '#142431'
	    ],
	    company:[//公司办公点 经度，纬度 美洲地区经度要偏移360度
            {name:"BeiJing",geoCoord:[116.2330,39.5420],itemStyle:{normal:{label:{textStyle:{baseline:'bottom'}}}}},
            {name:"GuangZhou（HongKong）",geoCoord:[113.2759952545166,23.117055306224895],symbolSize:5,itemStyle:{normal:{label:{textStyle:{baseline:'top'}}}}},
            {name:"Singapore",geoCoord:[103.41668000000002,1.3078],
            // itemStyle:{normal:{label:{textStyle:{baseline:'top'}}}}
            },
            {name:"Jakarta",geoCoord:[106.504416,-6.123155],
            // itemStyle:{normal:{label:{textStyle:{baseline:'top'}}}}
        	},
			{name:"Amsterdam" ,geoCoord:[4.5328,52.2241],itemStyle:{normal:{label:{position:'right',textStyle:{baseline:'top'}}}}},
			
			{name:"",geoCoord:[50,60],symbol:require('./images/GA_logo.svg'),symbolSize:[50,15],},
			{name:"Copenhagen",geoCoord:[12.34,55.43],itemStyle:{normal:{label:{position:'left',textStyle:{baseline:'bottom'}}}}},
			
			{name:"London",geoCoord:[-0.0741,51.3028],itemStyle:{normal:{label:{position:'left',textStyle:{baseline:'top'}}}}},

			{name:"Minneapolis",geoCoord:[267.85,45],itemStyle:{normal:{label:{textStyle:{baseline:'top'}}}}},
			{name:"Sartell",geoCoord:[267.85,45],itemStyle:{normal:{label:{textStyle:{baseline:'bottom'}}}}},
			{name:"",geoCoord:[238,45],symbol:require('./images/NX_logo.svg'),symbolSize:[40,10],},

			{name:"Seoul",geoCoord:[127.03,37.35],itemStyle:{normal:{label:{textStyle:{baseline:'top'}}}}},
			{name:"San Francisco" ,geoCoord:[237.750,37.480],itemStyle:{normal:{label:{textStyle:{baseline:'top'}}}}},
			{name:"New Delhi",geoCoord:[77.13,28.37],itemStyle:{normal:{label:{textStyle:{}}}}},
            
        ],
   	    app:{//随机冒泡app
	    	N:9,//随机选择9个国家
	    	S:10000,//驻留10秒
	    	T:randomNum(1,15)*1000//间隔随机1到30秒
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