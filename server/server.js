/* eslint-disable prefer-destructuring */
const http = require('http');
const path = require('svg-path-properties');
const rgbHex = require('rgb-hex');
const util = require('util');

const port = 5600;

const requestHandler = (request, response) => {
  if (request.url === '/startShow') {
    request.on('data', (chunk) => {
      formatData(JSON.parse(chunk));
    });
  }
};

const server = http.createServer(requestHandler);

/* server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
}); */


function formatData(data) {
  console.log(data);
  /* const { duration } = data;
  const { selectionList } = data.labels[0];
  const { opacityPath } = selectionList[0];
  const fps = 60;
  const frame = duration * fps;

  const pathObj = path.svgPathProperties(opacityPath);
  const arr = [];
  /* for (let i = 0; i < frame; i++) {
    arr.push(pathObj.getPointAtLength(i / frame * pathObj.getTotalLength()));
  } */

  // const color = convert.hex.lab(data.labels[0].selectionList[0].colorList[0]);
  /*
    Lényeg generálni kell egy baszott nagy tömböt mindegyik ledre megadni egy színt
    800 elemu tombot kell generalni amibe egy elem egy szin
  */
}

function getClosestNumber(array, val, dir) {
  for (let i = 0; i < array.length; i += 1) {
    if (dir === true) {
      if (array[i] >= val) {
        return array[i - 1] || 0;
      }
    } else if (array[i] >= val) {
      return array[i];
    }
  }
}


function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ] : null;
}

function generateData() {
  const data = JSON.parse(`{
    "labels":[
      {
        "id":0,
        "endTime":264.8468027210884,
        "startTime":0,
        "selectionList":[
          {
            "id":0,
            "start":0,
            "end":100,
            "opacityPath":"M0, 100 L100, 0",
            "transitionPath":"M0, 100 L100, 0",
            "colorList":["#ff0000","#0000ff"]
          }]
      }
    ],
    "duration":264.8468027210884
  }`);


  return data.labels.map(label => label.selectionList.map((selection) => {
    const colorList = selection.colorList.map(color => hexToRgb(color));

    const colorListLength = selection.colorList.length;
    const { startTime, endTime } = label;
    const fps = 60;
    const frame = (endTime - startTime) * fps;

    if (colorListLength >= 2) {
      // TRANSITION PATH
      const pathObj = path.svgPathProperties(selection.opacityPath);
      const yCoordinates = [];

      const colorScale = {};
      const colorScalePartUnit = 100 / (colorList.length - 1);

      for (let colorItemCount = 0; colorItemCount < colorList.length; colorItemCount += 1) {
        colorScale[colorScalePartUnit * colorItemCount] = colorList[colorItemCount];
      }

      for (let i = 0; i < frame; i += 1) {
        const { y } = pathObj.getPointAtLength(i / frame * pathObj.getTotalLength());
        yCoordinates.push(y.toFixed(4));
      }

      const colorScaleKeys = Object.keys(colorScale).map(x => parseInt(x));

      return yCoordinates.map((yCoordinate) => {
        const closestSmallKey = getClosestNumber(colorScaleKeys, yCoordinate, true);
        const closestHighKey = getClosestNumber(colorScaleKeys, yCoordinate, false);

        const pick = yCoordinate % colorScalePartUnit;

        const colorPct1 = pick / colorScalePartUnit;
        const colorPct2 = (colorScalePartUnit - pick) / colorScalePartUnit;

        const newColor1 = colorScale[closestHighKey].map(x => Math.floor(x * colorPct1));
        const newColor2 = colorScale[closestSmallKey].map(x => Math.floor(x * colorPct2));

        return rgbHex(
          newColor1[0] + newColor2[0],
          newColor1[1] + newColor2[1],
          newColor1[2] + newColor2[2],
        );
      });
    }
  }));
}

const WebSocket = require('ws');

const ws = new WebSocket('ws://192.168.1.30:81', ['ledRoom']);

const ad = generateData()[0][0].slice(0, 20).join();
const obj = { id: 0, data: ad };

ws.on('open', () => {
  ws.send('8=D');
});

ws.on('message', (data) => {
  console.log(data);
  if (data === 'Kutyaszar') {
    setTimeout(() => {
      ws.send(JSON.stringify(obj));
    }, 1000 / 60);
  }
});
