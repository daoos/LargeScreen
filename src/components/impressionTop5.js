import echarts from 'echarts';
import temp from './impressionTop5.html';
import './impressionTop5.css';
import {setNumberSeparator, impressCardinalNumber,delcommafy,commafy} from '../modules/common.js';
import {__tw, name_to_code} from '../modules/geocfg.js';

export default class ImpressionTop5{
    init(){$('.chartArea').append(temp)}
    render(_DATA){   
        let geoTopFiveData = _DATA.geoTopFive;
        let starttime = localStorage.START_TIME;
        let px2rem = lib.flexible.rem; // 当前页面的rem基准值
        // let impressCardinalNumber = 34;
   
        let dom = document.getElementById("impressionDiv");
        let myChart = echarts.init(dom);
         
        let getGeoTop5 = function(str){ 
            let ss = impressCardinalNumber;
            var strlist=[]; 
            for (var i = 0; i < geoTopFiveData.length; i++) {
                if(str==='country') {
                    let p = (geoTopFiveData[i].country).toUpperCase();
                    let c3 = __tw[p] || false;
                    // console.log(c3,p,3,geoTopFiveData[i].country)
                    function _flipObject(o){
                        var newO ={};
                        for(var s in o){newO[o[s]]= s}
                        return newO;
                    }
                    var __name_to_code = _flipObject(name_to_code);
                    strlist.push(__name_to_code[c3]);
                    
                }
                if (str==='c') {
                    let c = (geoTopFiveData[i].country).toUpperCase();
                    strlist.push(c);
                }
                if(str==='start') strlist.push(geoTopFiveData[i].start*ss);
                if(str ==='increase') strlist.push(geoTopFiveData[i].increase*ss);
                if(str==='total') strlist.push(geoTopFiveData[i].start + geoTopFiveData.increase*ss)
            }
            return strlist;
        };  

        let geoTopFiveStart =  getGeoTop5('start');
        let geoTopFiveIncrease = getGeoTop5('increase');
        let geoTopFiveCountry = getGeoTop5('country');
        let geoTopFiveC = getGeoTop5('c');


        
        
        var getOption = function(currnt){ return {
            
            tooltip: { 
                trigger: 'axis', 
                // formatter: "{b}，{c}",
                formatter: function (params) {
                     // console.log(params[0].value)
                     return '<div class="impressionTop5Pop-Up-Box">'+params[0].name+':  '+commafy(params[0].value)+'</div>';
                 },
                // extraCssText:'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
                // padding:10,
                left:.16*px2rem,
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                textStyle:{
                    fontSize:0.14*px2rem,
                    fontFamily:'myFirstFont',
                 }
            },
            color:['rgba(1, 219, 255, 1)','rgba(1, 219, 255, 1)'],   
            grid:{ top:0.16*px2rem,left:0.016*px2rem,right:0.016*px2rem,bottom:0.48*px2rem},//
            xAxis:{
                    type: 'category',
                    // position:'top',
                    // gridIndex:100,
                    // name:'2222222',
                    axisLine:{
                        lineStyle:{
                            color:'#01dbff',
                            width:.01*px2rem,
                        }
                    },
                    nameLocation:'end',
                    axisTick:{show:false},
                    axisLabel:{
                        // show:false,
                        interval:'0',
                        textStyle:{
                            color:'#01dbff',
                            fontSize:0.12*px2rem,
                            fontFamily:'myFirstFont',
                        },
                        // margin:0.08*px2rem,
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
                    data: geoTopFiveC,
            },
            yAxis: {
                    type: 'value',
                    nameLocation:'end',
                    position:'left',
                    axisLine:{
                        lineStyle:{
                            color:'#01dbff',
                            width:.01*px2rem,
                        }
                    },
                    minInterval:1,
                    axisTick:{show:false},
                    axisLabel:{
                        show:false,
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
                    containLabel:true,
                    top:0,
                    label: {
                        normal: {
                            show: true,
                            position: [-.1*px2rem,-.2*px2rem],
                            formatter: function (params) {
                                 // console.log(params)
                                 return setNumberSeparator(params.value);
                            },
                            textStyle:{
                                fontSize:0.10*px2rem,
                                fontFamily:'myFirstFont',

                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            barBorderRadius:[1, 1, 0, 0],
                        },                    
                    },
                    // barGap: '30%',
                    barCategoryGap: '45%',

                    data:currnt,
                }
            ]
        }};

        var app = {};


        clearInterval(timer.impressTimeTicket);

        function getCurrentData(){
            var start = geoTopFiveStart;
            var increase = geoTopFiveIncrease;
            var s = (new Date().getTime() - starttime)/1000;
            var data = [],_s=[];
            for (var i = 0; i < start.length; i++) {
                data.push((Math.floor((increase[i]/1800) * s + start[i])));
                _s.push(increase[i]/1800);

            }
            // console.log('IMPRESSIONTOP5----')
            // console.log('start: '+ start)
            // console.log('increase: '+increase)
            // console.log('country: '+geoTopFiveCountry)    
            // console.log('currnt:  '+data)
            // console.log('s:  '+s)
            // console.log('_S:  '+_s)
            // console.log(s,increase,data)

            return data;      
        };


        function render(){ 
            var option = getOption(getCurrentData());
            myChart.setOption(option,true);            
        };


        render();
        
        timer.impressTimeTicket = setInterval(function(){render()}, 1000);
       
        
        
        function renderImages(){
            // var _p = p.replace(/ /g,'%20');

            var str='';
            for (var i = 0 ; i < geoTopFiveCountry.length; i++) {
                var _p = geoTopFiveCountry[i].replace(/ /g,'%20');
                str += '<li><img height="100%" src="./src/images/png/'+_p+'.png" /></li>';
            }
            $('.impressionImgArea').html(str);
        }

        renderImages();
    }
    
}


