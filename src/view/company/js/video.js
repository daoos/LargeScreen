import '../css/video.css';
import {data} from '../../../data/companyData.js';
import tmpl from '../video.html';
$('#JcontLeft').append(tmpl);

var srcArr = data.srcArr;  // 播放视频文件列表
var picArr = data.picArr;  // 播放视频文件列表
var curIndex = -1;  // 当前播放的视频索引
var videoElm = document.getElementById('Jvideo');   // video 元素
var overlayElm = document.getElementById('Joverlay');   // 播放遮罩层
var ctrlElm = document.getElementById('JvideoCtrl');    // 视频选择控制列表
var ctrlLst = createCtrl(picArr);    // 视频选择控制元素

bindEvt();
selVideo(0);

/**
 * 生成视频控制元素
 * @param  {Object} picArr 图片数组
 * @return {Object}        控制元素数组
 */
function createCtrl(picArr) {
    var html = '';
    var TMPL = '<li><img src="{url}"></li>';
    for (var i = 0; i < picArr.length; i++) {
        html += TMPL.replace('{url}', picArr[i]);
    }
    ctrlElm.innerHTML = html;
    return ctrlElm.children;
}

/**
 * 设置当前播放的视频（自动播放）
 * @param  {Number} selIndex 视频索引
 */
function selVideo(selIndex) {
    if (curIndex == selIndex) return;

    if (0 <= selIndex && picArr.length > selIndex) {
        $(ctrlLst[curIndex]).removeClass('current');
        $(ctrlLst[curIndex = selIndex]).addClass('current');
    }

    if (0 <= selIndex && srcArr.length > selIndex) {
        // TODO: 报错
        // Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause()
        videoElm.pause();
        videoElm.src = srcArr[curIndex = selIndex];
        videoElm.currentTime = 0;
        videoElm.play();
    }
}

/**
 * 绑定相关事件
 */
function bindEvt() {

    // 点击缩略图时播放视频（事件委托）
    ctrlElm && ctrlElm.addEventListener('click', function(e) {
        var e = e || window.event;
        var curElm = e.target;
        var tag = curElm && curElm.nodeName.toUpperCase();
        if ('LI' == tag || 'IMG' == tag && (curElm = curElm.parentElement)) {
            selVideo([].indexOf.call(ctrlLst, curElm));
        }
    }, false);

    // 点击遮罩层时播放视频
    overlayElm.addEventListener('click', function() {
        videoElm.play();
    }, false);

    // 点击视频时暂停
    videoElm.addEventListener('click', function() {
        videoElm.pause();
    });

    // 视频播放时隐藏遮罩层
    videoElm.addEventListener('playing', function() {
        overlayElm.style.display = 'none';
    }, false);

    // 视频暂停时显示遮罩层
    videoElm.addEventListener('pause', function() {
        overlayElm.style.display = 'block';
    }, false);

    // 视频结束时自动播放下一个视频
    videoElm.addEventListener('ended', function() {
        var selIndex = srcArr.length - 1 <= curIndex ? 0 : curIndex + 1;
        selVideo(selIndex);
    }, false);

}
