import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
import types from './SelectionAdd.types';

// Style
import style from './SelectionAdd.style';

// localUtil
// import util from './SelectionAdd.util';

// globalUtil
// import gUtil from '../../util';

const SelectionAdd = ({
  addSelection,
}) => (
  <button
    type="button"
    css={style.selectionAdd}
    className="button is-dark"
    onClick={addSelection}
  >
    <span className="icon is-small">
      <i className="ion-md-add" />
    </span>
  &nbsp;
  Add selection
  </button>
);

SelectionAdd.propTypes = types;

export default SelectionAdd;
