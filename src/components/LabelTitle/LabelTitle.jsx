/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
import LabelTitleTypes from './LabelTitle.types';

// Style
import style from './style';

const LabelTitle = ({
  handleTitleChanged,
}) => (
  <div css={style.margin}>
    <label className="label">
        Region title
      <input
        className="input"
        type="text"
        id="labelTitle"
        placeholder="Title of your label (optional)"
        onChange={handleTitleChanged}
      />
    </label>
  </div>
);

LabelTitle.propTypes = LabelTitleTypes;

export default LabelTitle;
