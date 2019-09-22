const audio = document.getElementById('audio');

const fps = 30;
const allFrame = Math.floor(store.LabelStore.duration) * fps;

const defaultPool = new Array(811).fill('000000');
let svgPathList;

let currentFrame = 0;
let loop;

// Should format the store a bit
store.LabelStore.labels = Object.values(store.LabelStore.labels);
store.LabelStore.labels = store.LabelStore.labels.map((label) => {
  label.selectionList = Object.values(label.selectionList);

  return label;
});


audio.addEventListener('playing', (event) => {
  // Get the current frame
  const { currentTime } = event.target;
  currentFrame = Math.round(currentTime / (1 / fps));

  // Get all the svg objects from the function graph
  svgPathList = getSvgPath(store.LabelStore.labels);

  loop = setInterval(() => {
    if (currentFrame === allFrame) {
      clearInterval(loop);
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
        }
      }
    }

    currentFrame += 1;
  }, 1000 / fps);
});

audio.addEventListener('pause', (event) => {
  clearInterval(loop);
});
