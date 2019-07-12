// Core dependencies
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

// PropTypes
import WaveformControllerTypes from './WaveformController.types';

// Redux
import { mapStateToProps, mapDispatchToProps } from './redux';

// Style
import style from './style';

// Local utils
import { decideIcon } from './utils';

class WaveformController extends PureComponent {
  playHandler = this.playHandler.bind(this);

  addLabelHandler = this.addLabelHandler.bind(this);

  playHandler() {
    const { waveformRef, updateSongPlaying } = this.props;
    waveformRef.playPause();
    updateSongPlaying();
  }

  addLabelHandler() {
    const { addLabel } = this.props;
    addLabel();
  }

  render() {
    const { isPlaying } = this.props;
    return (
      <div className="is-flex" css={style.marginBottom}>
        <button
          type="button"
          className="button is-dark"

        >
          <span className="icon is-small">
            <i className={`ion ${decideIcon(isPlaying)}`} />
          </span>
        </button>
        <button
          type="button"
          className="button is-dark"
          css={style.addLabel}
          onClick={this.addLabelHandler}
        >
          <span className="icon is-small">
            <i className="ion-md-add" />
          </span>
          &nbsp;
          Add Label
        </button>
      </div>
    );
  }
}

WaveformController.propTypes = WaveformControllerTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WaveformController);
