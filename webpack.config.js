var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');//清理
var ExtractPlugin = require('extract-text-webpack-plugin');// 抽取css
var HtmlWebpackPlugin = require('html-webpack-plugin');
var px2rem = require('postcss-px2rem');
var path = require('path');
var glob = require('glob');

var IS_PRODUCTION = process.env.NODE_ENV === 'production';
var	plugins = [  
	    new ExtractPlugin('css/[name].css'),        
        new webpack.ProvidePlugin({
	      $: "jquery",
	      jQuery: "jquery",
	      "window.jQuery": "jquery",
	      "window.$":"jquery",
	    }),		
		new webpack.optimize.CommonsChunkPlugin({//多个入口文件，提取公共依赖
            name: 'commons', // 
            children: true, // 在所有的子文件中检查
            minChunks: 2, // 提取重复两次以上的依赖
        }),
	    new CleanPlugin(['build/css/*.css','build/*.js']), 		
	];

if (IS_PRODUCTION) {
	plugins = plugins.concat([		
		// 相同包和文件合并
        new webpack.optimize.DedupePlugin(),
        // 引用次数优化
        new webpack.optimize.OccurenceOrderPlugin(),
        // 压缩js
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // 禁止生成warning
                drop_console: true
            },
        }),
    ]);
}

var entries = getEntries('src/view/**/index.js');
// console.log("000",entries)
var entry = {};

Object.keys(entries).forEach(function(name) {
    // entry，如果需要HotUpdate，在这里修改entry
    entry[name] = entries[name];
    // 生成html
    var plugin = new HtmlWebpackPlugin({
        filename: name + '.html',
        template: './template.html',
        inject: true,
        chunks: ['commons',name],
        minify: {    //压缩HTML文件
                 removeComments:true,    //移除HTML中的注释
                 collapseWhitespace:false    //删除空白符与换行符
                }
    });
    plugins.push(plugin);
})

var config = {	
	entry: entry,
	debug: !IS_PRODUCTION,
	devtool: IS_PRODUCTION ? false : 'eval-source-map',	
	output:{
		path: path.join(__dirname , '/build/'),
		filename: '[name]-[id].js',
		publicPath:'/',//指定在游览器中引用路径
	},
	devServer: {
		port:9090,
		host:'localhost',
        hot: true,
        inline: true,
        historyApiFallback:true,
        contentBase:__dirname+'/build',
        // proxy: {//配置代理
        //   '/http://dmp-api-public-1335071291.us-east-1.elb.amazonaws.com/get_dmp_app?package=*': {
        //       target: 'http://52.6.12.10/get_dmp_app?package=com.playrix.gardenscapes',
        //       secure: false
        //   },
        //   '/1': {
        //       target: 'http://3s.mobvista.com/screen.php?m=index&a=index&_t=1465870766000&_t1=00f4dab846761ef48f99f763d004225c&callback=jsonp_1487238718803_25309',
        //       secure: false
        //   },
        // }

    },
	module:{
		loaders:[		    
			{
				test: /\.js$/, 
				loader: 'babel-loader', 
				exclude: /node_modules/ ,
				query: {"presets": ["es2015"]}
			},
			// {
			//   test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
			//   loader: 'expose?$!expose?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
			// },
			{
		      test: /\.less$/,
		      loader: ExtractPlugin.extract('style', 'css!postcss!less-loader?sourceMap'),
		    },
			{
				test: /\.css/, 
				loader: ExtractPlugin.extract('style','css?sourceMap!postcss?sourceMap'), 
				exclude: /node_modules/
			},
			{
		      test: /\.(jpe?g|png|gif|svg)$/i,
		      loader: 'file-loader?name=images/[name].[ext]'
		    }, 
			{   //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {  
                test: /\.json$/,
                loader: 'file-loader?name=data/[name].[ext]'
            },


			{
				test: /\.html$/,
				loader: 'html?attrs=img:src img:data-src',
				exclude: /node_modules/
			}
		]
	},	
	resolve:{
		root: path.resolve('./'),
		extensions: ['', '.js', '.json', '.scss'],
		alias:{
			config:'src/config',
			api:'src/api'
		}
	},	
	plugins: plugins,
	postcss: [
		require('precss'), 
		require('autoprefixer'),
		px2rem({remUnit:100})
	]
};

/************************/
// 获取指定路径下的入口文件
function getEntries(globPath) {
     var files = glob.sync(globPath);
     // console.log("001",files)
     var entries = {};
     files.forEach(function(filepath) {
         // 取倒数第二层(view下面的文件夹)做包名
         var split = filepath.split('/');
         var name = split[split.length - 2];
         entries[name] = './' + filepath;
     });
     return entries;
}
module.exports = config;