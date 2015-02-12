var express = require( 'express' );
var morgan = require('morgan');
var swig = require('swig');

var app = express();

app.use(morgan('dev'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ cache: false });

app.listen( 3000, function(){
	console.log('server listening');
});

app.get('/', function(req, res){
	var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	res.render( 'index', {title: 'Hall of Fame', people: people} );
});

app.get('/*', function(req, res){
	res.send('Not a path');
});
