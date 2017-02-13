import './css/normalize.css';
import './css/common.css';
import './css/style.css';
import '../../vandor/flexible.js';
import {__tw,nameToCode,codeToName} from '../../common/nn.js';
import CONFIG from 'config';
import API from 'api';
import tmpl from './layout.html';
$('body').html(tmpl);

let rankingDataJson = require('../../data/rankingData.json');
let countryDataJson = require('../../data/countryData.json');

//简码对应国家名称
//codeToName;

// API_HOST 为空时使用本地数据
var API_HOST = '';
var intfUrl = 'http://' + API_HOST + '/getTopRanksByCountryId?countryId={countryId}';
var localPath = !API_HOST ? rankingDataJson : '';
var $selElm = $('#Jsel');
var togElm = document.getElementById('JselTog');
var txtElm = document.getElementById('JselTxt');
var flagElm = document.getElementById('JselFlag');
var listElm = document.getElementById('JselList');
var itemLst = [];
var timer = null;
var duration = CONFIG.ranking.rate; // 轮播间隔（／毫秒）
var initFlag = true;
createSelList();

/**
 * 创建国家选择列表
 */
function createSelList() {
    var intf = countryDataJson;
    $.getJSON(intf, function(data) {
        fillListCont(data);
        bindEvt();
    }).fail(function(jqxhr, textStatus, error) {
        console.log("Request Failed: " + textStatus + ', ' + error);
    });
}

/**
 * 填充数据
 * @param  {Object} data 数据对象
 */
function fillListCont(data) {
    var html = '';
    var TMPL = '<li title="{name}" data-id="{id}">{name}</li>';
    for (var key in data) {
        var value = data[key];
        html += TMPL.replace(/\{name\}/g, value).replace('{id}', key);
        
    }

    listElm.innerHTML = html;
    itemLst = listElm.children;
    setSel(itemLst[0]);
}

/**
 * 绑定事件
 */
function bindEvt() {
    // 点击选择框是切换显示全部可选国家
    togElm && togElm.addEventListener('click', function(e) {
        var e = e || window.event;
        $selElm.hasClass('active') ? $selElm.removeClass('active') : $selElm.addClass('active');
        e.stopPropagation();
    }, false);

    // 点击选择国家列表切换当前国家（事件委托）
    listElm && listElm.addEventListener('click', function(e) {
        var e = e || window.event;
        var curElm = e.target;
        var tag = curElm && curElm.nodeName.toUpperCase();
        if ('LI' == tag) {
            setSel(curElm);
            $selElm.removeClass('active');
        }
    }, false);

    document.body.addEventListener('click', function() {
        $selElm.removeClass('active');
    });
}

/**
 * 选择国家
 * @param {Object} curElm 当前选择的元素
 */
function setSel(curElm) {
    if (!curElm) return;

    var id = curElm.getAttribute('data-id');
    var _id = codeToName[__tw[id]];

    if(_id){
        console.log(_id)

    let geoName = _id.replace(/' '/g,'%20');

        var src = require('../../images/flags/' + _id + '.png');
    }

    flagElm && (flagElm.src = src);
    loadApps(id);
    txtElm && (txtElm.innerHTML = curElm.innerHTML);

    timer && clearTimeout(timer);
    timer = setTimeout(function() {
        setSel(curElm.nextElementSibling || itemLst[0]);
    }, duration);
}

/**
 * 加载 APP 数据
 * @param  {Number} id 国家 id
 */
function loadApps(id) {
    if (!id) return;

    var intf = localPath ? localPath : intfUrl.replace('{countryId}', id);
    $.getJSON(intf, function(data) {
        if (200 == data.code) {
            fillApp(data.data);
        } else {
            alert(data.message);
        }
    });
}

/**
 * 填充内容
 * @param  {Object} data 数据对象
 */
function fillApp(data) {
    var $body = $('body');
    if (!initFlag) {
        $body.removeClass('s-ease-in');
        $body.addClass('s-ease-out');
        $body.timer && clearTimeout($body.timer);
        $body.timer = setTimeout(function() {
            $body.removeClass('s-ease-out');
            $body.addClass('s-ease-in');
        }, 1000);        
    } else {
        initFlag = false;
    }

    // 遍历平台数据
    for (var i = 0; i < data.length && i < 2; i++) {
        var platform = data[i];
        var platformName = platform.platformName.toUpperCase();
        var platFormRanks = platform.platFormRanks;

        // 遍历分类数据（指定平台）
        for (var j = 0; j < platFormRanks.length && j < 2; j++) {
            var rank = platFormRanks[j];
            var rankData = rank.rankData;
            var itemHtml = '';
            var ITEM_TMPL = '<a href="app.html?package_name={package_name}"><img src="{icon}" alt="">{name}</a>';

            // 遍历应用数据（指定分类）
            for (var k = 0; k < rankData.length; k++) {
                var item = rankData[k];
                itemHtml += ITEM_TMPL.replace('{package_name}', item.packageName).replace('{icon}', item.offerIcon).replace('{name}', item.offerName);
            }
            
            var html = '<dt>' + rank.rankName.toUpperCase() + '</dt><dd>' + itemHtml + '</dd>';
            var contElmId = (('IOS' == platformName) ? 'JappIos' : 'JappAdr') + (j + 1);
            var contElm = document.getElementById(contElmId);
            contElm && (contElm.innerHTML = html);
        }
    }
}
