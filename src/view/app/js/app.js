import './css/normalize.css';
import './css/common.css';
import './css/style.css';
import '../../vandor/flexible.js';
import './js/lib/slick.min.js';
import tmpl from './layout.html';
// import '../../../data/appData.json';
$('body').html(tmpl);

// API_HOST 为空时使用本地数据
var API_HOST = '';
var intfUrl = 'http://' + API_HOST + '/screen.php?m=index&a=appInfo&package_name={package_name}';
var localPath = !API_HOST ? '/data/appData.json' : '';
loadData();

/**
 * 加载数据
 */
function loadData() {
    var pkgName = getParam(window.location.href, 'package_name') || 'com.gameloft.android.ANMP.GloftNAHM';
    var intf = localPath ? localPath : intfUrl.replace('{package_name}', pkgName);
    $.getJSON(intf, function(data) {
        if (200 == data.code) {
            fillCont(data.data);
            fillSliderCont(data.data.offerImages);
        } else {
            alert(data.message);
        }
    });

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
function fillCont(data) {
    // 图标
    var logoElm = document.getElementById('Jlogo');
    logoElm && (logoElm.src = data.offerIcon);
    // 名称
    var nameElm = document.getElementById('Jname');
    nameElm && (nameElm.innerHTML = data.offerName);
    // 发行商
    var pubElm = document.getElementById('Jpub');
    pubElm && (pubElm.innerHTML = data.offerAdvertiser);
    // 类型
    var typeElm = document.getElementById('Jtype');
    typeElm && (typeElm.innerHTML = data.offerTypes);
    // 评分
    var scoreElm = document.getElementById('Jscore');
    scoreElm && (scoreElm.innerHTML = data.offerStars);
    // 星级
    var starElm = document.getElementById('Jstar');
    var pct = data.offerStars / 5 * 100;
    !isNaN(pct) && (starElm.style.width = pct + '%');
    // 评分人数
    var plElm = document.getElementById('Jpl');
    plElm && (plElm.innerHTML = format(data.offerComments) + ' total');
    // 下载量
    var dlElm = document.getElementById('Jdl');
    dlElm && (dlElm.innerHTML = format(data.offerConversion));
    // 简介
    var txtElm = document.getElementById('Jtxt');
    txtElm && (txtElm.innerHTML = data.offerDescription);

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
}

/**
 * 创建滑块内容
 * @param  {Object} picArr 图片数组
 */
function fillSliderCont(picArr) {
    var html = '';
    var TMPL = '<div><img src="{url}" alt=""></div>';
    var wrapElm = document.getElementById('Jslider');
    for (var i = 0; i < picArr.length; i++) {
        html += TMPL.replace('{url}', picArr[i]);
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