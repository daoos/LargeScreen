var __lonlat = new Lonlat();
var __jw = __lonlat.getLonLat('CN', 1000);
var placeList = [];

$.each(__jw, function(index, value) {
    placeList.push({
        name: '',
        geoCoord: [value.lon, value.lat]
    });
});


var _color = '#091d36';
var option = {
    backgroundColor: _color,
    color: [
        'rgba(255, 255, 255, 0.8)',
        'rgba(14, 241, 242, 0.8)',
        'rgba(37, 140, 249, 0.8)'
    ],
    legend: {
        show: false,
        orient: 'vertical',
        x: 'left',
        data: ['强', '中', '弱'],
        textStyle: {
            color: '#fff'
        }
    },
    roamController: {
        show: true,
        x: 'left',
        mapTypeControl: {
            'world': true
        }
    },
    series: [

        {
            name: '强',
            type: 'map',
            mapType: 'world',
            hoverable: false,
            roam: true,
            //地图数值计算结果小数精度，mapValueCalculation为average时有效，默认为取整，需要小数精度时设置大于0的整数
            //mapValuePrecision:0,
            selectedMode: 'single',
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    }
                },
                emphasis: {
                    label: {
                        show: false
                    },
                    // 选中地图后的颜色
                    color: '#ccc'
                }
            },
            data: [],
            markPoint: {
                symbol: 'circle',
                clickable: false,
                symbolSize: 1,
                large: true,
                effect: {
                    show: true,
                    period: 5,
                    scaleSize: 1
                },
                data: (function() {
                    var data = [];
                    var len = placeList.length;
                    while (len--) {
                        data.push({
                            name: placeList[len].name,
                            value: 1,
                            geoCoord: placeList[len].geoCoord
                        })
                    }
                    return data;
                })()
            }
        }
    ]
};


// 用来弹出窗口的配置用的
var _option = {
    series: [{
        name: '',
        type: 'map',
        mapType: 'china',
        selectedMode: 'single',
        itemStyle: {
            normal: {
                label: {
                    show: true
                }
            },
            emphasis: {
                label: {
                    show: true
                }
            }
        },
        data: []
    }]
};