import echarts from 'echarts/src/echarts';
import 'echarts/src/chart/pie';
import 'echarts/src/chart/bar';
import 'echarts/src/chart/map';
import ecConfig from 'echarts/src/config';
import {geojson} from '../../vandor/geojson/geojson';                                                                                             

import 'swiper/dist/js/swiper.jquery.js';
import 'swiper/src/less/swiper.less';
import '../../vandor/flexible.js';
import '../../vandor/jquery.MyDigitClock.js';
import '../../vandor/animateBackground-plugin.js';

import {getArrayItems,setNumberSeparator,mt_rand,date,strtotime,delcommafy,commafy,_flipObject} from '../../common/index';
import {codeToName,nameToCode,offsetMapData,__tw,tw} from '../../common/nn';
import {Lonlat} from '../../common/lonlat';

let mapGeoData = require('echarts/src/util/mapData/params');
let world_geo_json = require('./world_geo.json');

import _flatten from 'lodash/flatten';
import _chunk from 'lodash/chunk';
import _fromPairs from 'lodash/fromPairs'; //

import temp from './index.html';
import './style.css';
import CONFIG from 'config';
import API from 'api';



//init 
$('body').html(temp);


//base 
const px2rem = lib.flexible.rem;
let indexTimeTicket;
let API_HOST = CONFIG.base.API_HOST;
let t = '&_t=1465870766000&_t1=00f4dab846761ef48f99f763d004225c';
let starttime = localStorage.START_TIME;
let m = CONFIG.total.impressCardinalNumber;

var mapData =null;
mapData = JSON.parse(localStorage.LOCAL_DATA).common.geoDailyForPopup;//国家弹框展示数据
let geoForMapData = JSON.parse(localStorage.LOCAL_DATA).common.geoForMap;//呼吸灯坐标数据

// pieChart
let pieChartDOM = echarts.init(document.querySelector('.adv_content'));
let barChartDOM = echarts.init(document.querySelector('#impressionDiv'));
let mapChartDOM = echarts.init(document.getElementById('main'));
let mapChartPopupDOM = echarts.init(document.getElementById('svg-area'));

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



getGeoJson(world_geo_json,(pos)=>{
    geoMapData=pos;
    mapGeoData.params.world2 = {getGeoJson: (callback)=>callback(offsetMap(pos,360,0,offsetMapData))}
    render();  
    // console.log(geoMapData.features)
});


$('#main-popup').on('click',function(e){
    e.stopPropagation();
    $(this).hide();
})


mapChartDOM.on(ecConfig.EVENT.CLICK, eConsole);



//时钟区域
const clockCon = Object.assign({},CONFIG.clock);
clockCon.fontSize = clockCon.fontSize*px2rem;
$("#clockid").MyDigitClock(clockCon);

const dateStr = new Date().toDateString();
const yearStr = dateStr.slice(dateStr.length-4).split('').join(' ');
const mouthStr = dateStr.slice(4,dateStr.length-5).toUpperCase();
$('.mouth').html(mouthStr);
$('.year').html(yearStr);


//滚动新闻
$.fn.textScroll= textScroll;

let newsData = require('../../data/newData.json');
// console.log(newsData)

let newspan;

let timer = {};


init();







//切换屏幕
window.onload = function() {
  var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    });

}





/*******************
*******************/
function worldMapPointRender(){  
    option = getWorldMapOption(geoForMapData,starttime,__lonlat);
    mapChartDOM.setOption(option,true);
}


function newsAreaRender(){
    getGeoJson('../../screen/log/news.json',(pos)=>{
        // console.log(pos)
       newspan = pos.news.map((i)=>{return '<span>'+i.title+'</span>'})
       // console.log(newspan)
       $('.newsTitleList').css({"width":pos.news.length*100+"%"});
       $('.newsTitleList .newswarp').html(newspan.join(''));
       $('.rollingNewsArea .content').textScroll(CONFIG.rollNews.speed);
    });
}


//app气泡层 渲染
function worldMapApplicationRender(){ 
    let data = chunkDataArray.map(e=>{
        // console.log(e)
        return getArrayItems(e,N/chunkDataArray.length)
    })

    data = _flatten(data).map(e=>{
        let aa = getArrayItems(e.geoCoord,1)[0];
        // console.log(aa)
        let appIcon = getArrayItems(mapData[e.name.toLowerCase()].appTopFive,1)[0];
        return  {
            name:e.name,
            icon:appIcon.icon,
            geoCoord:Object.values(aa)
        }
    })
    mapChartDOM.addMarkPoint(seriesItems.length+1,{data});  
    data = data.map(e=>{
        return {
            name:e.name,
            icon:e.icon,
            symbol:'image://'+e.icon,
            symbolSize:10,
            geoCoord:e.geoCoord
        }

    })
    mapChartDOM.addMarkPoint(seriesItems.length+2,{data});
    setTimeout(function(){
        data.map(e=>{
            // console.log(e.name);
            mapChartDOM.delMarkPoint(seriesItems.length+1,e.name)
            mapChartDOM.delMarkPoint(seriesItems.length+2,e.name)
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

    // console.log(a.length,a,geoMapData.features.length,Object.keys(nameToCode).length,Object.keys(__tw).length)


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
    // console.log(option)
    return option
}


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
    mapChartPopupDOM.setOption(option);                 
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




    

function getBarChartOption(data,currnt){ 
    let option = {};  
    let axisLineStyle = {color:'#01dbff',width:.01*px2rem};
    let axisLine = {lineStyle:axisLineStyle};
    let textStyle = {color:'#01dbff',fontSize:0.12*px2rem,fontFamily:'myFirstFont'};

    option.tooltip = { //鼠标提示
        trigger: 'axis',
        formatter: params=>codeToName[params[0].name]+': </br> '+commafy(params[0].value),
        axisPointer : {type:'shadow'},
        textStyle:textStyle,
    };
    option.color = ['rgba(1, 219, 255, 1)','rgba(1, 219, 255, 1)'];  
    option.grid = {x:0,y:20,x2:0,y2:20,borderWidth:0};
    option.xAxis =[{
        type : 'category',
        show:true,
        axisLine:axisLine,          
        nameLocation:'end',
        axisTick:{show:false},
        axisLabel:{
            interval:'0',
            margin:2,
            textStyle:textStyle,
            formatter: params=>params
        },
        splitLine: {show:false},
        splitArea:{show:false},
        data: getGeoTop5(data,'c').map(e=>__tw[e]),        
    }];
    option.yAxis = [{
        type: 'value',
        show:false,
        nameLocation:'end',
        position:'left',
        axisLine:axisLine,           
        minInterval:1,
        axisTick:{show:false},
        axisLabel:{show:false},
        splitLine:{show:false},
        splitArea:{show:false},
        scale: false,
    }];   
    option.series=[{           
        type:'bar',
        barCategoryGap: '45%',
        data:currnt.map(i=>{return {
            value:i,
            symbolSize : 15,
            itemStyle : { normal: {label : {
                show: true,
                position:'top',
                textStyle : Object.assign({},textStyle,{}),
                formatter: params=>setNumberSeparator(params.value,1000000),
            }}}
        }}),
    }]
    return option;       
};

let indexTimer;

/******
*****************/
function init(){
    getInitData();
    // setInterval(everyHalfRequestData,60000);
    // refreshRateFn(timer.e,everyHalfRequestData,60000);
    refreshRateFn(indexTimer,getInitData,2000000);
}


function render(data){
    refreshRateFn(timer.a,totalAreaRender,  CONFIG.total.rate,data);
    refreshRateFn(timer.b,pieChartRender,  CONFIG.pieChart.rate,data);
    refreshRateFn(timer.c,barChartRender,CONFIG.barChart.rate,data);
    refreshRateFn(timer.d,newsAreaRender,10000);
    barChartIconRender(data);
    pieChartIconRender(data);

    worldMapPointRender();
    // worldMapApplicationRender()
    refreshRateFn(timer.d,worldMapApplicationRender,T);
    //data, CONFIG.worldMap.rate);  
    // impressionTop5.render(data);     
    // 
    console.log(timer,9) 
}


//初始化数据
function getInitData(){
    API.getIndexData().then((data)=>{
          console.log(data,Object.keys(data.common.geoForMap))
          let a = Object.keys(data.common.geoForMap).filter(e=>{
                return !__tw[e.toUpperCase()];
          })
          // a.map(e=>{console.log(e,data.common.geoForMap[e])})

          // console.log(a.length,a)

          localStorage.START_TIME = startTimeStamp();
          localStorage.LOCAL_DATA = JSON.stringify(data);
          localStorage.PX2REM = px2rem;
          $('#worldMapIframe').attr('src','worldMap.html');
          render(data.common);
          console.log('AJAX:-------成功'+ new Date(),window.setInterval)
        }).catch((e)=>{
          console.log("Oops, error");
    });
}


//开始时间入库
function startTimeStamp(){
    let y,m,d,h,i,s,str,_i;
    y = date('Y');
    m = date('m');
    d = date('d');
    h = date('H');
    i = date('i');
    s = date('s');
    if(i<10){h=h-1;_i=40;}
    if(i<40 && i>=10){_i=10;}
    if(i>=40){_i=40;}
    str = +y+'-'+m+'-'+d+' '+h+':'+_i+':'+'00';
    let timeS = strtotime(str);
    return timeS*1000;
}


//每半小时取数据
function everyHalfRequestData(){ 
        let _s,_sc;       
        let t = date('i');
        let n = new Date().getTime();
        let nn = Number(n);
        if((t>=40&&t<41) ||(t>=10&&t<11)){
            getInitData();
        }else{
            console.log('没到时间')
        } 

        // if(t!=40 && t!=10){
        //     console.log("没到时间!")
        //     return false;
        // }else{
        //     if(nn-Number(localStorage.START_CHECK)<60000) {
        //         console.log('hi 刚取完!',localStorage.START_CHECK,n-Number(localStorage.START_CHECK));
        //         return false;                    
        //     }
        //     if(!localStorage.START_CHECK || nn-Number(localStorage.START_CHECK)>60000 ){  
        //         // console.log(localStorage.START_CHECK) 
        //         localStorage.removeItem("START_CHECK");
        //         localStorage.START_CHECK = n;  
        //         getInitData();
        //         // clearInterval(indexTimeTicket);//获取数据成功，清除计时器
        //         console.log('嗯，成功取回数据!!!',localStorage.START_CHECK,nn,nn-Number(localStorage.START_CHECK));                 
        //     }        
        // }
};


//文本滚动
function textScroll(speed){
    var flag=null,tt,that=$(this),child=that.children();
    var p_w=that.width(), w=child.width();
    child.css({left:p_w});
    var t=(w+p_w)/speed * 1000;
    function play(m){
        var tm= m==undefined ? t : m;
        child.animate({left:-w},tm,"linear",function(){             
            $(this).css("left",p_w);
            play();
        });                 
    }
    child.on({
        mouseenter:function(){
            var l=$(this).position().left;
            $(this).stop();
            tt=(-(-w-l)/speed)*1000;
        },
        mouseleave:function(){
            play(tt);
            tt=undefined;
        }
    });
    play();
}


function setNumber(dom, number){
    var n = String(number),len = n.length;
    if(dom.find("i").length > len){
        dom.find("i:gt(" + (len - 1) + ")").remove();
    }
    dom.find("b").remove();
    for(var i=0;i<len;++i){
        if(dom.find("i").length < len){
            dom.append("<i></i>");
        }               
        var obj = dom.find("i").eq(i);
        // let space = 0.1*px2rem;       
        var y = -30 * parseInt(n.charAt(i), 10);
        y = y/100*px2rem;
        if(i < len - 1 && (len - i - 1) % 3 == 0)
            $("<b></b>").insertAfter(obj);
        obj.animate({ backgroundPositionY:y+"px" }, 350);
    }
    // console.log(dom,y,number);
}

function totalAreaRender(data){    
    let deviceCov = Number(data.clickDailyHalf.device.start);
    let inc_s = Number(data.clickDailyHalf.device.inc);
    let start = data.clickDailyHalf.start;
    let increase = data.clickDailyHalf.increase;
    let s = (new Date().getTime() - starttime)/1000;
    let currentData = Math.floor((increase/1800) * s + start); 
    let coverageCurrentData = Math.floor((inc_s * s) + deviceCov + mt_rand(-7,7)); 
    setNumber($("#val1"),  currentData);
    setNumber($("#val2"),  currentData*CONFIG.total.impressCardinalNumber);
    setNumber($("#val3"),  coverageCurrentData);
}

function getPieChartOption(currentArray,relativeArray){
    let pieLabelStyle = {//饼图样式
        normal : {
            label : {show : false},
            labelLine : {show : false}
        },
        emphasis : {
            label : {show : false},
            labelLine : {show : false}
        }        
    }

    let pie_radius = [0.20*px2rem,0.25*px2rem];

    let pieOptionSeries = currentArray.map((list,index)=>{      
        return {
            type : 'pie',
            center : [(index)*20+10+'%', '50%'],
            radius : pie_radius,
            x: (index)*20+'%', // for funnel
            itemStyle : pieLabelStyle,
            data : [
                {value:list},
                {value:relativeArray[index]}
            ]
        }
    })
    return {
        color:['#54DEF1','#787E8A'],
        series : pieOptionSeries
    }   
}

function pieChartIconRender(data){
    data.appTopFive.map((S,i)=>{
        $('#iconarea'+(i+1)).html('<a href="/app.html?package_name='+S.package_name+'"><img style="width:40%;min-height:100%;margin:auto;" src='+S.icon+'></a>');
    })
}

function pieChartRender(data){
    let currentArray = [],relativeArray = [];
    data.appTopFive.map((S,i)=>{ 
        var s = (new Date().getTime() - starttime)/1000;
        var current = Math.floor((S.increase*m/1800) * s + S.start*m);
        let total = S.total*m;
        let relative = total - current;
        // console.log(m,s,current,S.increase,S.start,relative,total)
        if (current>total) {
            current = total;
            relative=0;
        }
        currentArray.push(current);
        relativeArray.push(relative);
        $('#main'+(i+1)).html(setNumberSeparator(current))      
    })
    let option = getPieChartOption(currentArray,relativeArray);
    pieChartDOM.setOption(option);    
}


function getGeoTop5(data,str){ 
    let geoTopFiveData = data.geoTopFive;
    let m = CONFIG.total.impressCardinalNumber;
    var strlist=[]; 
    for (var i = 0; i < geoTopFiveData.length; i++) {
        if(str==='country') {
            let p = (geoTopFiveData[i].country).toUpperCase();
            let c3 = __tw[p] || false;
            // console.log(c3,p,3,geoTopFiveData[i].country)
            strlist.push(codeToName[c3]);                   
        }
        if (str==='c') {
            let c = (geoTopFiveData[i].country).toUpperCase();
            strlist.push(c);
        }
        if(str==='start') strlist.push(geoTopFiveData[i].start*m);
        if(str ==='increase') strlist.push(geoTopFiveData[i].increase*m);
        if(str==='total') strlist.push(geoTopFiveData[i].start + geoTopFiveData.increase*m)
    }
    return strlist;
};        


function barChartRender(data){
    let start =  getGeoTop5(data,'start');
    let increase = getGeoTop5(data,'increase');
    let starttime = localStorage.START_TIME
    var s = (new Date().getTime() - starttime)/1000;
    var optionData = [],_s=[];
    for (var i = 0; i < start.length; i++) {
        optionData.push((Math.floor((increase[i]/1800) * s + start[i])));
        _s.push(increase[i]/1800);
    }
    let option = getBarChartOption(data,optionData)
    barChartDOM.setOption(option);
}


function barChartIconRender(data){
    let country = getGeoTop5(data,'country');    
    let str='';
    let imgurl = country.map(list=>'../../images/'+list.replace(/ /g,'%20')+'.png').map(
            url=>str += '<li><img height="100%" src="'+url+'"/></li>'
        )
   $('.impressionImgArea').html(str)    
}


//重绘
function refreshRateFn(timer,fn,rate,data){
    // timer&&clearInterval(timer);//清除计时器
    data?fn(data):fn();
    timer = setInterval(()=>{data?fn(data):fn();}, rate)
    console.log(timer,'001')
} 

function getGeoJson (str,callback) {$.getJSON(str, callback);}
//获取当前时间增量
function getIncrementalTime(){return (new Date().getTime() - starttime)/1000}


