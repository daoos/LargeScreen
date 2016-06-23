import {date,strtotime} from './modules/common.js';

require('./components/world3.js');
require('./components/Time');
var Total = require('./components/Total').default;
var AdvertiserTop5 = require('./components/AdvertiserTop5').default;
var ImpressionTop5 = require('./components/ImpressionTop5').default;
import '../vandor/flexible.js';

var total = new Total(); total.init(); 
var advertiserTop5 = new AdvertiserTop5(); advertiserTop5.init();
var impressionTop5 = new ImpressionTop5(); impressionTop5.init();


var _t = '&_t=1465870766000&_t1=00f4dab846761ef48f99f763d004225c';

var options = {
    // url:'http://3s.mobvista.com/screen.php?m=index&a=index'+ _t,
    url:'../json2.json',
    jsonp:'jsonpReturn',
    data:{},
}

function getJson(options,callback){
    console.log('ajax...');
    $.ajax({
        type: "get",
        url:options.url,
        dataType: "jsonp",
        jsonp: options.jsonp,
        data: options.data,
        jsonpCallback: options.jsonp,
        success: function (data) {                
                setStore(data);                          
                render(data.common);
                $('#worldMapIframe').attr('src','./map_echarts_2/map15.html');
                localStorage.PX2REM = lib.flexible.rem;

                console.log('AJAX:-------成功'+ new Date())

        }
    });
}


function setStore(data){
    localStorage.START_TIME && localStorage.removeItem("START_TIME");
    localStorage.LOCAL_DATA && localStorage.removeItem("LOCAL_DATA");
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
     console.log("SETSTARTTIME:-----"+timeS,str,4,i,_i,h);
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
    localStorage.START_TIME = startTimeStamp();
    render(JSON.parse(localStorage.LOCAL_DATA).common);
    $('#worldMapIframe').attr('src','./map_echarts_2/map15.html');
    localStorage.PX2REM = lib.flexible.rem;

}


clearInterval(timeTicket);

let everyHalfRequestData = function(){ 
        let _s,_sc;       
        let timeNum = date('i');
        let nowtime = new Date().getTime();

        if(timeNum!==40 && timeNum!==10){
            console.log("no update")
            return false;
        }else{
            // if(localStorage.START_CHECK) {
            //     _sc = nowtime-Number(localStorage.START_CHECK);
            // }
            //  // console.log("HALFCHECK:-----"+c,nowtime,starttime);
            // if ((_sc>60000) || !localStorage.START_CHECK){
            //         getJson(options);
            //         localStorage.START_CHECK = nowtime;
            // }

            getJson(options);

        }

};

everyHalfRequestData();
let timeTicket = setInterval(everyHalfRequestData,60000);
