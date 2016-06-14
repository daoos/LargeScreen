import echarts from 'echarts';
import template from './worldMap.html';
import '../../node_modules/echarts/map/js/World.js';

export default class WorldMap2 {
    render() {
        $('body').html(template);
        const chart = echarts.init(document.querySelector('#mapdiv'));
        chart.setOption({
            series: [{
                type: 'map',
                map: 'china'
            }]
        });

        console.log('@')
    
    }

}