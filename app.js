var express = require( 'express' );
var socketio = require('socket.io');
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes/');

var app = express();

app.use( '/', routes(io));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ cache: false });

var server = app.listen( 3000, function(){
	console.log('server listening');
});
var io = socketio.listen(server);