const express = require('express');

const app = express();
const cors = require('cors');

const port = 5600;

const {
  createShow,
} = require('./parser');

const corsConfig = {
  origin: [
    '*',
  ],
};

app.use(cors(corsConfig));
app.use(express.json());


app.post('/startShow', (req, res) => {
  console.log(req.body);
  // res.send(JSON.stringify({ 0: 1 }));
  res.send();
  createShow(req.body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
