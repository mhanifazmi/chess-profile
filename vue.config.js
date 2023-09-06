const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            "/api": {
                target: "https://mhanifazmi.com",
                changeOrigin: true,
            },
        },
        headers: { "Access-Control-Allow-Origin": "*" },
    },
});
