var express = require('express');
var nunjucks = require('nunjucks');

var app = express();

// app.engine('server.view.html', swig.renderFile);
// app.set('view engine', 'server.view.html');
// app.set('views', './server/views');
// app.use(express.static(path.join(__dirname, 'views')));

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

// var s = env.render('index.html', { name: '小明' });
// console.log(s);

nunjucks.configure('./views', {
    autoescape: true,
    express: app,
    // noCache: false
});

app.get('/', function(req, res) {
    res.render('index.html',{name: 'xiaoming'});
});

var server = app.listen('4000',function(){
	var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


