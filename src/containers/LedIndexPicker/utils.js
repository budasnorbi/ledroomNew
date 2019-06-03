// eslint-disable-next-line import/prefer-default-export
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
