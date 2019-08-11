const path = require('svg-path-properties');
const rgbHex = require('rgb-hex');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

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

const payload = JSON.parse(`{
    "labels":[
      {
        "endTime":15,
        "startTime":0,
        "selectionList":[
          {
            "start":0,
            "end":811,
            "opacityPath":"M0, 0 C0, 0 100, 0 100, 0",
            "transitionPath":"M0, 100 C0, 100 100, 0 100, 0",
            "colorList":["#ff0000","#0000ff","#0FFF0F"]
          }]
      }
    ],
    "duration":264.8468027210884
  }`);


let currentFrame = 0;
const fps = 30;
const oneFrame = 1000 / fps;
const allFrame = Math.floor(payload.duration) * fps;

const port1 = new SerialPort('COM6', { baudRate: 1000000 });
const parser1 = new Readline();
port1.pipe(parser1);
parser1.on('data', line => console.log(line));

const port2 = new SerialPort('COM5', { baudRate: 1000000 });
const parser2 = new Readline();
port2.pipe(parser2);
parser2.on('data', line => console.log(line));

const loop = setInterval(function teszt() {
  if (currentFrame === allFrame) {
    clearInterval(loop);
    console.log('Song playing finished');
  }

  // console.log(`${currentFrame} / ${allFrame}`);

  const ledPool = new Array(811).fill('000000');

  payload.labels.forEach((label) => {
    // const startFrame = label.startTime * 60;
    const endFrame = label.endTime * fps;

    // Végigmegyünk minden szelekción
    label.selectionList.forEach(({
      colorList, transitionPath, opacityPath, start, end,
    }) => {
      const colorListRGB = colorList.map(color => hexToRgb(color));
      if (colorListRGB.length >= 2) {
        const opacityPoints = path.svgPathProperties(opacityPath);

        const opacityY = opacityPoints
          .getPointAtLength(currentFrame / endFrame * opacityPoints.getTotalLength()).y;

        


        const transitionPoints = path.svgPathProperties(transitionPath);

        const colorScale = {};
        const colorScalePartUnit = 100 / (colorListRGB.length - 1);

        for (let colorItemCount = 0; colorItemCount < colorListRGB.length; colorItemCount += 1) {
          colorScale[colorScalePartUnit * colorItemCount] = colorListRGB[colorItemCount];
        }
        /* ---------------------- */

        const transitionY = transitionPoints
          .getPointAtLength(currentFrame / endFrame * transitionPoints.getTotalLength()).y;

        const colorScaleKeys = Object.keys(colorScale).map(x => Number(x));


        const closestSmallKey = getClosestNumber(colorScaleKeys, transitionY, true);
        const closestHighKey = getClosestNumber(colorScaleKeys, transitionY, false);


        const pick = transitionY % colorScalePartUnit;

        const highNumberMultiler = pick / colorScalePartUnit;
        const smallNumberMultipler = (colorScalePartUnit - pick) / colorScalePartUnit;

        const highNumber = colorScale[closestHighKey]
          .map(colorPart => colorPart * highNumberMultiler);
        const smallNumber = colorScale[closestSmallKey]
          .map(colorPart => colorPart * smallNumberMultipler);

        const newColor = rgbHex(...[
          highNumber[0] + smallNumber[0],
          highNumber[1] + smallNumber[1],
          highNumber[2] + smallNumber[2],
        ].map(color => Math.round(color * ( opacityY / 100))));


        console.log([
          highNumber[0] + smallNumber[0],
          highNumber[1] + smallNumber[1],
          highNumber[2] + smallNumber[2],
        ].map(color => Math.round(color * ( opacityY / 100))))


        let currentLedIndex = start;
        const endLedIndex = end;

        for (currentLedIndex; currentLedIndex < endLedIndex; currentLedIndex += 1) {
          ledPool[currentLedIndex] = newColor;
        }
        
        port1.write(ledPool.slice(511, 811).join(''));
        port2.write(ledPool.slice(0, 511).join(''));
      }
    });
  });

  currentFrame += 1;
}, oneFrame);
