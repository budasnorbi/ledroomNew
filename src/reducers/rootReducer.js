import { combineReducers } from 'redux';
import WaveformStore from './WaveformReducer';

const rootReducer = combineReducers({
  WaveformStore,
});

export default rootReducer;
