import echarts from 'echarts';
import temp from './impressionTop5.html';
import './impressionTop5.css';
import {setNumberSeparator} from '../modules/common.js';

$('.wrapper').append(temp);




let dom = document.getElementById("impressionDiv");
let myChart = echarts.init(dom);

//moco  
function getGeoNameTop5(){
	return ['INDIA','VIETNAM','THAILAND','USA','CHINA'];
}

function getGeoImpressCountTop5(str){
	if(str === 'start'){
		return [2579037,906404,519115,371880,349228]
	}else if (str === 'end') {
		return [(2579037+2665436),(906404+1012336),(519115+529565),(371880+409519),(349228+320195)]
	}
	console.log([[2579037,2665436],[906404,1012336],[519115,529565],[371880,409519],[349228,320195]]);
}


var app = {};
var option = {
    
    tooltip: { 
    	trigger: 'axis', 
    	// formatter: "{b}，{c}",
        formatter: function (params) {
             console.log(params)
             return '<div class="impressionTop5Pop-Up-Box">'+params[0].name+':  '+setNumberSeparator(params[0].value)+'</div>';
         },
    	extraCssText:'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
    	// padding:10,
        left:10,
    	axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
    },
    color:['rgba(1, 219, 255, 0.7)','rgba(1, 219, 255, 1)'],   
    grid:{
        show:false,
        top:20,
        containLabel:true,
    },
    xAxis:{
            type: 'category',
            // position:'top',
            // gridIndex:100,
            // name:'2222222',
            axisLine:{
            	lineStyle:{
            		color:'#01dbff',
            		width:2,
            	}
            },
            nameLocation:'end',
            axisTick:{show:false},
            axisLabel:{
                // show:false,
            	interval:'0',
            	textStyle:{
            		color:'#01dbff',
            	},
                formatter: function (params) {
                     return params;
                }
            },
            splitLine: {
            	show:false,
            	lineStyle:{
            		type:'dashed',
            		color:'rgba(255, 255, 255, 0.01)',
            	}
            },
            splitArea:{
                show:true,
                areaStyle:{
                    opacity:.05,
                }
            },

            boundaryGap: true,
            data: getGeoNameTop5(),
    },
    yAxis: {
            type: 'value',
            nameLocation:'end',
            position:'left',
            axisLine:{
            	lineStyle:{
            		color:'#01dbff',
            		width:2,
            	}
            },
            minInterval:1,
            axisTick:{show:false},
            axisLabel:{
            	show:false
            },
            splitLine: {
            	show:false,
            },

            splitArea:{
                show:true,
                areaStyle:{
                    opacity:.05,
                }
            },

            scale: false,
            
    },

    series: [
        {           
            type:'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function (params) {
                         // console.log(params)
                         return setNumberSeparator(params.value);
                    }
                }
            },
            data:getGeoImpressCountTop5('start'),
        }
    ]
};
clearInterval(app.timeTicket);

function getAddCountBySecond(){
    var data1 = getGeoImpressCountTop5('end');
    console.log(data1);
    var _data1 = [];
    data1.map(function(s){
        _data1.push(Math.floor(s/1800));
    });
    console.log(_data1)
    return _data1;
}

var _data1 = getAddCountBySecond();

app.timeTicket = setInterval(function (){
    var data0 = option.series[0].data;
    data0[0] = data0[0] + _data1[0]*3;
    data0[1] = data0[1] + _data1[1]*3;
    data0[2] = data0[2] + _data1[2]*3;
    data0[3] = data0[3] + _data1[3]*3;
    data0[4] = data0[4] + _data1[4]*3;

    myChart.setOption(option);
}, 1000);

if (option && typeof option === "object") {
    var startTime = +new Date();
    myChart.setOption(option, true);
    var endTime = +new Date();
    var updateTime = endTime - startTime;
    console.log("Time used:", updateTime);
}




