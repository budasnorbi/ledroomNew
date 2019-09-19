const getSvgPath = labels => labels.reduce((accumlator, label) => {
  const selectionListSvgPaths = label.selectionList.reduce((_accumlator, selectionItem) => {
    if (selectionItem.opacityPath) {
      _accumlator[`${label.id}-${selectionItem.id}-o`] = spp.svgPathProperties(selectionItem.opacityPath);
    }

    if (selectionItem.transitionPath) {
      _accumlator[`${label.id}-${selectionItem.id}-t`] = spp.svgPathProperties(selectionItem.transitionPath);
    }

    return _accumlator;
  }, {});

  return { ...accumlator, ...selectionListSvgPaths };
}, {});

const getClosestNumber = (array, val, dir) => {
  for (let i = 0; i < array.length; i += 1) {
    if (dir === true) {
      if (array[i] >= val) {
        return array[i - 1] || 0;
      }
    } else if (array[i] >= val) {
      return array[i];
    }
  }
};
