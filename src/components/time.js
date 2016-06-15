import '../../vandor/jquery.MyDigitClock.js';
import temp from './time.html';
// import 'normalize.css';
import './time.css';

$('.wrapper').append(temp);
$("#clock1").MyDigitClock({
    fontSize:20, 
    // fontFamily:"Century gothic", 
    fontColor: "#01dbff", 
    fontWeight:"bold", 
    // bAmPm:true,
    background:'transparent',
    bShowHeartBeat:true
})
var date = new Date().toDateString();
var yearmun = date.slice(date.length-4);
var mouthmun = date.slice(4,date.length-4);
$('.mouth').html(mouthmun);
$('.year').html(yearmun);