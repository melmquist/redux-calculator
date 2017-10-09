const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: './src/main.js', 
    output: {
        filename: 'index.js', 
    },
    devServer: {
        inline: true, 
        port: 8080 
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, 
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'] 
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            }, 
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}  
                    }
                ]
              }
            
        ]
    }
}

module.exports = config;