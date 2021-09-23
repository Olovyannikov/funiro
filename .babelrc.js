module.exports = {
    presets: [
        require("@babel/preset-env"),
        require("babel-preset-es2017"),
    ],
    plugins: [
        "@babel/transform-runtime"
    ]
};
