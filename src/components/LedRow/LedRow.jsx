import React from 'react';
import { Rect } from 'react-konva';

// PropTypes
import LedRowTypes from './LedRow.types';

// Utils
import { getCoordinate } from './utils';

// Style
// import style from './style';

const LedRow = ({
  type,
  ledCount,
  ledSize,
  yOffset,
  xOffset,
  addToShapeList,
}) => new Array(ledCount)
  .fill()
  .map((x, ledIndex) => (
    <Rect
      x={getCoordinate('x', type, ledIndex, xOffset, ledSize)}
      y={getCoordinate('y', type, ledIndex, yOffset, ledSize)}
      width={ledSize}
      height={ledSize}
      fill="red"
      ref={ref => addToShapeList(ref)}
      key={`${(type + xOffset) + ledIndex}`}
    />
  ));
LedRow.propTypes = LedRowTypes;

export default LedRow;
