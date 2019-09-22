import React from 'react';

// PropTypes
import { connect } from 'react-redux';
import types from './WavesurferPlayPause.types';

// Redux
import { mapDispatchToProps } from './WavesurferPlayPause.redux';
// localUtil
import util from './WavesurferPlayPause.util';

// globalUtil
// import gUtil from '../../util';

const WavesurferPlayPause = ({
  playPause,
  isPlaying,
}) => (
  <button
    type="button"
    className="button is-dark"
    onClick={playPause}
  >
    <span className="icon is-small">
      <i className={`ion ${util.isPlaying(isPlaying)}`} />
    </span>
  </button>
);

WavesurferPlayPause.propTypes = types;

/*export default connect(
  null,
  mapDispatchToProps,
)(WavesurferPlayPause);*/

export default WavesurferPlayPause;
