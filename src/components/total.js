import '../../vandor/animateBackground-plugin.js'
import {setNumberSeparator, impressCardinalNumber,mt_rand} from '../modules/common.js';
import temp from './total.html';
import './total.css';


export default class Total{
	init(){$('.wrapper').append(temp);
	}
	render(_STORE){

		let clickDailyHalfData = _STORE.clickDailyHalf;
		let startTime =localStorage.START_TIME;
		// let impressCardinalNumber = 34;

		let deviesCoverageData = clickDailyHalfData.device;
		let deviceCoverageStart = Number(deviesCoverageData.start);
		let inc_s = deviesCoverageData.inc;
		let px2rem = localStorage.PX2REM; // 当前页面的rem基准值
	    
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
				
				var y = -40 * parseInt(n.charAt(i), 10);
				y = y/100*px2rem;
				if(i < len - 1 && (len - i - 1) % 3 == 0)
					$("<b></b>").insertAfter(obj);
				obj.animate({ backgroundPositionY:y+"px" }, 350);
			}
			// console.log(number);
		}

		function getCurrentData(str){
			let start = clickDailyHalfData.start;
			let increase = clickDailyHalfData.increase;            
            var s = (new Date().getTime() - startTime)/1000;
            var data = Math.floor((increase/1800) * s + start);
            // console.log('TOTAL----------','start: '+start,'increase: '+increase,s,increase/1800,'Current: '+data);
            return data;
                  
        }

        
        function getDeviceCoverageCurrentData(){
        	var s = (new Date().getTime() - startTime)/1000;
        	var data = (inc_s * s) + deviceCoverageStart;
        	return Math.floor(data + mt_rand(-7,7));
        }

		function render(){	
		    let currentData = getCurrentData();		
			setNumber($("#val1"),  currentData);
			setNumber($("#val2"),  currentData*impressCardinalNumber);
			setNumber($("#val3"),  getDeviceCoverageCurrentData());
		}
		render();
		setInterval(render, 3000);

	}
}


