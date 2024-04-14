const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ENV = process.env.NODE_ENV === "production" ? "production" : "development"

module.exports = {
    mode: ENV,
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].[fullhash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(?:js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                             "@babel/preset-env",
                            ["@babel/preset-react", {"runtime": "automatic"}]
                        ],
                    }
                }
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    publicPath: 'images',
                    outputPath: 'images',
                  }
                }
              },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
            watch: true
        },
        compress: false,
        hot: true,
        port: 3001
    },
    plugins: [
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             context: path.resolve(__dirname,"src"),
        //             from: "./*.html",
        //         }
        //     ],
        // }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
}