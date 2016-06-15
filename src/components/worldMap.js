
// require('../../node_modules/ammaps/dist/ammap/ammap.js');
require('../../vandor/ammap.js');

require('../../node_modules/ammaps/dist/ammap/maps/js/worldLow.js');

// require('../../vandor/worldLow.js');

require('../../vandor/none.js');
require('../../node_modules/ammaps/dist/ammap/plugins/dataloader/dataloader.js');

require('../../vandor/geojson.js');
require('../../vandor/lonlat.js');

var template = require('./worldMap.html');
require('./worldMap.css');






$('body').html(template);

function generateChartData(m) {
	var data =[];
    var firstDate = new Date();		    
    for (var i = 0; i <= m; i++) {// 
			data[i] = {};
			data[i].latitude=Math.floor(Math.random()*(m/10-0+1)+0);
			data[i].longitude=Math.floor(Math.random()*(m/10-0+1)+0);
			data.push(data[i]);
		};
	return data;
};

function generateChartDataByGeoJson(m) {
  var data = new Array();
  var lonlat = new Lonlat();
  var res = lonlat.getLonLat('CN', m);
  console.log(res);
  $.each(res, function(index, value) {
      data[index] = {};
      data[index].latitude = value.lat;
      data[index].longitude = value.lon;
  });
  return data;
};



var option =  {
  type: "map",
  "theme": "none",
    "projection":"miller",
    path: "http://www.amcharts.com/lib/3/",

  addClassNames:true,
  theme:'none',
  handDrawn:false,
	panEventsEnabled:true,
	showAsSelected:true,
	backgroundZoomsToTop:true,//点击背景缩小
	creditsPosition:top,  //版权位置
  dataProvider: {
    map: "worldLow",
    zoomLevel: 0.5,
    zoomLongitude: 100,
    zoomLatitude: 52,
    area:[



    ],
    getAreasFromMap: true,
    images: generateChartData(100),//模拟数据量3000，模拟更多修改传入参数；
  },
  areasSettings: {
    autoZoom: true,
    selectable: true,
    balloonText: "[[title]] joined EU at [[customData]]",
    alpha: 1,
    color: "#10182C",
    colorSolid: "yellow",
    unlistedAreasAlpha: 0.4,
    unlistedAreasColor: "#1B344A",
    outlineColor: "#00EDFF",
    outlineAlpha: 1,
    outlineThickness: 1,
    rollOverColor: "#09182c",
    rollOverOutlineColor: "#FFF",
    selectedOutlineColor: "#FFF",
    selectedColor: "#09182c",
    unlistedAreasOutlineColor: "#00EDFF",
    unlistedAreasOutlineAlpha: 1
  },

  imagesSettings: {		    
  	rollOverScale: 2,
    selectedScale: 1,
    alpha: 0.8,
    labelFontSize: 32,
    labelColor: "#FFFFFF",
    color: "#FFFFFF",
    labelRollOverColor: "#4d90d6",
    labelPosition: "bottom"
  },

   zoomControl: { // 控制条
    zoomControlEnabled: true, //开启控制条
    buttonRollOverColor: "#7C7483",
    buttonFillColor: "#6C7483",
    buttonFillAlpha: 0.8,
    buttonBorderColor: "#FFFFFF",
    gridBackgroundColor: "#FFFFFF",
    gridAlpha: 0.8,
		gridHeight:200,
		draggerHeight:100,
		draggerAlpha:1,
		homeButtonEnabled:true,
		homeIconColor:"#FFFFFF",
		iconSize:20,
		maxZoomLevel:64,
		minZoomLevel:1,//	最小缩放级别。
		panControlEnabled:true,//指定如果启用了锅的控制。
		panStepSize:0.1,	//指定的地图容器宽度
		roundbutton:false,//指定是否按钮应该轮(矩形)
		zoomControlEnabled:true,//指定是否启用了变焦控制。
		zoomFactor:2//放大倍数
  },

  // w
  showImagesInList: true,
};
window.map = AmCharts.makeChart("mapdiv", option);

map.addListener("positionChanged", function(event) {
  var map = event.chart;
  // console.log(map,map.coordinatesToStageXY)
  for (var x in map.dataProvider.images) {
    var image = map.dataProvider.images[x];
    if ('undefined' == typeof image.externalElement)
      image.externalElement = createCustomMarker(image);
    var xy = map.coordinatesToStageXY(image.longitude, image.latitude);
    image.externalElement.style.top = xy.y + 'px';
    image.externalElement.style.left = xy.x + 'px';
  }
});


function createCustomMarker(image) {
  var holder = document.createElement('div');
  holder.className = 'map-marker';
  holder.title = image.title;
  holder.style.position = 'absolute';
  if (undefined != image.url) {
    holder.onclick = function() {
      window.location.href = image.url;
    };
    holder.className += ' map-clickable';
  }
  var dot = document.createElement('div');
  dot.className = 'dot';
  holder.appendChild(dot);
  var pulse = document.createElement('div');
  pulse.className = 'pulse';
  holder.appendChild(pulse);
  image.chart.chartDiv.appendChild(holder);
  return holder;
}
