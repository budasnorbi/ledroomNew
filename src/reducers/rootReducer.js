import { combineReducers } from 'redux';
import WaveformStore from './WaveformReducer';
import LabelStore from './LabelReducer';
import ColorPickerStore from './ColorPickerReducer';
import UiStore from './UiReducer';

const rootReducer = combineReducers({
  WaveformStore,
  LabelStore,
  ColorPickerStore,
  UiStore,
});

export default rootReducer;
