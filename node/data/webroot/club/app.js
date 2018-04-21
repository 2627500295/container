
/*------------------------------------------------------------------------------
 *   node.js starter application for Bluemix
 *------------------------------------------------------------------------------*/
var express = require('express'),
    http    = require('http'),
    path    = require('path'),
    routes  = require('./route');

// 实例化
var app = express();

// 定义主机 & 端口
var PORT = (process.env.PORT || 3000);
var HOST = (process.env.HOST || '0.0.0.0');

// 模板引擎
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.set("view cache", true);

// 静态服务器
app.use(express.static(__dirname + '/public'));

// 创建服务
http.createServer(app).listen(3000, '0.0.0.0', function() {
    console.log(                          "\n"   +
        "    Code by Microld "          + "\n\n" +
        "    SERVER "     + ""          + "\n"   +
        "        HOST : " + HOST        + "\n"   +
        "        PORT : " + PORT        + "\n"   );
});

// 应用路由
routes(app);