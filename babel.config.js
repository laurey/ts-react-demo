module.exports = api => {
    const mode = api.env() || 'production';

    api.cache.using(() => mode);

    return {
        presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-react',
            '@babel/preset-typescript'
        ]
        // plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]]
    };
};
