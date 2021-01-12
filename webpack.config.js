const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry:{
        main: './src/pages/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: ''
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 
                    {
                loader: 'css-loader',
                options: { importLoaders: 1 }
                },
                'postcss-loader',
            ]
              },
              {
                
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
              },
              {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
              }
        ],

    },
    devServer:{
        contentBase: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080,
        open: true

    },
    mode: 'development',
    plugins: [new  HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
]
}