import _omit from 'lodash.omit';

export default function LabelReducer(
  state = {
    labels: {},
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
          title: 'label',
          startTime: 0,
          selectionList: {},
          endTime: state.duration,
        },
      },
    };
  }

  case 'DELETE_LABEL': {
    const id = payload;

    return {
      ...state,
      labels: _omit(state.labels, [id]),
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

  case 'ADD_SELECTION': {
    const { labelId, selectionId } = payload;

    const newSelection = {
      id: selectionId,
      start: 0,
      end: 0,
      opacityPath: null,
      transitionPath: null,
    };

    return {
      ...state,
      labels: {
        ...state.labels,
        [labelId]: {
          ...state.labels[labelId],
          selectionList: {
            ...state.labels[labelId].selectionList,
            [selectionId]: newSelection,
          },
        },
      },
    };
  }

  case 'DELETE_SELECTION': {
    const { selectionId, labelId } = payload;

    return {
      ...state,
      labels: {
        ...state.labels,
        [labelId]: {
          ...state.labels[labelId],
          selectionList: _omit(state.labels[labelId].selectionList, [selectionId]),
        },
      },
    };
  }

  case 'SET_LED_START': {
    const { labelId, selectionId, start } = payload;
    return {
      ...state,
      labels: {
        ...state.labels,
        [labelId]: {
          ...state.labels[labelId],
          selectionList: {
            ...state.labels[labelId].selectionList,
            [selectionId]: {
              ...state.labels[labelId].selectionList[selectionId],
              start,
            },
          },
        },
      },
    };
  }

  case 'SET_LED_END': {
    const { labelId, selectionId, end } = payload;
    return {
      ...state,
      labels: {
        ...state.labels,
        [labelId]: {
          ...state.labels[labelId],
          selectionList: {
            ...state.labels[labelId].selectionList,
            [selectionId]: {
              ...state.labels[labelId].selectionList[selectionId],
              end,
            },
          },
        },
      },
    };
  }

  case 'ADD_OPACITY_PATH': {
    const { labelId, selectionId } = payload;

    return {
      ...state,
      labels: {
        ...state.labels,
        [labelId]: {
          ...state.labels[labelId],
          selectionList: {
            ...state.labels[labelId].selectionList,
            [selectionId]: {
              ...state.labels[labelId].selectionList[selectionId],
              opacityPath: 'M0, 100 C0, 100 100, 0 100, 0 ',
            },
          },
        },
      },
    };
  }

  case 'SET_OPACITY_PATH': {
    const { labelId, selectionId, path } = payload;

    return {
      ...state,
      labels: {
        ...state.labels,
        [labelId]: {
          ...state.labels[labelId],
          selectionList: {
            ...state.labels[labelId].selectionList,
            [selectionId]: {
              ...state.labels[labelId].selectionList[selectionId],
              opacityPath: path,
            },
          },
        },
      },
    };
  }

  case 'SET_TRANSITION_PATH': {
    const { labelId, selectionId, path } = payload;

    return {
      ...state,
      labels: {
        ...state.labels,
        [labelId]: {
          ...state.labels[labelId],
          selectionList: {
            ...state.labels[labelId].selectionList,
            [selectionId]: {
              ...state.labels[labelId].selectionList[selectionId],
              transitionPath: path,
            },
          },
        },
      },
    };
  }

  case 'ADD_TRANSITION_PATH': {
    const { labelId, selectionId } = payload;

    return {
      ...state,
      labels: {
        ...state.labels,
        [labelId]: {
          ...state.labels[labelId],
          selectionList: {
            ...state.labels[labelId].selectionList,
            [selectionId]: {
              ...state.labels[labelId].selectionList[selectionId],
              transitionPath: 'M0, 100 C0, 100 100, 0 100, 0 ',
            },
          },
        },
      },
    };
  }

  case 'SET_LABEL_TITLE': {
    const { title, labelId } = payload;
    return {
      ...state,
      labels: {
        ...state.labels,
        [labelId]: {
          ...state.labels[labelId],
          title,
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
