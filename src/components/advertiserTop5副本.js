import echarts from 'echarts';
import temp from './advertiserTop5.html';
import './advertiserTop5.css';


$('.wrapper').append(temp); 

// let main = ["#main1","#main2","#main3","#main4","#main5"];
// let mainlist = [];
// main.map(function(s){
//     mainlist.push(echarts.init(document.querySelector(s)));
// });

// console.log(mainlist);

let dom2 = document.getElementById("main1");
let myChart2 = echarts.init(dom2);

var app = {};
var option = null;


// let dom1 = document.querySelector('#main1');

// let makeChart = echarts.init(dom1);
// var option = null;


option = {
           
    tooltip: { formatter: "{a}, {b}，{c}，{d}"},
    color:['#54DEF1','#787E8A'],

    series: [
        {data: [
            {
            	type: 'pie',
                center: ['50%', '50%'],
                radius: ['100%','85%'],
                legendHoverLink:false,
                hoverAnimation:false,
                clockwise:false,

                value:  13065 + Math.floor(Math.random() * 1000),
        		label: {
                    normal: {
                        show: true,
                        position: 'center',
                        formatter:'{c}'
                    }
                },
            },
            {
            	type: 'pie',
                center: ['50%', '50%'],
                radius: ['100%','85%'],
                legendHoverLink:false,
                hoverAnimation:false,
                clockwise:false,
  
               	value: 3800 + Math.floor(Math.random() * 1),
            	label: {
                    normal: {
                        show: false,
                        position: 'inside',
                        formatter:'{c}'
                    }
                },
            }

        ]}

    ]
}

myChart2.setOption(option,true);
// makeChart(document.querySelector('#main2')).setOption(option,true);
// makeChart(document.querySelector('#main3')).setOption(option,true);
// makeChart(document.querySelector('#main4')).setOption(option,true);
// makeChart(document.querySelector('#main5')).setOption(option,true);

// //测试
// window.setInterval(function(){
// 	// option.option['series'][0]['data'][0]['value'] = Math.floor(Math.random() * 10);
// 	// option.option['series'][0]['data'][1]['value'] = Math.floor(Math.random() * 10000); 
// 	makeChart.setOption(option,true);
// 	// makeChart(document.querySelector('#main2')).setOption(option,true);
// 	// makeChart(document.querySelector('#main3')).setOption(option,true);
// 	// makeChart(document.querySelector('#main4')).setOption(option,true);
// 	// makeChart(document.querySelector('#main5')).setOption(option,true);
// }, 30000);


// clearInterval(app.timeTicket);

// app.count = 11;
// app.timeTicket = setInterval(function (){
//     var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

//     var data0 = option.series[0].data;
    
//     data0.shift();
//     data0.push(Math.round(Math.random() * 1000));
//     // option.xAxis.data.shift();
//     // option.xAxis.data.push(axisData);
    
//     myChart.setOption(option);
// }, 2100);

// if (option && typeof option === "object") {
//     var startTime = +new Date();
//     myChart.setOption(option, true);
//     var endTime = +new Date();
//     var updateTime = endTime - startTime;
//     console.log("Time used:", updateTime);
// }

