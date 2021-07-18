const path = require('path'),
      fs = require('fs'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
      webpack = require('webpack');

const test = 'form-elements.html';

// Main const
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
  pageTest: path.join(__dirname, `../dist/${test}`)
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`,
      PAGES = fs.readdirSync(`${PATHS.src}/pug/pages/`);

module.exports = {
    externals: {
        paths: PATHS,
        page: test
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: "/"
    },
    target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    module: {
        rules: [
            {
                //Pug
            test: /\.pug$/,
            loader: "pug-loader"
            },
            {
                //JavaScript
            test: /\.js$/,
            loader: "babel-loader",
            exclude: [
                /node_modules/,
            ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: `${PATHS.assets}fonts/[hash][ext][query]`
                }
            },
            {
                // Css
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { sourceMap: true }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            path: './postcss.config.js'
                        }
                    }
                }
            ]
                
            },
            {
                // Sass
            test: /\.sass$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { sourceMap: true }
                }, 
                {
                    loader: "sass-loader",
                    options: { sourceMap: true } 
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            path: './postcss.config.js'
                        }
                    }
                }
            ]
                
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/${PATHS.assets}img`,
                    to: `${PATHS.assets}img`
                },
                {
                    from: `${PATHS.src}/${PATHS.assets}icons`,
                    to: `${PATHS.assets}icons`
                }
        ]}),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`
        }),
        new FaviconsWebpackPlugin({
            logo: './src/assets/icons/logo.svg',
            outputPath: './assets/favicon/',
            prefix: 'assets/favicon/',
        }),
        ...PAGES.map(filename => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${filename}/${filename}.pug`,
            filename: `${filename}.html`
        })),
    ],
    performance: {
        maxEntrypointSize: 2048000,
        maxAssetSize: 2048000
    }
};