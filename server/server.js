const express = require('express');
const app = express();
const cors = require('cors');
const port = 5600;

const corsConfig = {
  origin: [
    'http://localhost:3001',
  ],
}

app.use(cors(corsConfig));
app.use(express.json())


app.post('/startShow', (req, res) => {
  // console.log(req.body);
  res.send({
    canPlay: true,
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))