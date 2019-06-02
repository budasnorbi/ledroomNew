import { number, string, func } from 'prop-types';

const LedRowTypes = {
  type: string.isRequired,
  ledCount: number.isRequired,
  ledSize: number.isRequired,
  yOffset: number.isRequired,
  xOffset: number.isRequired,
  addToShapeList: func.isRequired,
};

export default LedRowTypes;
