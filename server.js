var express     = require('express'),
    bodyParser      = require('body-parser'),
    cors        = require('cors');



var app         = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/app'));

// Routes
app.get('/status', function (req, res)
{
  res.send("{status: 'ok'}");
});

app.get('/', function (req, res)
{
  res.sendFile('index.html');
});



var port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    host = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

if (host == '127.0.0.1') port = 9000;

app.listen(port, host, function () {
  console.log( "Listening on " + host  + ", port " + port );
});
