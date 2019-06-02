/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
import LabelColorPickerTypes from './LabelColorPicker.types';

// Style
import style from './style';

const LabelColorPicker = ({
  placeholder,
}) => (
  <div css={[style.flexGrow, style.labelColorMargin]}>
    <label css={style.colorPickerTitle} className="label">
      {placeholder}
      <button type="button" css={style.colorPickerButton} />
    </label>
  </div>
);

LabelColorPicker.propTypes = LabelColorPickerTypes;

export default LabelColorPicker;
