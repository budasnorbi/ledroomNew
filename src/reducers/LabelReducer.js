import _omit from 'lodash.omit';

export default function LabelReducer(
  state = {
    labels: {
      [-1]: {
        id: -1,
        startTime: null,
        endTime: null,
        opacityCurvePath: null,
        pickedColors: null,
        startLedIndex: null,
        endLedIndex: null,
        hasRange: null,
      },
    },
    selectedLabelId: -1,
    duration: -1,
  },
  { payload, type },
) {
  switch (type) {
  case 'ADD_LABEL': {
    const newLabel = payload;

    return {
      ...state,
      labels: {
        ...state.labels,
        [newLabel.id]: {
          ...newLabel,
          endTime: state.duration,
        },
      },
      selectedLabelId: newLabel.id,
    };
  }

  case 'DELETE_LABEL': {
    const id = payload;

    return {
      ...state,
      labels: _omit(state.labels, [id]),
      selectedLabelId: -1,
    };
  }

  case 'SET_LABEL_DURATION': {
    const { id, start, end } = payload;
    return {
      ...state,
      labels: {
        ...state.labels,
        [id]: {
          ...state.labels[id],
          endTime: end,
          startTime: start,
        },
      },
    };
  }

  case 'SET_SONG_DURATION': {
    return {
      ...state,
      duration: payload,
    };
  }
  default:
    return state;
  }
}
