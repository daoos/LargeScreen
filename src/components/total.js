import '../../vandor/animateBackground-plugin.js'
import temp from './total.html';
import './total.css';


export default class Total {
    render(node) {
        $(node).append(temp);
    };
    
    init(){
		const setNumber = (dom, number) => {
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
				
		const getdata = (time) => { 
		    $.ajax({ 
		        url: 'json.json', 
		        type: 'GET', 
		        dataType: "json", 
		        cache: false, 
		        timeout: 10000, 
		        error: function(){}, 
		        success: function(data){ 
		        	console.log(data.common.clickDailyHalf.start); 
		        	//测试
		        	var start = data.common.clickDailyHalf.start;		        	
		        	// xiugai 
		        	function getAddData(c,time){
						return start += Math.floor(data.common[c].increase/(0.5*60*60*1000)/1000*time);
					}
					setNumber($("#val1"),getAddData('clickDailyHalf',time));
					setNumber($("#val2"), getAddData('clickDailyHalf',time) + Math.floor(Math.random() * 1000000));
					setNumber($("#val3"), getAddData('clickDailyHalf',time) + Math.floor(Math.random() * 1000000));
					window.setInterval(function(){
						setNumber($("#val1"),getAddData('clickDailyHalf',time));
						setNumber($("#val2"), getAddData('clickDailyHalf',time)+Math.floor(Math.random() * 1000000));
						setNumber($("#val3"), getAddData('clickDailyHalf',time)+Math.floor(Math.random() * 1000000));
					}, time);
		        }
		    }); 
		}; 
		getdata(3000);			
    }        

}