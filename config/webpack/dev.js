'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

require('../env');

const path = require('path');
const webpack = require('webpack');

// const TSImportPluginFactory = require('ts-import-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
// const WorkboxPlugin = require("workbox-webpack-plugin");
// const TerserWebpackPlugin = require('terser-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const getClientEnvironment = require('../env');
const { appPath, appBuild, appSrc, appTsConfig, publicUrlOrPath, appHtml } = require('../paths');
const { cssModuleRegex, cssRegex, antdCssRegex } = require('./cssLoaders');

module.exports = (webpackEnv, argv) => {
    const mode = 'development';
    const port = parseInt(process.env.PORT, 10) || 8900;
    const { analyze: isAnalyze } = argv;

    const env = getClientEnvironment(publicUrlOrPath.slice(0, -1));

    return {
        mode,
        context: appPath,
        devtool: 'inline-source-map',
        entry: ['./src/index.tsx'],
        output: {
            filename: 'assets/js/[name].bundle.js',
            path: appBuild,
            chunkFilename: 'assets/js/[name].chunk.js',
            publicPath: publicUrlOrPath
        },
        resolve: {
            alias: {
                // 'react-dom': '@hot-loader/react-dom',
                '@': appSrc
            },
            modules: ['node_modules', 'src'],
            extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.less'],
            extensionAlias: {
                '.js': ['.js', '.ts'],
                '.cjs': ['.cjs', '.cts'],
                '.mjs': ['.mjs', '.mts']
            }
        },
        watchOptions: {
            // for some systems, watching many files can result in a lot of CPU or memory usage
            // https://webpack.js.org/configuration/watch/#watchoptionsignored
            // don't use this pattern, if you have a monorepo with linked packages
            ignored: /node_modules/
        },
        module: {
            rules: [
                {
                    test: /\.([cm]?ts|tsx)$/,
                    include: [appSrc],
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
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                                modules: {
                                    auto: false,
                                    localIdentName: '[path][name]__[local]--[contenthash:5]'
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
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                                modules: {
                                    auto: true,
                                    localIdentName: '[path][name]__[local]--[contenthash:5]'
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
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                                modules: {
                                    auto: false,
                                    localIdentName: '[path][name]__[local]--[contenthash:5]'
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
                    type: 'asset/resource'
                },
                {
                    test: /\.(png|jpg|gif|jpeg)$/i,
                    type: 'asset'
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
            new HtmlWebpackPlugin({
                template: appHtml,
                favicon: path.resolve(appPath, 'public/favicon.ico'),
                inject: true
            }),
            // new webpack.HotModuleReplacementPlugin(),
            // new MonacoWebpackPlugin(),
            // new webpack.DefinePlugin({
            //     'process.env.NODE_ENV': JSON.stringify('development')
            // }),
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/
            }),
            new webpack.DefinePlugin(env.stringified),
            isAnalyze && new BundleAnalyzerPlugin({ analyzerMode: 'server' }),
            new ForkTsCheckerWebpackPlugin({
                async: true,
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
        devServer: {
            port,
            hot: true,
            open: true,
            compress: true,
            host: 'localhost',
            historyApiFallback: true
        }
    };
};
