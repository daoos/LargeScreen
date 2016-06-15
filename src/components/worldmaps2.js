require('../../vandor/geojson.js');
require('../../vandor/lonlat.js');
import echarts from '../../vandor/echarts.min.js';
import '../../vandor/World.js';

import template from './worldMap.html';
require('./worldMap.css');


$('body').html(template);



// var lonlat = new Lonlat();
// var result = lonlat.getLonLat('CN', 1000);
//console.log(result);


// var convertData  = function () {
//     var res = [];
//     for (var i = 0; i < result.length; i++) {
//         res.push([result[i].lon, result[i].lat, 1]);
//     }
//     return res;
// };

// var ddd = convertData();

var myChart = echarts.init(document.getElementById('mapdiv'));



var data =[];
var option = null;

function generateChartData() {
    
    for (var i = 0; i <= 10000; i++) {
            data[i] = {};
            data[i].latitude=Math.floor(Math.random()*(200-0+1)+0);
            data[i].longitude=Math.floor(Math.random()*(200-0+1)+0);
            data.push(data[i]);
        };
    return data;
}




myChart.showLoading();

$.get('weibo.json', function (weiboData) {
    myChart.hideLoading();

    weiboData = weiboData.map(function (serieData, idx) {
        var px = serieData[0] / 1000;
        var py = serieData[1] / 1000;
        var res = [[px, py]];

        for (var i = 2; i < serieData.length; i += 2) {
            var dx = serieData[i] / 1000;
            var dy = serieData[i + 1] / 1000;
            var x = px + dx;
            var y = py + dy;
            res.push([x, y, 1]);

            px = x;
            py = y;
        }
        return res;
    });
    myChart.setOption(option = {
        backgroundColor: '#404a59',
        title : {
            text: '微博签到数据点亮中国',
            subtext: 'From ThinkGIS',
            sublink: 'http://www.thinkgis.cn/public/sina',
            left: 'center',
            top: 'top',
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            left: 'left',
            data: ['强', '中', '弱'],
            textStyle: {
                color: '#ccc'
            }
        },
        geo: {
            name: '强',
            type: 'scatter',
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [{
            name: '弱',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 1,
            large: true,
            itemStyle: {
                normal: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(37, 140, 249, 0.8)',
                    color: 'rgba(37, 140, 249, 0.8)'
                }
            },
            data: weiboData[0]
        }, {
            name: '中',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 1,
            large: true,
            itemStyle: {
                normal: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(14, 241, 242, 0.8)',
                    color: 'rgba(14, 241, 242, 0.8)'
                }
            },
            data: weiboData[1]
        }, {
            name: '强',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 1,
            large: true,
            itemStyle: {
                normal: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(255, 255, 255, 0.8)',
                    color: 'rgba(255, 255, 255, 0.8)'
                }
            },
            data: weiboData[2]
        }]
    });
});

// myChart.setOption(option = {
//     backgroundColor: '#404a59',

//     legend: {
//         left: 'left',
//         data: ['强', '中', '弱'],
//         textStyle: {
//             color: '#ccc'
//         }
//     },

//     geo: {
//         name: '强',
//         type: 'scatter',
//         map: 'world',
//         label: {
//             emphasis: {
//                 show: false
//             }
//         },
//         itemStyle: {
//             normal: {
//                 areaColor: '#323c48',
//                 borderColor: '#111'
//             },
//             emphasis: {
//                 areaColor: '#2a333d'
//             }
//         }
//     },
    
//     series: [{
//         name: '弱',
//         type: 'scatter',
//         coordinateSystem: 'geo',
//         symbolSize: 1,
//         large: true,
//         itemStyle: {
//             normal: {
//                 shadowBlur: 2,
//                 shadowColor: 'rgba(37, 140, 249, 0.8)',
//                 color: 'rgba(37, 140, 249, 0.8)'
//             }
//         },
//         data: ddd
//     }, {
//         name: '中',
//         type: 'scatter',
//         coordinateSystem: 'geo',
//         symbolSize: 1,
//         large: true,
//         itemStyle: {
//             normal: {
//                 shadowBlur: 2,
//                 shadowColor: 'rgba(14, 241, 242, 0.8)',
//                 color: 'rgba(14, 241, 242, 0.8)'
//             }
//         },
//         data: ddd
//     }, {
//         name: '强',
//         type: 'scatter',
//         coordinateSystem: 'geo',
//         symbolSize: 1,
//         large: true,
//         itemStyle: {
//             normal: {
//                 shadowBlur: 2,
//                 shadowColor: 'rgba(255, 255, 255, 0.8)',
//                 color: 'rgba(255, 255, 255, 0.8)'
//             }
//         },
//         data: ddd
//     }]
// });
