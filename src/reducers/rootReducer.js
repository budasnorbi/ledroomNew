import { combineReducers } from 'redux';
import WaveformStore from './WaveformReducer';
import LabelStore from './LabelReducer';

const rootReducer = combineReducers({
  WaveformStore,
  LabelStore,
});

export default rootReducer;
