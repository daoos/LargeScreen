import config from 'config';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import fetchJsonp from 'fetch-jsonp';

const ROOTURL = 'http://' + config.base.API_HOST;
// const JSONP = 'jsonpReturn';
const t = '&_t=1465870766000&_t1=00f4dab846761ef48f99f763d004225c';

let API = {
	getAppInfoDataMore:(data)=>{
		return fetch('http://dmp-api-public-1335071291.us-east-1.elb.amazonaws.com/get_dmp_app?package='+data);
	},
	
    getAppInfoData:(data)=>{
		return fetchJsonp('http://3s.maosheng.com/screen.php?m=index&a=appInfo&package_name='+data+t,{jsonp:'jsonpReturn'});
	},

	getIndexData:()=>{
		return fetchJsonp(ROOTURL+'/screen.php?m=index&a=index'+t, {jsonp:'jsonpReturn'}).then((response)=>{return response.json()});
	},
}
export default API