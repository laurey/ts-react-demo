const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
// const WorkboxPlugin = require("workbox-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { rootDir, appBuild, appSrc, appBui, appSrcld, appHtml, appPath, appTsConfig } = require('../paths');

module.exports = (env, argv) => {
    const mode = 'production';
    // const isProduction = argv.env.production || env.productin;
    const port = parseInt(process.env.PORT, 10) || 8900;
    const { analyze: isAnalyze } = argv;

    return {
        mode,
        context: appPath,
        entry: './src/index.tsx',
        devtool: 'source-map',
        output: {
            filename: 'assets/js/[name].[contenthash:8].js',
            path: appBuild,
            chunkFilename: 'assets/js/[name].[contenthash:8].chunk.js',
            publicPath: '/'
        },
        resolve: {
            alias: {
                // 'react-dom': '@hot-loader/react-dom',
                '@': appSrc
            },
            extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.less']
        },
        module: {
            rules: [
                {
                    test: /\.(tsx?)$/,
                    include: [appSrc],
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                // disable type checker - we will use it in fork plugin
                                transpileOnly: true
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                modules: {
                                    // auto: true,
                                    localIdentName: '[contenthash:base64:6]'
                                }
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    sourceMap: true,
                                    strictMath: true,
                                    javascriptEnabled: true
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                modules: {
                                    localIdentName: '[contenthash:base64:6]'
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                },
                {
                    test: /\.(eot|ttf|otf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'static/fonts/[name].[contenthash:8].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|jpeg)$/i,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[contenthash:8].[ext]'
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack']
                },
                {
                    test: /\.worker\.js$/,
                    loader: 'worker-loader'
                }
            ]
        },
        plugins: [
            // new CleanWebpackPlugin(),
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].[contenthash:8].css',
                chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css'
            }),
            new HtmlWebpackPlugin({
                template: appHtml,
                favicon: path.resolve(appPath, 'public/favicon.ico'),
                inject: true
            }),
            // new MonacoWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            isAnalyze && new BundleAnalyzerPlugin({ analyzerMode: 'server' }),
            new ForkTsCheckerWebpackPlugin({
                // eslint: {
                //     files: './src/**/*.{ts,tsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
                // },
                async: false,
                typescript: {
                    configFile: appTsConfig,
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true
                    }
                    // mode: 'write-references'
                }
            })
            // new WorkboxPlugin.GenerateSW({
            //   swDest: "service-worker.ts",
            //   clientsClaim: true,
            //   skipWaiting: true,
            //   maximumFileSizeToCacheInBytes: 10000000,
            // }),
        ].filter(Boolean),
        optimization: {
            minimize: true,
            runtimeChunk: 'single',
            minimizer: [
                new TerserWebpackPlugin({
                    // sourceMap: true,
                    extractComments: false,
                    terserOptions: {
                        format: {
                            comments: false
                        },
                        compress: {
                            comparisons: false
                        },
                        mangle: {
                            safari10: true
                        }
                    }
                })
                // new OptimizeCssAssetsPlugin({
                //     cssProcessorPluginOptions: {
                //         preset: ['default', { discardComments: { removeAll: true } }]
                //     }
                // })
            ],
            splitChunks: {
                chunks: 'all',
                minSize: 0,
                maxInitialRequests: 20,
                maxAsyncRequests: 20,
                cacheGroups: {
                    vendors: {
                        priority: -10,
                        reuseExistingChunk: true,
                        test: /[\\/]node_modules[\\/]/
                        // name(module, chunks, cacheGroupKey) {
                        //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        //     return `${cacheGroupKey}.${packageName.replace('@', '')}`;
                        // }
                    },
                    commons: {
                        name: 'commons',
                        minChunks: 2,
                        priority: -10
                    }
                    // styles: {
                    //   // name: "styles",
                    //   test: /\.css$/,
                    //   chunks: "all",
                    //   enforce: true,
                    // },
                }
            }
        },
        devServer: {
            port,
            hot: true,
            open: true,
            overlay: true,
            compress: true,
            host: 'localhost',
            stats: 'minimal',
            historyApiFallback: true,
            contentBase: appBuild
        }
    };
};
