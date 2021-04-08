//https://medium.com/dailyjs/building-a-react-component-with-webpack-publish-to-npm-deploy-to-github-guide-6927f60b3220
/*** webpack.config.js ***/
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "examples/src/index.html"),
    filename: "./index.html"
})
module.exports = {
    entry: path.join(__dirname, "examples/src/index.js"),
    output: {
        path: path.join(__dirname, "examples/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        port: 3011
    }
}
