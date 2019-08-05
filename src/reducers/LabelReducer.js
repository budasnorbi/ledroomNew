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
          startTime: 0,
          selectionList: {},
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

  case 'ADD_SELECTION': {
    const { labelId, selectionId } = payload;

    const newSelection = {
      id: selectionId,
      start: 0,
      end: 0,
      /* colorlistId: `${labelId}-${selectionId}`, */
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
              opacityPath: 'M0, 100 L100, 0',
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
              transitionPath: 'M0, 100 L100, 0',
            },
          },
        },
      },
    };
  }

  /* case 'ADD_COLOR': {
    const { labelId, selectionId } = payload;

    const colorListLength = state.labels[labelId].selectionList[selectionId].colorlist.length;
    const color = colorListLength === 0 ? '#000000' : state.labels[labelId]
      .selectionList[selectionId]
      .colorlist[colorListLength - 1];

    const opacityPath = colorListLength === 0 && 'M0, 100 L100, 0';
    const transitionPath = colorListLength === 1 && 'M0, 100 L100, 0';

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
              colorlist: [
                ...state.labels[labelId].selectionList[selectionId].colorlist,
                color,
              ],
            },
          },
        },
      },
    };
  } */

  /* case 'SET_COLOR': {
    const {
      color,
      labelId,
      selectionId,
      colorIndex,
    } = payload;

    const newColorList = [...state.labels[labelId].selectionList[selectionId].colorlist];
    newColorList[colorIndex] = color;

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
              colorlist: newColorList,
            },
          },
        },
      },
    };
  } */

  /* case 'DELETE_COLOR': {
    const {
      labelId,
      selectionId,
      colorIndex,
    } = payload;

    const newColorList = [...state.labels[labelId].selectionList[selectionId].colorlist];
    newColorList.splice(colorIndex, 1);

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
              colorlist: newColorList,
            },
          },
        },
      },
    };
  } */

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
