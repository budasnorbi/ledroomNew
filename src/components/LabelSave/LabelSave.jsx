/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
import LabelSaveTypes from './LabelSave.types';

// Style
import style from './LabelSave.style';

const LabelSave = () => (
  <button
    type="button"
    className="button is-success"
    css={style.save}
  >
    <span className="icon is-small is-pulled-right">
      <i className="ion ion-md-checkmark" />
    </span>
    &nbsp;
    Save
  </button>
);

LabelSave.propTypes = LabelSaveTypes;

export default LabelSave;
