/* eslint-disable prefer-destructuring */
const path = require('svg-path-properties');
const rgbHex = require('rgb-hex');
const _ = require('lodash');

const getClosestNumber = (array, val, dir) => {
  for (let i = 0; i < array.length; i += 1) {
    if (dir === true) {
      if (array[i] >= val) {
        return array[i - 1] || 0;
      }
    } else if (array[i] >= val) {
      return array[i];
    }
  }
};


const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ] : null;
};

function generateData() {
  const data = JSON.parse(`{
    "labels":[
      {
        "id":0,
        "endTime":15,
        "startTime":0,
        "selectionList":[
          {
            "id":0,
            "start":0,
            "end":100,
            "opacityPath":"M0, 100 L100, 0",
            "transitionPath":"M0, 100 L100, 0",
            "colorList":["#ff0000","#0000ff","#0FFF0F"]
          }]
      }
    ],
    "duration":264.8468027210884
  }`);


  return data.labels.map((label) => {
    const selectionList = label.selectionList.map((selection) => {
      const colorList = selection.colorList.map(color => hexToRgb(color));

      const colorListLength = selection.colorList.length;
      const { startTime, endTime } = label;
      const fps = 60;
      const frame = (endTime - startTime) * fps;

      if (colorListLength >= 2) {
        const opacityPoints = path.svgPathProperties(selection.transitionPath);
        const opacityYList = [];

        for (let i = 0; i < frame; i += 1) {
          const { y } = opacityPoints.getPointAtLength(i / frame * opacityPoints.getTotalLength());
          opacityYList.push(y);
        }

        // TRANSITION PATH & OPACITY PATH
        const transitionPoints = path.svgPathProperties(selection.transitionPath);
        const transitionYList = [];

        const colorScale = {};
        const colorScalePartUnit = 100 / (colorList.length - 1);

        for (let colorItemCount = 0; colorItemCount < colorList.length; colorItemCount += 1) {
          colorScale[colorScalePartUnit * colorItemCount] = colorList[colorItemCount];
        }

        for (let i = 0; i < frame; i += 1) {
          const { y } = transitionPoints
            .getPointAtLength(i / frame * transitionPoints.getTotalLength());
          transitionYList.push(y);
        }

        const colorScaleKeys = Object.keys(colorScale).map(x => Number(x));

        const colorWithTransitionAndOpacity = transitionYList.map((yCoordinate, index) => {
          const closestSmallKey = getClosestNumber(colorScaleKeys, yCoordinate, true);
          const closestHighKey = getClosestNumber(colorScaleKeys, yCoordinate, false);

          const pick = yCoordinate % colorScalePartUnit;

          const highNumberMultiler = pick / colorScalePartUnit;
          const smallNumberMultipler = (colorScalePartUnit - pick) / colorScalePartUnit;

          const highNumber = colorScale[closestHighKey]
            .map(colorPart => colorPart * highNumberMultiler);
          const smallNumber = colorScale[closestSmallKey]
            .map(colorPart => colorPart * smallNumberMultipler);

          const newColor = [
            highNumber[0] + smallNumber[0],
            highNumber[1] + smallNumber[1],
            highNumber[2] + smallNumber[2],
          ].map(color => Math.round(color * (transitionYList[index] / 100)));

          return rgbHex(...newColor);
        });

        return {
          id: selection.id,
          start: selection.start,
          end: selection.end,
          colors: colorWithTransitionAndOpacity,
        };
      }
    });

    return {
      startTime: label.startTime * 60,
      endTime: label.endTime * 60,
      id: label.id,
      selectionList,
    };
  });
}

const data = generateData();

const frame = Math.floor(264.8468027210884) * 60;
const ledPool = new Array(frame)
  .fill(new Array(811));

/* [
    [811 elem],
    [811 elem],
    [811 elem]
  ]
*/
/*
data.forEach((label) => {
  let currentFrame = label.startTime;
  const endFrame = label.endIndex;

  label.selectionList.forEach((selection) => {
    let currentLed = selection.start;
    const endLed = selection.end;

    for (currentFrame; currentFrame < endFrame; currentFrame += 1) {
      for (currentLed; currentLed < endLed; currentLed += 1) {
        ledPool[currentFrame][currentLed] = selection.colors[currentLed];
      }
    }
  });
}); */


const fs = require('fs');

fs.writeFile('data.json', JSON.stringify(ledPool), (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('The file was saved!');
});

/*
const WebSocket = require('ws');

const ws = new WebSocket('ws://192.168.1.30:81', ['ledRoom']);
const obj = {
  id: 0,
  data: generateData()[0][0].slice(0, 511),
};

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
*/
