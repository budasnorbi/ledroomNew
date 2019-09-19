import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
// import types from './LabelList.types';

// Style
import style from './LabelList.style';

// localUtil
// import util from './LabelList.util';

// globalUtil
// import gUtil from '../../util';

const LabelList = ({
  labelId,
  labelIds,
  addLabel,
  deleteLabel,
  selectLabel,
  labelTitleList,
}) => (
  <>
    <h1 className="title is-6" css={style.heading}>Labels</h1>
    <div css={style.buttonsContainer}>
      <button
        type="button"
        className="button is-dark"
        css={style.addLabel}
        onClick={addLabel}
      >
        <span className="icon is-small">
          <i className="ion-md-add" />
        </span>
      </button>
      <button
        type="button"
        className="button is-dark"
        css={style.deleteLabel}
        onClick={deleteLabel}
        disabled={labelIds.length === 0}
      >
        <span className="icon is-small">
          <i className="ion-md-remove" />
        </span>
      </button>
    </div>
    {labelIds.map((label, index) => (
      <button
        key={label}
        type="button"
        className="button is-dark"
        css={[
          style.labelButton,
          label === labelId ? style.selectedLabel : null,
        ]}
        data-selection={label}
        onClick={() => selectLabel(label)}
      >
        {labelTitleList[index]}
      </button>
    ))}
  </>
);

// LabelList.propTypes = types;

export default LabelList;
