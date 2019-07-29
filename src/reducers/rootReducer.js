import { combineReducers } from 'redux';
import WaveformStore from './WaveformReducer';
import LabelStore from './LabelReducer';
import ColorPickerStore from './ColorPickerReducer';

const rootReducer = combineReducers({
  WaveformStore,
  LabelStore,
  ColorPickerStore,
});

export default rootReducer;
