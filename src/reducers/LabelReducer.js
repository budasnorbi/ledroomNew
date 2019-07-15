import { addLabel } from './transformations/LabelReducerTransformation';

export default function LabelReducer(
  state = {
    labels: [],
  },
  { payload, type },
) {
  switch (type) {
  case 'ADD_LABEL': {
    return {
      ...state,
      labels: addLabel(state),
      selectedLabelIndex: state.labels.length + 1,
    };
  }

  case 'SET_DURATION': {
    return {
      ...state,
      duration: payload,
    };
  }

  case 'SET_SELECTED_LABEL_INDEX': {
    return {
      ...state,
      selectedLabelIndex: payload,
    };
  }

  default:
    return state;
  }
}
