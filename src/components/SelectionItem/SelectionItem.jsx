import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
import { connect } from 'react-redux';
import types from './SelectionItem.types';

// Style
import style from './SelectionItem.style';

import { mapStateToProps } from './SelectionItem.redux';

import ColorButton from '../ColorButton/ColorButton';


// localUtil
// import util from './SelectionItem.util';

// globalUtil
// import gUtil from '../../util';

const SelectionItem = ({
  // Came from props
  id,
  // Came from redux
  start,
  end,
  colorlist,
  isLocked,

  // Events
  deleteSelection,
  updateLedStart,
  updateLedEnd,
  addColor,
}) => (
  <li css={style.item}>
    <div>
      <div css={style.rangeContainer}>
        <div css={style.inputWidth} className="control">
          <input
            css={style.ledInput}
            className="input"
            type="text"
            placeholder="start"
            defaultValue={start}
            onChange={e => updateLedStart(e.target.value, id)}
          />
        </div>
        <span css={style.dash}> - </span>
        <div css={style.inputWidth} className="control">
          <input
            css={style.ledInput}
            className="input"
            type="text"
            placeholder="end"
            defaultValue={end}
            onChange={e => updateLedEnd(e.target.value, id)}
          />
        </div>
      </div>

      <div css={style.colorContainer}>
        <button
          type="button"
          className="button"
          css={style.colorAdd}
          onClick={() => addColor(id)}
        >
          <span className="icon is-small">
            <i className="ion ion-md-add" />
          </span>
          &nbsp;
          color
        </button>
        {colorlist.map(color => (
          <ColorButton key={color} color={color} />
        ))}
      </div>
    </div>

    <div css={style.optionContainer}>
      <button
        type="button"
        className="button"
        css={style.optionButton}
        disabled={isLocked}
      >
        <span css={style.option} className="icon">
          <i className="ion ion-md-lock" />
        </span>
      </button>

      <button
        type="button"
        className="button"
        css={style.optionButton}
        onClick={() => deleteSelection(id)}
      >
        <span css={style.option} className="icon">
          <i className="ion ion-md-trash" />
        </span>
      </button>
    </div>

  </li>
);

SelectionItem.propTypes = types;

export default connect(
  mapStateToProps,
  null,
)(SelectionItem);
