import echarts from 'echarts';
import temp from './advertiserTop5.html';
import './advertiserTop5.css';
import {setNumberSeparator, impressCardinalNumber,delcommafy,commafy} from '../modules/common.js';

export default class AdvertiserTop5{
    init(){$('.chartArea').append(temp); 
    }
    render(_STORE){
        // let appTopFiveMocoData = [{"start":570117,"increase":597407,"package_name":"com.dianxinos.dxbs","icon":"http:\/\/lh4.ggpht.com\/1DYsBCMQWYtF-iG65AXrtK3YVT-U10TZVrJF9OsQNTOk5YsR4wfgmObWAlcImj2_2Xw=w300","total":221061848},{"start":434359,"increase":430993,"package_name":"com.myntra.android","icon":"http:\/\/lh3.googleusercontent.com\/J_IPZOnXakLkFCxbOC6tKcvtUbuI7WSkvjoRQh9-QjZV4o0cVSe1TzfaewGi_2f5RQ=w300","total":221061848},{"start":302008,"increase":222834,"package_name":"com.makemytrip","icon":"http:\/\/lh3.googleusercontent.com\/1llAcleLs0UDr5ysUl_C4aHM-vN70HGTy7gjlM78SLsPCOijj7oosBLQc26G2daqOg=w300","total":221061848},{"start":233680,"increase":243252,"package_name":"com.hola.launcher","icon":"http:\/\/lh3.googleusercontent.com\/bSmbYAyzKdQ91OFq3rOmt6gMiddoVt96XFDI-vluh21Wz9CphZ542ft-vbXeO45cBRz6=w300","total":221061848},{"start":216923,"increase":207930,"package_name":"com.mobikwik_new","icon":"https:\/\/lh3.googleusercontent.com\/hPxFVrjDioFUjuqiEZF8-ZzYZ6YCUSyVHbcDr_zKxMbc55_5fQkYyA5egxbpfYpaz_uT=w300","total":221061848}];
        let appTopFiveData = _STORE.appTopFive;
        let starttime = localStorage.START_TIME;
        let ss = impressCardinalNumber;
        let px2rem = lib.flexible.rem;

        var myChart0 = echarts.init(document.querySelector('#main1'));
        var myChart1 = echarts.init(document.querySelector('#main2'));
        var myChart2 = echarts.init(document.querySelector('#main3'));
        var myChart3 = echarts.init(document.querySelector('#main4'));
        var myChart4 = echarts.init(document.querySelector('#main5'));

        function getOption(current,relative){
            return {
            tooltip: { 
                textStyle:{
                    fontSize:0.14*px2rem,
                }
                // alwaysShowContent: true,
                // formatter: function (params) {
                //                  // console.log(params)
                //                  // let value = Number(params.value);
                //                  return commafy(params[0].value);
                //             }
            },
            grid:{containLabel:true},
            color:['#54DEF1','#787E8A'],      
            
            series: [
                {
                    type:'pie',
                    // center: ['100%', '10%'],
                    radius: ['85%','100%'],
                    legendHoverLink:false,
                    hoverAnimation:false,
                    clockwise:false,
                    avoidLabelOverlap: false,
                    // avoidLabelOverlap: true,//防止重叠
                    label:{
                        normal:{
                            textStyle:{
                                fontSize:0.10*px2rem,
                                }

                        }
                    },
                    markPoint:{
                        symbol:'rect',
                    },
                    data:[
                        {
                            value:current,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    formatter: function (params) {
                                         return setNumberSeparator(params.value);
                                    }

                                },
                                emphasis:{
                                    show: true,
                                    position: 'center',
                                },
                            },
                            itemStyle: {
                                shadowColor: 'red',
                                shadowBlur: 10,
                                shadowOffsetX:1,
                                shadowOffsetY:1,
                            },

                            

                        },
                        {
                            value:relative,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'inside',
                                },
                                emphasis:{show:false}
                            },
                            // selected:true

                        },
                    ]
                }
            ]
            }
            // console.log(7,current)
        }

        function getCurrentData(start,increase){
            if (increase){
                var s = (new Date().getTime() - starttime)/1000;
                var data = Math.floor((increase*ss/1800) * s + start*ss);
                 // console.log('APPTOPFIVE-----','start:'+start,'increase:'+increase,'current:'+data/ss,'s:'+s,'_s:'+increase/1800);
                 // console.log('increase*34:'+increase*34,'current*34:'+data,'_s*34:'+increase*34/1800);
                return data;
;
            }       
        }

        function render(){
            appTopFiveData.map(function(S,i){               
                $('#iconarea'+(i+1)).html('<img style="width:40%;min-height:100%;margin:auto;" src='+S.icon+'>');
                let current = getCurrentData(S.start,S.increase);
                let total = S.total*ss;
                let relative = total - current;
                if (current>total) {
                    current = total;     
                    relative=0;
                }
                // console.log('current*34:'+current,'relative:'+relative,'total:'+S.total,'(total*34:'+S.total*ss+')');

                let option = getOption(current,relative);
                [myChart0,myChart1,myChart2,myChart3,myChart4][i].setOption(option,true);
            })
        }
        
        render();
        setInterval(function(){render()}, 1000);

    }
}




