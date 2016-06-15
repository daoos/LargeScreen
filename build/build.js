(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["build"] = factory();
	else
		root["build"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonpbuild"];
/******/ 	window["webpackJsonpbuild"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "-" + {"1":"d9092b79405c943b7bf4"}[chunkId] + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/qiansr/TEST/3S/touping/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nif (document.querySelectorAll('body').length) {\n    __webpack_require__.e/* nsure */(1, function () {\n        __webpack_require__(1);\n        __webpack_require__(2);\n        // require('./components/WorldMaps2');\n        // require('./components/world3.js');\n        __webpack_require__(15);\n        __webpack_require__(20);\n        __webpack_require__(27);\n        __webpack_require__(386);\n\n        // const WorldMap2 = require('./components/WorldMaps2').default;\n    });\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcz8zNDc5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxTQUFTLGdCQUFULENBQTBCLE1BQTFCLEVBQWtDLE1BQXRDLEVBQThDO0FBQzFDLHdDQUFtQixZQUFNO0FBQ3JCLDRCQUFRLENBQVI7QUFDQSw0QkFBUSxDQUFSOzs7QUFHQSw0QkFBUSxFQUFSO0FBQ0EsNEJBQVEsRUFBUjtBQUNBLDRCQUFRLEVBQVI7QUFDQSw0QkFBUSxHQUFSOzs7QUFNSCxLQWREO0FBZUgiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdib2R5JykubGVuZ3RoKSB7XG4gICAgcmVxdWlyZS5lbnN1cmUoW10sICgpID0+IHtcbiAgICAgICAgcmVxdWlyZSgnLi9tb2R1bGVzL2FwaS5qcycpO1xuICAgICAgICByZXF1aXJlKCcuL2NvbXBvbmVudHMvV29ybGRNYXAnKTtcbiAgICAgICAgLy8gcmVxdWlyZSgnLi9jb21wb25lbnRzL1dvcmxkTWFwczInKTtcbiAgICAgICAgLy8gcmVxdWlyZSgnLi9jb21wb25lbnRzL3dvcmxkMy5qcycpO1xuICAgICAgICByZXF1aXJlKCcuL2NvbXBvbmVudHMvVGltZScpO1xuICAgICAgICByZXF1aXJlKCcuL2NvbXBvbmVudHMvVG90YWwnKTtcbiAgICAgICAgcmVxdWlyZSgnLi9jb21wb25lbnRzL0FkdmVydGlzZXJUb3A1Jyk7XG4gICAgICAgIHJlcXVpcmUoJy4vY29tcG9uZW50cy9JbXByZXNzaW9uVG9wNScpO1xuXG4gICAgICAgXG4gICAgICAgIC8vIGNvbnN0IFdvcmxkTWFwMiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Xb3JsZE1hcHMyJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgXG4gICAgfSlcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYWluLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ])
});
;