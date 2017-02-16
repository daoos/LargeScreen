import echarts from 'echarts/src/echarts';
import '../../vandor/flexible.js';
import temp from './index.html';
import './style.css';
import 'echarts/src/chart/map';
import ecConfig from 'echarts/src/config';
import {geojson} from '../../vandor/geojson/geojson';                                                                                             
import {Lonlat} from '../../common/lonlat';
import {commafy,_flipObject,getArrayItems} from '../../common/index';
import {nameToCode,codeToName,offsetMapData,__tw,tw} from '../../common/nn';
let mapGeoData = require('echarts/src/util/mapData/params');
let world_geo_json = require('./world_geo.json');
import CONFIG from 'config';
import _flatten from 'lodash/flatten';
import _chunk from 'lodash/chunk';
import _fromPairs from 'lodash/fromPairs'; //

// import API from 'api';
// 
// 
// console.log(geojson,tw)

$('body').append(temp);

const px2rem = lib.flexible.rem;// 当前页面的rem基准值
var mapData =null;
mapData = JSON.parse(localStorage.LOCAL_DATA).common.geoDailyForPopup;//国家弹框展示数据
let geoForMapData = JSON.parse(localStorage.LOCAL_DATA).common.geoForMap;//呼吸灯坐标数据
let starttime = localStorage.START_TIME;
let m = CONFIG.total.impressCardinalNumber;
let myChart = echarts.init(document.getElementById('main'));
let myChartForPopup = echarts.init(document.getElementById('svg-area'));
let markPointData = offsetMap(geojson,360,0,offsetMapData);
let __lonlat = new Lonlat(markPointData);
let mun = CONFIG.worldMap.mun;//单个亮点代表点击数
let seriesItems = CONFIG.worldMap.pointColor;

let totalData,seriesDataArray,sortTotalData,chunkDataArray;

let N=CONFIG.worldMap.app.N,//随机n个国家
    S=CONFIG.worldMap.app.S,//停留s秒
    T=CONFIG.worldMap.app.T,// 间隔T秒
    companyDataItems=CONFIG.worldMap.company;//公司驻地配置

let option;
let geoMapData;//地图地理数据

let appTopFive = CONFIG.base.API_HOST==='3s.maosheng.com'?appTopFive:appTopFive; //20 vs  5
//////
getGeoJson(world_geo_json,(pos)=>{
    geoMapData=pos;
	mapGeoData.params.world2 = {getGeoJson: (callback)=>callback(offsetMap(pos,360,0,offsetMapData))}
	render();  
    console.log(geoMapData.features)
});


$('#main-popup').on('click',function(e){
    e.stopPropagation();
    $(this).hide();
})


myChart.on(ecConfig.EVENT.CLICK, eConsole);



/*******************
*******************/
function worldMapPointRender(){  
    option = getWorldMapOption(geoForMapData,starttime,__lonlat);
    myChart.setOption(option,true);
}

// function worldMap

function render(data){
	worldMapPointRender();
    refreshRateFn(worldMapApplicationRender, T);
    //data, CONFIG.worldMap.rate);  
}

function getIncrementalTime(){//获取当前增量时间
    return (new Date().getTime() - starttime)/1000
}


//app气泡层 渲染
function worldMapApplicationRender(){ 
    let data = chunkDataArray.map(e=>{
        console.log(e)
        return getArrayItems(e,N/chunkDataArray.length)
    })

    data = _flatten(data).map(e=>{
        let aa = getArrayItems(e.geoCoord,1)[0];
        console.log(aa)
        let appIcon = getArrayItems(mapData[e.name.toLowerCase()].appTopFive,1)[0];
        return  {
            name:e.name,
            icon:appIcon.icon,
            geoCoord:Object.values(aa)
        }
    })
    myChart.addMarkPoint(seriesItems.length+1,{data});  
    data = data.map(e=>{
        return {
            name:e.name,
            icon:e.icon,
            symbol:'image://'+e.icon,
            symbolSize:10,
            geoCoord:e.geoCoord
        }

    })
    myChart.addMarkPoint(seriesItems.length+2,{data});
    setTimeout(function(){
        data.map(e=>{
            console.log(e.name);
            myChart.delMarkPoint(seriesItems.length+1,e.name)
            myChart.delMarkPoint(seriesItems.length+2,e.name)
        })
    },S)
}


//获取地图标注option数据
function getWorldMapOption(geoForMapData,starttime,__lonlat){
    let rangeData = [];
    let option = {}; 
    totalData = Object.entries(geoForMapData).map((e)=>{
        let currntData =  Math.floor((e[1].increase/1800 * getIncrementalTime() + e[1].start)/mun);
        let data =  {
            name:e[0].toUpperCase(),
            geoCoord:__lonlat.getLonLat(e[0].toUpperCase(),currntData),
            total:e[1].increase+e[1].start
        }    
        rangeData.push(data);
        return data;
    }).sort((a,b)=>b.total-a.total)

    //国家地图数据
    let a = geoMapData.features.filter(e=>{
        return !nameToCode[e.properties.name]
    }).map(e=>{return {e}})

    console.log(a.length,a,geoMapData.features.length,Object.keys(nameToCode).length,Object.keys(__tw).length)


    //降序排列
    sortTotalData = totalData.filter(e=>e.geoCoord.length>0);

    //根据描点color分组
    chunkDataArray = _chunk(sortTotalData,sortTotalData.length/seriesItems.length);


    // 呼吸灯标注点数据
    seriesDataArray = chunkDataArray.map(
        a=>a.map(
            a=>a.geoCoord
        )
    ).map(
        a=>_flatten(a)
    ).map(
        a=>a.map(
            a=>{return {geoCoord:Object.values(a)}}
        )
    )

    // console.log(sortTotalData,chunkDataArray,seriesDataArray)
    
    //国家背景颜色数据   
    rangeData = _flatten(totalData).map(e=>{
        let code = __tw[e.name];
        // console.log(code,codeToName[code])
        return {
            name:codeToName[code],
            value:e.geoCoord.length
        }
    })


    // console.log(totalData,_flatten(totalData),rangeData)

    let rangeNum = totalData[0].geoCoord.length/CONFIG.worldMap.areaColor.length;

    
    option.dataRange = {
        show:CONFIG.worldMap.dataRange,
        // show:false,
        // min:0,
        // max:totalData[0].geoCoord.length,
        // orient:'horizontal',
        x: 'right',
        y: 'bottom',
        // splitNumber:5,//默认5等分
        splitList:[
            {start:totalData[0].geoCoord.length},
            {start:totalData[1].geoCoord.length,end:totalData[0].geoCoord.length-1},
            {start:totalData[2].geoCoord.length,end:totalData[1].geoCoord.length-1},
            {start:1,end:totalData[3].geoCoord.length},
            {end:0}
        ],
        color: CONFIG.worldMap.areaColor
    };

    
    // 呼吸灯分层 配置
    option.series= seriesItems.map((_color,i)=>{
        return {
            name: 'seriesItems'+i,
            type: 'map',
            mapType: 'world2',
            scaleLimit:{max:4, min:0.9},
            roam:'scale',//'false', //scale 滚轮缩放,//
            mapLocation:{'x':'center','y':'center','width':'80%','height':'100%'},
            // mapLocation:{'x':'center','y':'center','width':6.75*px2rem,'height':3.25*px2rem},
            data:rangeData,
            // selectedMode:'single',
            dataRangeHoverLink:false,
            itemStyle:{
                normal:{
                    show:true,
                    color:'rgba(1,219,255,0)',
                    borderColor:'rgba(1,219,255,1)',
                    borderWidth:1,
                },
                emphasis:{show:true,color:'rgba(1,219,255,0.2)'},
            },
            markPoint: {
                symbol: 'circle',
                clickable: false,
                symbolSize: 2,
                large: true,
                effect: {
                    type:'bounce',
                    loop:false,
                    show: true,
                    shadowBlur : 0,
                    period: 10,
                    scaleSize: 1
                },
                itemStyle:{normal:{color:_color}},
                data: seriesDataArray[i]               
            },
        }
    }) 
    
    // 办公地点 样式配置
    let companyPointStyle = {
        symbolSize :3,
        itemStyle:{
            normal:{
                color:'rgba(1,119,255,1)',
                label:{
                    show:true,
                    position:'right',
                    formatter: params=>params.name,
                    textStyle : {
                        color:'#fff',
                        fontSize : '8',
                        fontWeight:'200',
                        // fontFamily : 'myFirstFontBold',
                    }
                },
                borderColor:'#fff',
                borderWidth:1,
            }
        },
    }
    // 公司驻点
    let company ={
        name: 'companyStagnationPoint',
        type: 'map',
        mapType: 'world2', 
        data:[],
        markPoint : {
            large: false,
            symbol:'circle',
            symbolSize:companyPointStyle.symbolSize,
            itemStyle:companyPointStyle.itemStyle,
            data : companyDataItems
        },
    }
    //气泡背景
    let bubble = {
        name: 'bubble',
        type: 'map',
        mapType: 'world2',
        hoverable: true,
        roam: true,
        data:[],
        markPoint : {
            symbol:require('../../images/bubble.png'),
            symbolSize:15,
            effect:{
                "show": false,
                // "type": "bounce",
                "loop": false,
                "period": 10,
                },
            data : []
        },
    }
    //推荐app
    let app = {
        name: 'app',
        type: 'map',
        mapType: 'world2',
        hoverable: true,
        roam: true,
        data:[],
        markPoint : {
            data : []
        },
    }
    option.series.push(company);
    option.series.push(bubble); 
    option.series.push(app); 
    console.log(option)
    return option
}

function refreshRateFn(fn,rate){fn();setInterval(()=>{fn()}, rate)}  
function getGeoJson (str,callback) {$.getJSON(str, callback);}
function cloneData(data){return JSON.parse(JSON.stringify(data))}

function offsetMap(mapData,offsetX,offsetY,offsetCountry){
    var isAllCountry = offsetCountry? false:true;
    var offsetCountry = offsetCountry||{};
    var newMapData = cloneData(mapData);
    for(var i=0,iMax=newMapData['features'].length;i<iMax;i++){
        var feature = newMapData['features'][i];
        var polyType = feature['geometry']['type'];
        var country = feature['properties']['name'];
        for(var j=0,jMax=feature['geometry']['coordinates'].length;j<jMax;j++){
            var coordinate = feature['geometry']['coordinates'][j];
            for(var k=0,kMax=coordinate.length;k<kMax;k++){
                var kCoordinate = coordinate[k];
                if(polyType=='Polygon'&&(isAllCountry||offsetCountry[country])){
                    kCoordinate[0] = kCoordinate[0]+offsetX;
                    kCoordinate[1] = kCoordinate[1]+offsetY;
                    var x = kCoordinate[0];
                    var y = kCoordinate[1];
                }else if(polyType=='MultiPolygon'&&(isAllCountry||offsetCountry[country])){
                    for(var l=0,lMax=kCoordinate.length;l<lMax;l++){
                        var singleCoordinate = kCoordinate[l];
                        singleCoordinate[0] = singleCoordinate[0]+offsetX;
                        singleCoordinate[1] = singleCoordinate[1]+offsetY;
                        var x = singleCoordinate[0];
                        var y = singleCoordinate[1];
                   }
                }
            }
        }
    }
    return newMapData;
}

//点击国家
function eConsole(param) {
    let geoName= param.data.name;
    if(!nameToCode[geoName]){return} 
    let geoCode = nameToCode[geoName];  
    var g = _flipObject(__tw)[geoCode];
    if (!g) {return false;}              
    var gg = g.toLowerCase();
    if (!mapData[gg]) {return false} 
    renderPopUpHtml(mapData[gg],geoName);           
    $('#main-popup').show(); 
    let option = {series:[{type: 'map',mapType: 'world|'+geoName,data:[],}]};
    myChartForPopup.setOption(option);                 
}

//弹出框配置
function renderPopUpHtml(data,p){
    var _p = p.replace(/ /g,'%20');
    if (typeof data=='undefined') {return false}
    $('#main-popup .right h2').empty().html('<em style="background:url(../images/'+_p+'.png) no-repeat; background-size:cover;'+
        'width:'+0.3*px2rem+'px;height:'+0.3*px2rem+'px;display: inline-block;margin-right:'+ 0.05*px2rem+'px;vertical-align: bottom;"></em>'+ p);
    $('.capital span').empty().html(data.capital);
    $('.gdp span').empty().html(data.gdp + ' '+'Billion USD');
    $('.population span').empty().html(commafy(data.population));
    $('.impression span').empty().html(commafy(Math.floor(data.click)*m));
    $('.click span').empty().html(commafy(data.click));
    var str ='';
    var top5 = data.appTopFive;
    for (var i = top5.length - 1; i >= 0; i--) {
        str+= '<img style="width:'+0.3*px2rem+'px;height:'+.30*px2rem+'px;margin:'+.03*px2rem+'px;" src="'+top5[i].icon+'"/>';
    }
    $('.imgarea').empty().html(str);
    // console.log(3,data,p)                        
}


/****
*******************
*/




        


