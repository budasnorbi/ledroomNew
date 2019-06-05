export const getZoomPos = (stage, deltaY) => {
  const oldScale = stage.scaleX();

  const mousePointTo = {
    x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
    y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
  };

  const newScale = deltaY < 0 ? oldScale * 1.25 : oldScale / 1.25;

  stage.scale({ x: newScale, y: newScale });

  return {
    x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
    y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
  };
};

export const colorizeRange = ({ start, end }, shapeList, color) => {
  if (Number.isInteger(start) && Number.isInteger(end)) {
    // For ranges
    if (start > end) {
      for (let shapeIndex = end; shapeIndex < start + 1; shapeIndex += 1) {
        shapeList[shapeIndex].fill(color);
      }
    } else {
      for (let shapeIndex = start; shapeIndex < end + 1; shapeIndex += 1) {
        shapeList[shapeIndex].fill(color);
      }
    }

    return;
  }

  if (Number.isInteger(start) && end === null) {
    shapeList[start].fill(color);
  }
};

export const getScaleCoords = (shapeList, width, height) => {
  const coords = Object.values(shapeList.map(({ attrs: { x, y } }) => ({ x, y })));

  const mostFarX = coords.sort((a, b) => b.x - a.x)[0].x;
  const mostFarY = coords.sort((a, b) => b.y - a.y)[0].y;

  return {
    x: 0.98 / (mostFarX / width),
    y: 0.98 / (mostFarY / height),
    mostFarX,
    mostFarY,
  };
};

export const setRoomScale = (canvas) => {
  const { width, height } = canvas.getContainer().getBoundingClientRect();
  console.log(width, height);
  // Set the canvas size of it parent size
  canvas.width(width);
  canvas.height(height);

  const { x } = getScaleCoords(canvas.children[0].children, width, height);
  canvas.scaleX(x);
  canvas.scaleY(x);
};
