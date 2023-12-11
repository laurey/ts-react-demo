'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

// require('../env');

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TSImportPluginFactory = require('ts-import-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
// const WorkboxPlugin = require("workbox-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const getClientEnvironment = require('../env');
const {
    appPath,
    appBuild,
    appSrc,
    appTsConfig,
    publicUrlOrPath,
    appHtml,
    imageBundleLocation,
    fontBundleLocation,
    jsBundleLocation,
    cssBundleLocation
} = require('../paths');
const { cssModuleRegex, cssRegex, antdCssRegex } = require('./cssLoaders');

module.exports = (webpackEnv, argv) => {
    const mode = 'production';
    const port = parseInt(process.env.PORT, 10) || 8900;
    const { analyze: isAnalyze } = argv;

    const env = getClientEnvironment(publicUrlOrPath.slice(0, -1));

    return {
        mode,
        context: appPath,
        entry: ['./src/index.tsx'],
        devtool: false,
        output: {
            clean: true,
            path: appBuild,
            publicPath: publicUrlOrPath,
            filename: jsBundleLocation + '/[name].[contenthash:8].js',
            chunkFilename: jsBundleLocation + '/[name].[contenthash:8].chunk.js'
        },
        resolve: {
            alias: {
                // 'react-dom': '@hot-loader/react-dom',
                '@': appSrc
            },
            modules: ['node_modules', 'src'],
            extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.less']
        },
        module: {
            rules: [
                {
                    test: /\.([cm]?ts|tsx)$/,
                    include: [appSrc],
                    // exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                // disable type checker - we will use it in fork plugin
                                transpileOnly: true
                                // getCustomTransformers: () => ({
                                //     before: [
                                //         TSImportPluginFactory({
                                //             libraryName: 'antd',
                                //             libraryDirectory: 'es',
                                //             style: true
                                //         })
                                //     ]
                                // })
                            }
                        }
                    ]
                },
                {
                    test: cssRegex,
                    exclude: [cssModuleRegex, antdCssRegex],
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                                modules: {
                                    auto: false,
                                    localIdentName: '[hash:base64:8]'
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader'
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
                    test: cssModuleRegex,
                    include: [appSrc],
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                                modules: {
                                    auto: true,
                                    localIdentName: '[hash:base64:8]'
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader'
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
                    test: antdCssRegex,
                    // include: excludeModules,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                                modules: {
                                    auto: false,
                                    localIdentName: '[hash:base64:8]'
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    sourceMap: true,
                                    strictMath: false,
                                    javascriptEnabled: true
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot|otf)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: fontBundleLocation + '/[name].[hash:8][ext][query]'
                    }
                },
                {
                    test: /\.(png|jpg|gif|jpeg)$/i,
                    type: 'asset',
                    generator: {
                        filename: imageBundleLocation + '/[name].[hash:8][ext][query]'
                    }
                },
                {
                    test: /\.svg$/i,
                    type: 'asset',
                    resourceQuery: /url/ // *.svg?url
                },
                {
                    test: /\.svg$/,
                    issuer: /\.(j|t)sx?$/,
                    resourceQuery: { not: [/url/] },
                    use: [
                        'babel-loader',
                        '@svgr/webpack',
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10240
                            }
                        }
                    ]
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
                filename: cssBundleLocation + '/[name].[contenthash:8].css',
                chunkFilename: cssBundleLocation + '/[name].[contenthash:8].chunk.css'
            }),
            new HtmlWebpackPlugin({
                template: appHtml,
                favicon: path.resolve(appPath, 'public/favicon.ico'),
                inject: true
            }),
            // new MonacoWebpackPlugin(),
            // new webpack.DefinePlugin({
            //     'process.env.NODE_ENV': JSON.stringify('production')
            // }),
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/
            }),
            new webpack.DefinePlugin(env.stringified),
            isAnalyze && new BundleAnalyzerPlugin({ analyzerMode: 'server' }),
            new ForkTsCheckerWebpackPlugin({
                async: false,
                typescript: {
                    configFile: appTsConfig,
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true
                    }
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
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    },
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        // cacheGroupKey here is `commons` as the key of the cacheGroup
                        name(module, chunks, cacheGroupKey) {
                            const moduleFileName = module
                                .identifier()
                                .split('/')
                                .reduceRight(item => item);
                            const allChunksNames = chunks.map(item => item.name).join('~');
                            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                        },
                        chunks: 'all'
                    }
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
