import echarts from 'echarts';
import Mustache from 'mustache';
import temp from './advertiserTop5.html';
import './advertiserTop5.css';
import {setNumberSeparator} from '../modules/common.js';


$('.wrapper').append(temp); 

let makeChart = echarts.init;
let mychart1 = makeChart(document.querySelector('#main1'));
let mychart2 = makeChart(document.querySelector('#main2'));
let mychart3 = makeChart(document.querySelector('#main3'));
let mychart4 = makeChart(document.querySelector('#main4'));
let mychart5 = makeChart(document.querySelector('#main5'));
var option = null;


//moco 

var datalist = ['INDIA','VIETNAM','THAILAND','USA','CHINA'];

function getAdvertiserIcon(){
    // return 
}

console.log(localStorage.localdata.common);

function getAdvertiserCountTop5(str){
    if(str === 'start'){
        return [570117,434359,302008,233680,216923]
    }else if (str === 'end') {
        return [(570117+597407),(434359+430993),(302008+222834),(233680+243252),(216923+237930)]
    }
    
}



var app = {};

// function getOption(s){
   option =  {
    
    tooltip: { 
        formatter: "{c},{d}",
    },
    color:['#54DEF1','#787E8A'],      
    
    series: [
        {
            type:'pie',
            center: ['50%', '50%'],
            radius: ['100%','85%'],
            legendHoverLink:false,
            hoverAnimation:false,
            clockwise:false,
            avoidLabelOverlap: false,
            avoidLabelOverlap: true,//防止重叠
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    formatter:'{c}'
                },
                emphasis: {
                    show: false,
                }
            },
            markPoint:{
                symbol:'rect',
            },
            data:[
                {
                    value:getAdvertiserCountTop5('start')[0],
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: function (params) {
                                 // console.log(params)
                                 return setNumberSeparator(params.value);
                            }

                        }
                    },
                    emphasis:{show:false}

                },
                {
                    value:getAdvertiserCountTop5('end')[0]-getAdvertiserCountTop5('start')[0],
                    label: {
                        normal: {
                            show: false,
                            position: 'inside',
                            formatter:'{c}'
                        }
                    },

                },
            ]
        }
    ]
};




function getAddCountBySecond(){
    var data1 = getAdvertiserCountTop5('end');
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
    
    
    option.series[0].data[0].value = option.series[0].data[0].value + Math.floor(Math.random()*100-1.5);
    option.series[0].data[1].value = option.series[0].data[1].value + Math.floor(Math.random()*100-2.5);
    // console.log(option.series[0].data[0].value)

    mychart1.setOption(option,true);
    mychart2.setOption(option,true);
    mychart3.setOption(option,true);
    mychart4.setOption(option,true);
    mychart5.setOption(option,true);

}, 1000);


function callmychart(str){
      
      str.setOption();
}


