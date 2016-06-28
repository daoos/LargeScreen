import {date,strtotime} from './modules/common.js';

require('./components/world3.js');
require('./components/Time');
var Total = require('./components/Total').default;
var AdvertiserTop5 = require('./components/AdvertiserTop5').default;
var ImpressionTop5 = require('./components/ImpressionTop5').default;
import '../vandor/flexible.js';

var total = new Total(); 
var advertiserTop5 = new AdvertiserTop5(); 
var impressionTop5 = new ImpressionTop5(); 
total.init();
advertiserTop5.init();
impressionTop5.init();

window.timer={};





var _t = '&_t=1465870766000&_t1=00f4dab846761ef48f99f763d004225c';

// console.log(1,timer,_t);
// console.log("HAL");

var options = {
    url:'http://3s.mobvista.com/screen.php?m=index&a=index'+ _t,
    // url:'../json2.json',
    jsonp:'jsonpReturn',
    data:{},
}

function getJson(options,callback){
    // console.log('ajax...');
    $.ajax({
        type: "get",
        url:options.url,
        dataType: "jsonp",
        jsonp: options.jsonp,
        data: options.data,
        jsonpCallback: options.jsonp,
        success: function (data) {  
                //(timeTicket);
                  
                setStore(data); 

                render(data.common);
                $('#worldMapIframe').attr('src','./map_echarts_2/map15.html');
                localStorage.PX2REM = lib.flexible.rem;

                


                // console.log('AJAX:-------成功'+ new Date(),window.setInterval)


        }
    });
}


function setStore(data){
    localStorage.removeItem("START_TIME");
    localStorage.removeItem("LOCAL_DATA");
    localStorage.LOCAL_DATA = JSON.stringify(data);
    localStorage.START_TIME = startTimeStamp();
}

function startTimeStamp(){
    let y,m,d,h,i,s,str,_i;
    y = date('Y');
    m = date('m');
    d = date('d');
    h = date('H');
    i = date('i');
    s = date('s');
    if(i<10){
        h=h-1;
        _i=40;
    }
    if(i<40 && i>=10){
        _i=10;
    }
    if(i>=40){
        _i=40;
    }
    str = +y+'-'+m+'-'+d+' '+h+':'+_i+':'+'00';
    let timeS = strtotime(str);
     // console.log("SETSTARTTIME:-----"+timeS,str,4,i,_i,h);
    return timeS*1000;
}


function render(data){
    total.render(data);
    advertiserTop5.render(data);
    impressionTop5.render(data);      
}

if (typeof localStorage.LOCAL_DATA == 'undefined' || typeof localStorage.START_TIME =='undefined') {
    getJson(options);
}else{
    render(JSON.parse(localStorage.LOCAL_DATA).common);
    $('#worldMapIframe').attr('src','./map_echarts_2/map15.html');
    localStorage.PX2REM = lib.flexible.rem;

}


window.onresize = function () {
    console.log('resize');
    render(JSON.parse(localStorage.LOCAL_DATA).common);
    $('#worldMapIframe').attr('src','./map_echarts_2/map15.html');
    localStorage.PX2REM = lib.flexible.rem;
}

clearInterval(timeTicket);

let everyHalfRequestData = function(){ 
        let _s,_sc;       
        let t = date('i');
        let n = new Date().getTime();
        let nn = Number(n);

        if(t!=40 && t!=10){
            // console.log("没到时间!",localStorage.START_CHECK,n-Number(localStorage.START_CHECK))
            return false;
        }else{
            if(nn-Number(localStorage.START_CHECK)<60000) {
                    // console.log('hi 刚取完!',localStorage.START_CHECK,n-Number(localStorage.START_CHECK));
                    return false;                    
            }
            if(!localStorage.START_CHECK || nn-Number(localStorage.START_CHECK)>60000 ){  

                    // console.log(localStorage.START_CHECK) 

                    localStorage.removeItem("START_CHECK");
                    localStorage.START_CHECK = n;  
                    getJson(options);
                    // console.log('嗯，成功取回数据!!!',localStorage.START_CHECK,nn,nn-Number(localStorage.START_CHECK));                 
            }        
        }
};

everyHalfRequestData();
let timeTicket = setInterval(everyHalfRequestData,10000);



function js_getDPI() {
var arrDPI = new Array;
if (window.screen.deviceXDPI) {
arrDPI[0] = window.screen.deviceXDPI;
arrDPI[1] = window.screen.deviceYDPI;
}
else {
var tmpNode = document.createElement("DIV");
tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
document.body.appendChild(tmpNode);
arrDPI[0] = parseInt(tmpNode.offsetWidth);
arrDPI[1] = parseInt(tmpNode.offsetHeight);
tmpNode.parentNode.removeChild(tmpNode); 
}
return arrDPI;
}
window.onload=function(){
console.log("当前屏幕PPI "+js_getDPI());
}

