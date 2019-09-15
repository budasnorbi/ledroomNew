
const path = require('svg-path-properties');
const rgbHex = require('rgb-hex');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const {
  hexToRgb,
  getClosestNumber,
} = require('./utils');


const createShow = (showData) => {
  const port1 = new SerialPort('/dev/ttyACM0', { baudRate: 1000000 });
  const parser1 = new Readline();
  port1.pipe(parser1);
  // parser1.on('data', line => console.log(line));

  const port2 = new SerialPort('/dev/ttyACM1', { baudRate: 1000000 });
  const parser2 = new Readline();
  port2.pipe(parser2);
  // parser2.on('data', line => console.log(line));

  let currentFrame = 0;
  const fps = 30;
  const oneFrame = 1000 / fps;
  const allFrame = Math.floor(showData.duration) * fps;

  const loop = setInterval(() => {
    if (currentFrame === allFrame) {
      clearInterval(loop);
      /* const fs = require('fs');
      fs.writeFile("text.txt", DATA.join('\r\n'), function(err) {
          if(err) {
              return csonsole.log(err);
          }

          console.log("The file was saved!");
      });
      console.log('Song playing finished'); */
    }

    const ledPool = new Array(811).fill('000000');

    showData.labels.forEach(({
      selectionList,
      startTime,
      endTime,
    }) => {
      const startFrame = startTime * fps;
      const endFrame = endTime * fps;

      if (!(currentFrame >= startFrame && currentFrame <= endFrame)) {
        return;
      }

      selectionList.forEach(({
        colorList, transitionPath, opacityPath, start, end,
      }) => {
        const colorListRGB = colorList;/* .map(color => hexToRgb(color)); */
        if (colorListRGB.length === 1) {
          // const opacityPoints = path.svgPathProperties(opacityPath);

          // const opacityY = 100 - opacityPoints.getPointAtLength(currentFrame / endFrame * opacityPoints.getTotalLength()).y;
        }
        if (colorListRGB.length >= 2) {
          const opacityPoints = path.svgPathProperties(opacityPath);

          const opacityY = 100 - opacityPoints
            .getPointAtLength(currentFrame / endFrame * opacityPoints.getTotalLength()).y;

          const transitionPoints = path.svgPathProperties(transitionPath);

          const colorScale = {};
          const colorScalePartUnit = 100 / (colorListRGB.length - 1);

          for (let colorItemCount = 0; colorItemCount < colorListRGB.length; colorItemCount += 1) {
            colorScale[colorScalePartUnit * colorItemCount] = colorListRGB[colorItemCount];
          }
          /* ---------------------- */

          const transitionY = 100 - transitionPoints
            .getPointAtLength(currentFrame / endFrame * transitionPoints.getTotalLength()).y;

          const colorScaleKeys = Object.keys(colorScale).map(x => Number(x));


          const closestSmallKey = getClosestNumber(colorScaleKeys, transitionY, true);
          const closestHighKey = getClosestNumber(colorScaleKeys, transitionY, false);


          const pick = transitionY % colorScalePartUnit;

          let newColor;
          if (pick !== 0) {
            const highNumberMultiler = pick / colorScalePartUnit;
            const smallNumberMultipler = (colorScalePartUnit - pick) / colorScalePartUnit;

            const highNumber = colorScale[closestHighKey]
              .map(colorPart => colorPart * highNumberMultiler);
            const smallNumber = colorScale[closestSmallKey]
              .map(colorPart => colorPart * smallNumberMultipler);

            newColor = rgbHex(...[
              highNumber[0] + smallNumber[0],
              highNumber[1] + smallNumber[1],
              highNumber[2] + smallNumber[2],
            ].map(color => Math.round(color * (opacityY / 100))));
          } else {
            newColor = rgbHex(...colorScale[closestHighKey]
              .map(color => Math.round(color * (opacityY / 100))));
          }

          let currentLedIndex = start;
          const endLedIndex = end;

          for (currentLedIndex; currentLedIndex < endLedIndex; currentLedIndex += 1) {
            ledPool[currentLedIndex] = newColor;
          }

          console.log(`FRAME: ${currentFrame} / ${allFrame}`);
          // console.log(hexToRgb(newColor))
          port1.write(`${ledPool.slice(511, 811).join('')}#`);
          port2.write(`${ledPool.slice(0, 511).join('')}#`);
          // DATA.push(newColor);
        }
      });
    });

    currentFrame += 1;
  }, oneFrame);
};

module.exports = {
  createShow,
};
