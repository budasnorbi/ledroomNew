/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import { jsx } from '@emotion/core';

// Antd design
import { InputNumber } from 'antd';

// PropTypes
import LabelLedIndexTypes from './LabelLedIndex.types';

// Style
import style from './style';

const LabelLedIndex = ({
  type,
}) => (
  <div css={[style.flexGrow, style.labelLedMargin]}>
    <label className="label">
      { type }
      {' '}
      LED index
      <InputNumber css={style.ledIndexInput} min={1} max={10} defaultValue={3} />
    </label>
  </div>
);

LabelLedIndex.propTypes = LabelLedIndexTypes;

export default LabelLedIndex;
