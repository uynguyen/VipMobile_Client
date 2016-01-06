var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

var app = express();

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

//
// app.use(function (req, res, next) {
//     console.log('redirect to https');
//       var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
//       if (schema === 'https') {
//         next();
//       } else {
//         res.redirect('https://' + req.headers.host + req.url);
//       }
//     });


// Routes
app.get('/', function(req, res) {
    res.sendFile('index.html');
});



var getNumberPeople = function() {
    var num = 0;
    for (var key in listNumberPeople) {
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
