// eslint-disable-next-line import/prefer-default-export
export const getCoordinate = (axis, type, index, offset, size) => (
  axis === type
    ? offset + index * size
    : offset
);
