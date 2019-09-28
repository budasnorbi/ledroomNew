const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const corsConfig = {
  origin: [
    'http://localhost:3001',
  ],
};

app.use(cors(corsConfig));
app.use(express.json());

const port1 = new SerialPort('/dev/ttyACM0', {
  baudRate: 1000000,
});

const parser1 = new Readline();
port1.pipe(parser1);

const port2 = new SerialPort('/dev/ttyACM1', {
  baudRate: 1000000,
});

const parser2 = new Readline();
port2.pipe(parser2);

io.on('connection', (socket) => {
  console.log(`${new Date()} ledRoom connected`);

  socket.on('frameData', (frameData) => {
    port1.write(`${frameData.slice(511, 811).join('')}#`);
    port2.write(`${frameData.slice(0, 511).join('')}#`);
  });
});

http.listen(3000, () => {
  console.log('ledRomm Server listening on *:3000');
});
