import { number, array } from 'prop-types';

const SelectionItemTypes = {
  id: number.isRequired,
  start: number.isRequired,
  end: number.isRequired,
  colorlist: array.isRequired,
};

export default SelectionItemTypes;
