const express = require('express');
const app = express();
var http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');

const corsConfig = {
  origin: [
    'http://localhost:3001',
  ],
}

app.use(cors(corsConfig));
app.use(express.json())

io.on('connection', function (socket) {
  console.log(new Date() + ' ledRoom connected');
  
  socket.on('frameData', frameData =>{
    console.log(frameData);
  })
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});