const postCssLoader = {
    loader: 'postcss-loader'
};

const lessLoaders = [
    {
        loader: 'css-loader',
        options: {
            modules: {
                auto: true
            },
            esModule: true,
            sourceMap: false,
            importLoaders: 2
        }
    },
    postCssLoader,
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
];

const antdCssRegex = /antd\/\w+.+\.(css|less)?$/;
const cssModuleRegex = /\.module\.(css|less)$/;
const cssRegex = /\.(css|less)$/;

module.exports = {
    cssRegex,
    lessLoaders,
    antdCssRegex,
    cssModuleRegex
};
