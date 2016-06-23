var webpack = require('webpack'),
	CleanPlugin = require('clean-webpack-plugin'),//清理
	ExtractPlugin = require('extract-text-webpack-plugin'),// 抽取css
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	px2rem = require('postcss-px2rem'),

	path = require('path'),
	libraryName = 'build',
	outputFile = libraryName + '.js';

var	UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
	// env = process.env.WEBPACK_ENV,
	production = process.env.NODE_ENV === 'production',
	plugins = [  
	    new ExtractPlugin('css/[name].css'),
		//new ExtractPlugin("build.css"),    //单独使用style标签加载css并设置其路径
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
             title:'Touping App',
             // favicon:'./src/img/favicon.ico', //favicon路径
             // filename:'../index.html',    //生成的html存放路径，相对于 path
             // template:'../index.html',    //html模板路径
             // inject:true,    //允许插件修改哪些内容，包括head与body
             // hash:true,    //为静态资源生成hash值
             // chunks:['','']  //需要引入的chunk，默认引入所有页面资源
             minify:{    //压缩HTML文件
                 removeComments:true,    //移除HTML中的注释
                 collapseWhitespace:false    //删除空白符与换行符
             }
        }),
        new webpack.ProvidePlugin({
	      $: "jquery",
	      jQuery: "jquery",
	      "window.jQuery": "jquery"
	    }),

	    new CleanPlugin(['build/css/*.css','build/*.js']), 		
	    new webpack.optimize.CommonsChunkPlugin({
            name: 'main', // 将依赖移到我们的主文件中
            children: true, // 再在所有的子文件中检查依赖文件
            minChunks: 2, // 一个依赖重复几次会被提取出来
        })
	];

if (production) {
	plugins = plugins.concat([// 生产环境下需要的插件
		// 这个插件用来寻找相同的包和文件，并把它们合并在一起
        new webpack.optimize.DedupePlugin(),

        // 这个插件根据包/库的引用次数来优化它们
        new webpack.optimize.OccurenceOrderPlugin(),

        // 这个插件用来阻止Webpack把过小的文件打成单独的包
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200, // ~50kb
        }),

        // 压缩js文件
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // 禁止生成warning
            },
        }),

        // 这个插件提供了各种可用在生产环境下的变量
        // 通过设置为false，可避免生产环境下调用到它们
        new webpack.DefinePlugin({
            __SERVER__: !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__: !production,
            'process.env': {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        })
    ]);
	outputFile = libraryName + 'min.js';
} else{
	outputFile = libraryName + '.js';
};


var config = {
	
	entry:__dirname + '/src/main.js',
	debug: !production,
	devtool: production ? false : 'eval-source-map',
	
	output:{
		path: path.join(__dirname , '/build/'),
		filename: production ? '[name]-[hash].js' : outputFile,
		chunkFilename: '[name]-[chunkhash].js',
		// publicPath: '/',
		publicPath:'../build/',
		library: libraryName,
		libraryTarget: 'umd',
		umdNameDefine: true
	},

	devServer: {
		port:8000,
		host:'localhost',
        hot: true,
        inline: true,
        historyApiFallback:true,
        // contentBase:'../build/',


        // //其实很简单的，只要配置这个参数就可以了
        // proxy: {
        //   '/api/*': {//配置请求本地代理 http://localhost:5000/api/*
        //       target: 'http://localhost:8000',
        //       secure: false
        //   }
        // }
    },


	module:{
		loaders:[
			{
				test: /\.js$/, 
				loader: 'babel-loader', 
				exclude: /node_modules/ ,
				query: {
			        "presets": ["es2015"]
			    }
			},
			// {
		 //      test: /\.less$/,
		 //      loader: ExtractPlugin.extract('style', 'css!postcss!less-loader?sourceMap'),
		 //    },
			{
				test: /\.css/, 
				loader: ExtractPlugin.extract('style','css?sourceMap!postcss?sourceMap'), 
				exclude: /node_modules/
			},
			// {
			//     test: /\.(png|gif|jpe?g|svg)$/i,
			//     loader: 'url-loader?limit=8000&name=./images/[name].[ext]',
			// },
			{
		      test: /\.(jpe?g|png|gif|svg)$/i,
		      loader: 'file-loader?name=img/[name].[ext]'
		    }, 
			{   //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
             
		    // {
		    //   test: /\.html$/,
		    //   loader: 'file-loader'
		    // },
			{
				test: /\.html$/,
				loader: 'html?attrs=img:src img:data-src',
				exclude: /node_modules/
			}
		]
	},
	
	resolve:{
		root: path.resolve('./src'),
		extensions: ['','.js']
	},
	
	plugins: plugins,

	postcss: [
	require('precss'), 
	require('autoprefixer'),
	px2rem({remUnit:100})
	]
};
module.exports = config;