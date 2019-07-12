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
      labels: addLabel(state.labels),
    };
  }

  default:
    return state;
  }
}
