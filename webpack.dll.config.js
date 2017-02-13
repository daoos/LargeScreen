var webpack = require('webpack');
var	CleanPlugin = require('clean-webpack-plugin');//清理
var	ExtractPlugin = require('extract-text-webpack-plugin');// 抽取css
var	path = require('path');
var indexDll = ['echarts'];
var worldMapDll = [
	'echarts2/echarts',
	'echarts2/echarts',
	'echarts2/config',
	'src/vandor/geojson/geojson'
];

var config = {	
	entry: {
		index:indexDll,
		worldMap:worldMapDll
	},
	
	output:{
		path: path.join(__dirname , '/build/dll/'),
		filename: '[name]Dll.js',
		library:'[name]',
	},
		
	resolve:{
		root: path.resolve('./'),
		extensions: ['', '.js', '.json', '.scss'],
		alias:{
			echarts2$:"src/vandor/echarts/src/echarts.js",
			echarts2:"src/vandor/echarts/src",
		}
	},
	
	plugins: [
		new webpack.DllPlugin({
			path:path.join( __dirname, '/build/dll/[name]-manifest.json'),
			name:'[name]',
			context:__dirname,
		}),
        // new webpack.optimize.UglifyJsPlugin({ minimize: true, output: {comments: false} })
	],
};
module.exports = config;