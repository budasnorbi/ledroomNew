import {svgPathProperties} from 'svg-path-properties';
import rgbToHex from 'rgb-hex';

export const initWavesurfer = ({
  container,
  surferInstance,
  updateSongPlaying,
}) => {
  let zoomValue = 0;

  // Zooming in timeline
  container.addEventListener('wheel', (e) => {
    const zoomSign = Math.sign(e.deltaY);

    if (zoomSign === -1) {
      // Zoomolás be
      zoomValue += 20;
      surferInstance.zoom(zoomValue);
    }

    if (zoomSign === 1) {
      // Zoomolás ki
      zoomValue -= 20;
      surferInstance.zoom(zoomValue);
    }
  });

  // After the song is finished we need restore the play button to default state
  surferInstance.on('finish', updateSongPlaying);
};

export const fps = 30;
let allFrame;

const defaultPool = new Array(811).fill('000000');
export let svgPathList;

let currentFrame = 0;
export let parserId;

export const getParserId = () => parserId;
export const setCurrentFrame = (frame) => currentFrame = frame;

export const setSvgPath = labels => {
  svgPathList = labels.reduce((accumlator, label) => {
    const selectionListSvgPaths = label.selectionList.reduce((_accumlator, selectionItem) => {
      if (selectionItem.opacityPath) {
        _accumlator[`${label.id}-${selectionItem.id}-o`] = svgPathProperties(selectionItem.opacityPath);
      }

      if (selectionItem.transitionPath) {
        _accumlator[`${label.id}-${selectionItem.id}-t`] = svgPathProperties(selectionItem.transitionPath);
      }

      return _accumlator;
    }, {});

    return { ...accumlator, ...selectionListSvgPaths };
  }, {});
};

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

export const startParser = (store, fn) => {
  store = JSON.parse(JSON.stringify(store));
  store.LabelStore.labels = Object.values(store.LabelStore.labels);
  store.LabelStore.labels = store.LabelStore.labels.map((label) => {
    label.selectionList = Object.values(label.selectionList);

    return label;
  });

  allFrame = Math.floor(store.LabelStore.duration) * fps;

  setSvgPath(store.LabelStore.labels);
  parserId = setInterval(() => {
    if (currentFrame === allFrame) {
      clearInterval(parserId);
    }

    const ledPool = [...defaultPool];

    for (let labelIndex = 0; labelIndex < store.LabelStore.labels.length; labelIndex += 1) {
      const label = store.LabelStore.labels[labelIndex];

      const startFrame = label.startTime * fps;
      const endFrame = label.endTime * fps;

      // if the current frame is out of the label timeline, we should skip to continous calculations
      // also error first thinking :)
      if (!(currentFrame >= startFrame && currentFrame <= endFrame)) {
        continue;
      }

      // we are in the selected label
      for (let selectionIndex = 0; selectionIndex < label.selectionList.length; selectionIndex += 1) {
        const selection = label.selectionList[selectionIndex];
        const colorList = store.ColorStore[`${label.id}-${selection.id}`];
        const { start, end } = selection;

        if (colorList.length === 1) {
          // Only opacity curve is avaible
          const opacityPoints = svgPathList[`${label.id}-${selection.id}-o`];

          const opacityY = 100 - opacityPoints
            .getPointAtLength(currentFrame / endFrame * opacityPoints.getTotalLength()).y;

          const newColor = rgbToHex(...colorList[0]
            .map(color => Math.round(color * (opacityY / 100))));

          let currentLedIndex = start;
          const endLedIndex = end;

          for (currentLedIndex; currentLedIndex < endLedIndex; currentLedIndex += 1) {
            ledPool[currentLedIndex] = newColor;
          }

          fn(ledPool)
        }

        if (colorList.length > 1) {
          // Both opacity and transition curve are avaible
          const opacityPoints = svgPathList[`${label.id}-${selection.id}-o`];
          const transitionPoints = svgPathList[`${label.id}-${selection.id}-t`];

          const opacityY = 100 - opacityPoints
            .getPointAtLength(currentFrame / endFrame * opacityPoints.getTotalLength()).y;

          const colorScale = {};
          const colorScalePartUnit = 100 / (colorList.length - 1);

          for (let colorItemCount = 0; colorItemCount < colorList.length; colorItemCount += 1) {
            colorScale[colorScalePartUnit * colorItemCount] = colorList[colorItemCount];
          }

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

            newColor = rgbToHex(...[
              highNumber[0] + smallNumber[0],
              highNumber[1] + smallNumber[1],
              highNumber[2] + smallNumber[2],
            ].map(color => Math.round(color * (opacityY / 100))));
          } else {
            newColor = rgbToHex(...colorScale[closestHighKey]
              .map(color => Math.round(color * (opacityY / 100))));
          }

          let currentLedIndex = start;
          const endLedIndex = end;

          for (currentLedIndex; currentLedIndex < endLedIndex; currentLedIndex += 1) {
            ledPool[currentLedIndex] = newColor;
          }

          fn(ledPool)
        }
      }
    }

    currentFrame += 1;
  }, 1000 / fps);
}






