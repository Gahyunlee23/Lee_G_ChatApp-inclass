var express = require('express');
var app = express();

const io = require('socket.io')();
// instantiate the socket.io 

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// this is all of our socket.io messaging functionality

// attach socket.io
io.attach(server);

io.on('connection', function(socket) {
    console.log('user conencted');
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'});

    // listen for an incoming mesage from a user (socket refers to an individual user)
    // msg is the incoming message form that user
    socket.on('chat_message', function(msg) {
        console.log(msg);

        // when we get a new message, ssend it to everyone so they see it
        // io is the switchboard operator, making sure everyone who's connected
        // gets the messages

        io.emit('new_message', { id: socket.id, message: msg })
    })

    //listen for a disconnect event
    socket.on('disconnect', function() {
        console.log('a user disconnected');

        message = `${socket.id} has left the chat!`;
        io.emit('user_disconeect', message);
    })
})
