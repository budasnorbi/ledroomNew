import { number, string, func } from 'prop-types';

const LabelTimePickerTypes = {
  placeholder: string.isRequired,
  handleTimePicked: func.isRequired,
  value: number.isRequired,
};

export default LabelTimePickerTypes;
