import './css/normalize.css';
import './css/common.css';
import './css/style.css';
import '../../vandor/flexible.js';
import './js/lib/slick.min.js';
import tmpl from './layout.html';

import CONFIG from 'config';
import API from 'api';
console.log(API.getAppInfoData)

let appDataJson = require('../../data/appData.json');
let appInfoData = require('../../data/appInfoData.json');
console.log(appInfoData)

$('body').html(tmpl);

let API_HOST = CONFIG.base.API_HOST;
var localPath = !API_HOST ? appDataJson : '';
loadData();

/**
 * 加载数据
 */
function loadData() {
    var pkgName = getParam(window.location.href, 'package_name') || 'com.gameloft.android.ANMP.GloftNAHM'; 
    let data1;
    API.getAppInfoData(pkgName).then((res)=>{
       return res.json();
    }).then((res)=>{
        data1 = res.data;
        console.log(data1)
        API.getAppInfoDataMore(pkgName).then((res)=>{
            return res.json();
        }).then(res=>{
            console.log(5,res,data1)
            fillCont(data1,res);
            fillSliderCont(res,data1);  
        }).catch(res=>{
            console.log(3,res)
            fillCont(data1,res);
            fillSliderCont(res,data1);  

        })   
    }).catch((res)=>{
        console.log(4,res)
    })


    /**
     * 根据 URL 参数名获取参数值
     * @param  {String} url   指定的 URL
     * @param  {String} name URL参数名
     * @return {String}      返回获取到的参数值
     */
    function getParam(url, name) {
        var key = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        var regExp = new RegExp('[\\?&#]' + key + '=([^&#]*)');
        var results = regExp.exec(url);
        return null == results ? undefined : results[1];
    }
}


/**
 * 填充内容
 * @param  {Object} data 数据对象
 */
function fillCont(data1,data2) {    
    // 图标
    var logoElm = document.getElementById('Jlogo');
    // 名称
    var nameElm = document.getElementById('Jname');
    // 发行商 = > appType
    // var pubElm = document.getElementById('Jpub');
    // 类型
    var typeElm = document.getElementById('Jtype');
    // 评分 => 内容评级
    var scoreElm = document.getElementById('Jscore');
    // 星级
    var starElm = document.getElementById('Jstar');
    // 简介
    var txtElm = document.getElementById('Jtxt');
    
    logoElm.src = data1.offerIcon||data2.icon;

    
    (data1.offerName||data2.appName) && (nameElm.innerHTML = data1.offerName||data2.appName);
    (data1.offerTypes|| data2.appCategory) && (typeElm.innerHTML = data1.offerTypes|| data2.appCategory.join(','));
    if(data1.offerStars){
        (scoreElm.innerHTML = data1.offerStars);
        var pct = (data1.offerStars||data2.starRating) / 5 * 100;
        !isNaN(pct) && (starElm.style.width = pct + '%');
    }else{
        $('.ico-star').hide();
    }
    (data1.offerDescription||data2.fullDesc) && (txtElm.innerHTML = data1.offerDescription||data2.fullDesc);
    
}

/**
* 格式化数字
* @param  {Number} num 数字
* @return {String}     格式化后的字符串
*/
function format(num) {
var num = num || '';
var tmpStr = num + '';
var len = tmpStr.length;
var str = '';
for (var i = len - 1; i >= 0; i--) {
    str = tmpStr[i] + (0 == (len - i - 1) % 3 && i != len - 1 ? ',' : '') + str;
}
return str;
}

/**
 * 创建滑块内容
 * @param  {Object} res 图片数组
 */
function fillSliderCont(res,res2) {  
    if(!res){return}
    // 评分人数
    var plElm = document.getElementById('Jpl');
    // 下载量 ＝》null
    var dlElm = document.getElementById('Jdl');
    if(res.ratingsCount){
        console.log(res.ratingsCount)
        plElm.innerHTML = format(res.ratingsCount) + ' total'
    }else{
        $('#ico-down').hide()
    }
    dlElm && res.ratingsCount && (dlElm.innerHTML = res.numDownloads);

    let gpImages = (res.gpImages&&res.gpImages.length>0)?res.gpImages:[];
    if(res.headJpg){
        gpImages.push(res.headJpg); 
    }
    if(!res.gpImages){gpImages.push(res2.offerIcon)}
    

    var html = '';
    var TMPL = '<div><img src="{url}" alt=""></div>';

    var wrapElm = document.getElementById('Jslider');
    for (var i = 0; i < gpImages.length; i++) {
        html += TMPL.replace('{url}', gpImages[i]);
    }
    wrapElm.innerHTML = html;

    $('#Jslider').slick({
        lazyLoad: 'ondemand',
        draggable: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnFocus: false,
        pauseOnHover: false,
        cssEase: 'linear'
    });
}