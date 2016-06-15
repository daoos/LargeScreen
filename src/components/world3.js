
// require("../map_echarts/echarts-2.2.7/build/dist/echarts-all.js");
import template from './worldMap.html';
require('./worldMap.css');






$('body').html(template);



// var myChart = echarts.init(document.getElementById('mapdiv'));
// myChart.setOption(option, true);


// //标签式引入环境中，常用模块的引用可通过命名空间直取，同模块化下的路径结构，如：
// //echarts.config = require('echarts/config')， zrender.tool.color = require('zrender/tool/color')
// myChart.on(echarts.config.EVENT.MAP_SELECTED, function (param){
//     for (var p in param.selected) {
//         if (param.selected[p]) {
//             alert(p);
//         }
//     }
// });





// require.config({
//             paths: {
//                 echarts: __dirname + '/node_modules/echarts/build/dist'
//             }
//         });

//         require(
//             [
//                 'echarts',
//                 'echarts/chart/map'
//             ],
//             function (ec) {
//                 myChart = ec.init(document.getElementById('main'));
//                 myChart.setOption(option); 
//             }
//         );