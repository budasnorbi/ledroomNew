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
  yOffset,
  xOffset,
  addToShapeList,
  handleLedClick,
  pointType,
}) => new Array(ledCount)
  .fill()
  .map((x, ledIndex) => (
    <Rect
      x={getCoordinate(pointType, 'x', type, ledIndex, xOffset, 10)}
      y={getCoordinate(pointType, 'y', type, ledIndex, yOffset, 10)}
      width={10}
      height={10}
      stroke="#ffffff"
      strokeWidth={0.5}
      key={`${(type + xOffset) + ledIndex}`}
      ref={ref => addToShapeList(ref)}
      index={ledIndex}
      onClick={handleLedClick}
    />
  ));
LedRow.propTypes = LedRowTypes;

export default LedRow;
