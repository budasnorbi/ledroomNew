import { combineReducers } from 'redux';
import WaveformStore from './WaveformReducer';
import LabelStore from './LabelReducer';
import ColorStore from './ColorReducer';
import UiStore from './UiReducer';

const rootReducer = combineReducers({
  WaveformStore,
  LabelStore,
  ColorStore,
  UiStore,
});

export default rootReducer;
