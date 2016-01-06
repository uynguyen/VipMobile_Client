var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
    saveUninitialized: true,
    resave: true}));
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
var listNumberPeople = {};


var http = require('http').Server(app);
var io = require('socket.io')(http);

var listNumberPeople = {};

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/app'));


// Routes
app.get('/', function(req, res) {
    res.sendFile('index.html');
});
var user = require('./routers/users');
app.use('/users', user);


var getNumberPeople = function(){
	var num = 0;
	for(var key in listNumberPeople)
	{
		num += listNumberPeople[key];
	}
	return num;
};
io.on('connection', function(socket) {

    console.log(socket.id + ' connected');

    socket.on('watch product', function(obj) {
        if (obj.type == 'watch') {
            if (listNumberPeople[obj.product_id] == null) {
                listNumberPeople[obj.product_id] = 1;
            } else {
                listNumberPeople[obj.product_id] += 1;
            }
        } else {
            if (listNumberPeople[obj.product_id] != null) {
                listNumberPeople[obj.product_id] -= 1;
                if (listNumberPeople[obj.product_id] < 0)
                    listNumberPeople[obj.product_id] = 0;
            }
        }
        console.log('There are ' + listNumberPeople[obj.product_id] + ' people watching product ' + obj.product_id);
        io.emit('watch product', {
            product_id: obj.product_id,
            number: listNumberPeople[obj.product_id]
        });
    });



    socket.on('disconnect', function() {
        console.log(socket.id + ' disconnected');
    });

});


var port = process.env.OPENSHIFT_NODEJS_PORT,
    host = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

if (host == '127.0.0.1') port = 9000;

http.listen(port, host, function() {
    console.log("Listening on " + host + ", port " + port);
});
