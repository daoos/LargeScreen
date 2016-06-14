 import echarts from 'echarts';
// import 'echarts';
// var echarts = require('echarts');
import Mustache from 'mustache';
import temp from './advertiserTop5.html';
import './advertiserTop5.css';


export default class AdvertiserTop5 {
    init(){
    	$('.wrapper').append(temp); 
    	
    	const makeChart = echarts.init;
		var option = null;
		

		option = {
		    baseOption: {
		        timeline: {
		            axisType: 'value',
		            // realtime: false,
		            // loop: false,
		            autoPlay: true,
		            // currentIndex: 2,
		            playInterval: 1000,
		            data: [1,2,3,4,5,6,7,8,9],
		            show:false		            
		        },        
		        calculable : true,
		        tooltip: { formatter: "{a}, {b}，{c}，{d}"},
		        color:['#54DEF1','#787E8A'],
		        grid: {
		            top: 80,
		            bottom: 100
		        },

		        //
		        series: [
	                {   //name: 'GDP占比',
			                type: 'pie',
			                center: ['50%', '50%'],
			                radius: ['100%','85%'],
			                legendHoverLink:false,
			                hoverAnimation:false,
			                clockwise:false,
			                // animation:true,
			                // animationEasingUpdate:'linear',
			                
			        }
		        ]
		    },
		    ////////
		    options: [
		        {
		            series: [
		                {data: [
		                    {
		                    	// 
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
		                    	//  
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
		        },

		        {
		            series: [
		                {data: [
		                    { value: 13065 + Math.floor(Math.random() * 10),label: {
		                            normal: {
		                                show: true,
		                                position: 'center',
		                                formatter:'{c}'
		                            },
		                        },},
		                    { value: 3800 + Math.floor(Math.random() * 1),label: {
		                            normal: {
		                                show: false,
		                                position: 'inside',
		                                formatter:'{c}'
		                            },
		                        },},

		                ]}

		            ]
		        },
		        {
		            series: [
		                {data: [
		                    {value: 13065 + Math.floor(Math.random() * 10),label: {
		                            normal: {
		                                show: true,
		                                position: 'center',
		                                formatter:'{c}'
		                            },
		                        },},
		                    { value: 3800 + Math.floor(Math.random() * 1),label: {
		                            normal: {
		                                show: false,
		                                position: 'inside',
		                                formatter:'{c}'
		                            },
		                        },},

		                ]}

		            ]
		        },
		        {
		            series: [
		                {data: [
		                    {value: 13065 + Math.floor(Math.random() * 10),label: {
		                            normal: {
		                                show: true,
		                                position: 'center',
		                                formatter:'{c}'
		                            },
		                        },},
		                    { value: 3800 + Math.floor(Math.random() * 1),label: {
		                            normal: {
		                                show: false,
		                                position: 'inside',
		                                formatter:'{c}'
		                            },
		                        },},

		                ]}

		            ]
		        },
		    ]
		};

		function setTimelineData(time,totaldata){
		    for (var i = time - 1; i >= 0; i--) {
		        time 
		    }
		}

		makeChart(document.querySelector('#main1')).setOption(option,true);
		makeChart(document.querySelector('#main2')).setOption(option,true);
		makeChart(document.querySelector('#main3')).setOption(option,true);
		makeChart(document.querySelector('#main4')).setOption(option,true);
		makeChart(document.querySelector('#main5')).setOption(option,true);

        //测试
		window.setInterval(function(){
			// option.option['series'][0]['data'][0]['value'] = Math.floor(Math.random() * 10);
			// option.option['series'][0]['data'][1]['value'] = Math.floor(Math.random() * 10000); 
			makeChart(document.querySelector('#main1')).setOption(option,true);
			makeChart(document.querySelector('#main2')).setOption(option,true);
			makeChart(document.querySelector('#main3')).setOption(option,true);
			makeChart(document.querySelector('#main4')).setOption(option,true);
			makeChart(document.querySelector('#main5')).setOption(option,true);
		}, 30000);

    	
    };
}