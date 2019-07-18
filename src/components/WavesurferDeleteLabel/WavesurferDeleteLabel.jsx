/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
// import { connect } from 'react-redux';
import types from './WavesurferDeleteLabel.types';

// import { mapDispatchToProps } from './WavesurferDeleteLabel.redux';
// Style
import style from './WavesurferDeleteLabel.style';


const WavesurferDeleteLabel = ({
  deleteLabel,
  id,
}) => (
  <button
    type="button"
    className="button is-dark"
    css={style.marginLeft}
    onClick={deleteLabel}
    disabled={id === -1}
  >
    <span className="icon is-small">
      <i className="ion-md-remove" />
    </span>
  &nbsp;
  Delete Label
  </button>
);

WavesurferDeleteLabel.propTypes = types;

export default WavesurferDeleteLabel;
