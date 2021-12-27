module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://localhost:4000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api': '/' },
            },
        },
    },
};