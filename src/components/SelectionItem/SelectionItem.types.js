import { number, bool, array } from 'prop-types';

const SelectionItemTypes = {
  id: number.isRequired,
  start: number.isRequired,
  end: number.isRequired,
  isLocked: bool.isRequired,
  colorlist: array.isRequired,
};

export default SelectionItemTypes;
