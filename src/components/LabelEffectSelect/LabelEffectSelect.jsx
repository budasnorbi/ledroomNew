/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import { jsx } from '@emotion/core';

// Ant design
import { Select } from 'antd';
// PropTypes
import LabelEffectSelectTypes from './LabelEffectSelect.types';

// Style
import style from './style';

const { Option } = Select;

const LabelEffectSelect = ({

}) => (
  <div css={style.margin}>
    <label className="label">
      Choose effect
      <Select css={style.effectSelectInput}>
        <Option value="Fade">Fade</Option>
      </Select>
    </label>
  </div>
);

LabelEffectSelect.propTypes = LabelEffectSelectTypes;

export default LabelEffectSelect;
