const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
// const WorkboxPlugin = require("workbox-webpack-plugin");
// const TerserWebpackPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { rootDir, distDir, srcDir } = require('../paths');

module.exports = (env, argv) => {
    const mode = 'development';
    const port = parseInt(process.env.PORT, 10) || 8900;
    const { analyze: isAnalyze } = argv;

    return {
        mode,
        context: rootDir,
        devtool: 'inline-source-map',
        entry: ['react-hot-loader/patch', './src/index.tsx'],
        output: {
            filename: 'assets/js/[name].bundle.js',
            path: distDir,
            chunkFilename: 'assets/js/[name].chunk.js',
            publicPath: '/'
        },
        resolve: {
            alias: {
                'react-dom': '@hot-loader/react-dom',
                '@': srcDir
            },
            extensions: ['*', '.js', '.ts', '.tsx', '.json', '.css', '.less']
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
                    test: /\.tsx?$/,
                    include: [srcDir],
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
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                modules: {
                                    // auto: true,
                                    mode: 'global',
                                    localIdentName: '[path][name]__[local]--[contenthash:5]'
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
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                modules: {
                                    // auto: true,
                                    localIdentName: '[path][name]__[local]--[contenthash:5]'
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                },
                {
                    test: /\.css$/i,
                    include: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
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
                                name: 'assets/static/[name].[contenthash:8].[ext]'
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
                            name: 'assets/static/[name].[contenthash:8].[ext]'
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
            new HtmlWebpackPlugin({
                template: path.resolve(rootDir, 'public/index.html'),
                favicon: path.resolve(rootDir, 'public/favicon.ico'),
                inject: true
            }),
            // new MonacoWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
            isAnalyze && new BundleAnalyzerPlugin({ analyzerMode: 'server' }),
            new webpack.HotModuleReplacementPlugin(),
            new ForkTsCheckerWebpackPlugin({
                // eslint: {
                //     files: './src/**/*.{ts,tsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
                // },
                async: false,
                typescript: {
                    configFile: path.resolve(rootDir, 'tsconfig.json'),
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
            open: true,
            compress: true,
            host: 'localhost',
            historyApiFallback: true
        }
    };
};
