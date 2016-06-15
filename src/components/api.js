import {handleAjax} from 'handleAjax.js';
let options = {url: 'json2.json'};

handleAjax(options).then(function (data) {
	  localStorage.data = JSON.stringify(data);
	  console.log(data,data.type);
	})['catch'](function (error) {
	  console.log(error);
});		