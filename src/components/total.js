import '../../vandor/animateBackground-plugin.js'
import temp from './total.html';
import './total.css';
import {handleAjax} from '../modules/handleAjax.js';


$('.wrapper').append(temp);
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
		
		var y = -40 * parseInt(n.charAt(i), 10);
		if(i < len - 1 && (len - i - 1) % 3 == 0)
			$("<b></b>").insertAfter(obj);
		obj.animate({ backgroundPositionY:y+"px" }, 350);
	}
};
		

var options = {url: 'json2.json'};

handleAjax(options).then(function (data) {
    var start = data.common.clickDailyHalf.start;
    localStorage.localdata = JSON.stringify(data);		        	
	// xiugai 
	function getAddData(c,time){
		return start += Math.floor(data.common[c].increase/(0.5*60*60*1000)/1000*time);
	}
	setNumber($("#val1"),getAddData('clickDailyHalf',3000));
	setNumber($("#val2"),  Math.floor((getAddData('clickDailyHalf',3000)+ Math.floor(Math.random() * 1000))*0.03));
	setNumber($("#val3"),  Math.floor((getAddData('clickDailyHalf',3000)+ Math.floor(Math.random() * 1000))*0.0006));
	window.setInterval(function(){
		setNumber($("#val1"),getAddData('clickDailyHalf',3000));
		setNumber($("#val2"), Math.floor((getAddData('clickDailyHalf',3000)+ Math.floor(Math.random() * 1000))*0.03));

		setNumber($("#val3"), Math.floor((getAddData('clickDailyHalf',3000)+ Math.floor(Math.random() * 1000))*0.006));

	}, 3000);
  console.log(data);
})['catch'](function (error) {
  console.log(error);
});		


