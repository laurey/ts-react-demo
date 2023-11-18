module.exports = {
    presets: [['@babel/preset-env'], '@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
        // '@babel/plugin-transform-runtime',
        // '@babel/plugin-syntax-dynamic-import',
        // '@babel/plugin-proposal-class-properties'
        [
            'import',
            [
                {
                    libraryName: 'antd',
                    style: 'css'
                }
            ]
        ],
        'react-hot-loader/babel'
    ],
    env: {
        development: {
            plugins: ['react-hot-loader/babel']
        },
        production: {
            only: ['src'],
            plugins: [
                // [
                //     'transform-react-remove-prop-types',
                //     {
                //         removeImport: true
                //     }
                // ],
                // '@babel/plugin-transform-react-inline-elements',
                // '@babel/plugin-transform-react-constant-elements'
            ]
        }
    }
};
