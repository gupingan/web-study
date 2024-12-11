// babel 的作用是将 ES6 语法转为 ES5 语法，支持低端浏览器
// 全局安装 babel-cli（下次不用安装）
// npm instal babel-cli -g
// 本地安装 babel--preset-es2015
// npm install --save-dev babel-preset-es2015
// 项目根目录新建 .babelrc
/* 
{
    "presets":[
        "es2015"
    ],
    "plugins":[]
}
*/
// 开始转换
// babel src/index.js -o dist/index.js

// 详情可查看 ./05-ES6Demo 目录
