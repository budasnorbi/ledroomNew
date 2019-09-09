// eslint-disable-next-line import/prefer-default-export
export const getCoordinate = (pointType, axis, type, index, offset, size) => {
  let coordinate;

  if (pointType === 'start') {
    if (axis === type) {
      coordinate = offset + (index * size);
    } else {
      coordinate = offset;
    }
  }

  if (pointType === 'end') {
    if (axis === type) {
      coordinate = offset - (index * size);
    } else {
      coordinate = offset;
    }
  }

  return coordinate;
};
