import template from './worldMap.html';
import './worldMap.css';
import '../../node_modules/ammaps/dist/ammap/ammap.js';
import '../../node_modules/ammaps/dist/ammap/maps/js/worldLow.js';
import '../../node_modules/ammaps/dist/ammap/themes/dark.js';
import '../../vandor/geojson.js';
// import '../../vandor/lonlat.js';


export default class WorldMap {

    render(node) {
        $(node).html(template);

          
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

        function generateChartDataByGeoJson() {
		  var data = new Array();
		  var lonlat = new Lonlat();
		  var res = lonlat.getLonLat('CN', 1000);
		  console.log(res);
		  $.each(res, function(index, value) {
		      data[index] = {};
		      data[index].latitude = value.lat;
		      data[index].longitude = value.lon;
		  });
		  return data;
		};

		var map = AmCharts.makeChart("mapdiv", {
		  type: "map",
		  addClassNames:true,
		  dataProvider: {
		    map: "worldLow",
		    zoomLevel: 0.5,
		    zoomLongitude: 100,
		    zoomLatitude: 52,
		    getAreasFromMap: true,
		    images: generateChartData(1000),//模拟数据量3000，模拟更多修改传入参数；
		  },
		  areasSettings: {
		    autoZoom: true,
		    selectable: true,
		    balloonText: "[[title]] joined EU at [[customData]]",
		    alpha: 1,
		    color: "red",
		    colorSolid: "yellow",
		    unlistedAreasAlpha: 0.4,
		    unlistedAreasColor: "#1B344A",
		    outlineColor: "#00EDFF",
		    outlineAlpha: 1,
		    outlineThickness: 1,
		    rollOverColor: "#4d90d6",
		    rollOverOutlineColor: "#FFF",
		    selectedOutlineColor: "#FFF",
		    selectedColor: "#e384a6",
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

		  // zoomControl: { // 控制条
		  //   zoomControlEnabled: true, //开启控制条
		  //   buttonRollOverColor: "red",
		  //   buttonFillColor: "yellow",
		  //   buttonFillAlpha: 0.8,
		  //   // buttonBorderColor: "#FFFFFF",
		  //   gridBackgroundColor: "#FFFFFF",
		  //   gridAlpha: 0.8
		  // },
		  showImagesInList: true,
		});



		// add events to recalculate map position when the map is moved or zoomed
		map.addListener("positionChanged", updateCustomMarkers);

		// this function will take current images on the map and create HTML elements for them
		function updateCustomMarkers(event) {
		  // get map object
		  var map = event.chart;

		  //console.log(event, map, map.coordinatesToStageXY)
		    // go through all of the images
		  for (var x in map.dataProvider.images) {
		    // get MapImage object
		    var image = map.dataProvider.images[x];
		   // console.log(image, x)

		    // check if it has corresponding HTML element
		    if ('undefined' == typeof image.externalElement)
		      image.externalElement = createCustomMarker(image);

		    // reposition the element accoridng to coordinates
		    var xy = map.coordinatesToStageXY(image.longitude, image.latitude);
		    image.externalElement.style.top = xy.y + 'px';
		    image.externalElement.style.left = xy.x + 'px';
		  }
		}

		// this function creates and returns a new marker element
		function createCustomMarker(image) {
		  // create holder
		  var holder = document.createElement('div');
		  holder.className = 'map-marker';
		  holder.title = image.title;
		  holder.style.position = 'absolute';

		  // maybe add a link to it?
		  if (undefined != image.url) {
		    holder.onclick = function() {
		      window.location.href = image.url;
		    };
		    holder.className += ' map-clickable';
		  }

		  // create dot
		  var dot = document.createElement('div');
		  dot.className = 'dot';
		  holder.appendChild(dot);

		  // create pulse
		  var pulse = document.createElement('div');
		  pulse.className = 'pulse';
		  holder.appendChild(pulse);

		  // append the marker to the map container
		  image.chart.chartDiv.appendChild(holder);

		  return holder;
		}


    }
}