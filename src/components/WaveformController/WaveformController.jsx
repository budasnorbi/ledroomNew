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

  playHandler() {
    const { waveformRef, updateSongPlaying } = this.props;
    waveformRef.playPause();
    updateSongPlaying();
  }

  render() {
    const { isPlaying } = this.props;
    return (
      <section className="is-flex">
        <button
          type="button"
          className="button is-dark"
          onClick={this.playHandler}
        >
          <span className="icon is-small">
            <i className={`ion ${decideIcon(isPlaying)}`} />
          </span>
        </button>
        <button
          type="button"
          className="button is-dark"
          css={style.addLabel}
        >
          <span className="icon is-small">
            <i className="ion-md-add" />
          </span>
          &nbsp;
          Add region
        </button>
      </section>
    );
  }
}

WaveformController.propTypes = WaveformControllerTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WaveformController);
