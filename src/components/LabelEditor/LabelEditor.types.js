import { func, number } from 'prop-types';

const LabelEditorTypes = {
  addSelection: func.isRequired,
  deleteSelection: func.isRequired,
  labelId: number.isRequired,
  setLedStart: func.isRequired,
  setLedEnd: func.isRequired,
};

export default LabelEditorTypes;
