var webpack = require('webpack');
var path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');
module.exports = {
    context: __dirname + '/src',
    entry: {
        app: './index.js',
        vendor: ['react']
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties", '@babel/plugin-syntax-dynamic-import']
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'main.bundle.js',
        filename: '[name].js',
        publicPath: '/dist/'
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin()
        new BabiliPlugin()
    ],
    optimization: {
        splitChunks: {
            name: 'vendor',
        }
    },
    // devtool: 'source-map',
    devServer: {
        port: "3000",
        // publicPath: '/dist',
        // contentBase: './', //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true, //实时刷新
        hot: true
    },
    
}