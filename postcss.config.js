module.exports = {
    plugins: [
        'postcss-import',
        ['postcss-preset-env', { browsers: ['> 10%', 'not ie 11', 'not op_mini all'] }],
        // 'postcss-preset-env'
        ['autoprefixer'],
        [
            'cssnano',
            {
                preset: ['default', { discardComments: true }]
            }
        ]
    ]
};
