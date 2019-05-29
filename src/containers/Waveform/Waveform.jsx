// Core dependencies
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Component } from 'react';

// Wavesurfer
import Wavesurfer from 'wavesurfer.js';

// Wavesurfe plugins
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';


// React redux
import { connect } from 'react-redux';
import { mapStateToProp, mapDispatchToProp } from './redux';

// Prop Types
import types from './types';

// Style
import style from './style';

// Local utils
import { decideIcon } from './utils';

// Test music
import music from '../../music.mp3';

class Waveform extends Component {
  waveRef = React.createRef();

  timelineRef = React.createRef();

  zoomValue = 0;

  // Events
  playHandler = this.playHandler.bind(this);

  componentDidMount() {
    this.Wavesurfer = Wavesurfer.create({
      container: this.waveRef.current,
      waveColor: '#9b59b6',
      progressColor: '#2ecc71',
      hideScrollbar: true,
      minPxPerSec: 20,
      partialRender: true,
      plugins: [
        TimelinePlugin.create({
          container: this.timelineRef.current,
          notchPercentHeight: 50,
        }),
        CursorPlugin.create({
          showTime: true,
          opacity: 1,
          customShowTimeStyle: {
            'background-color': '#000',
            color: '#fff',
            padding: '2px',
            'font-size': '10px',
          },
        }),
      ],
    });

    this.waveRef.current.addEventListener('wheel', (e) => {
      const zoomSign = Math.sign(e.deltaY);

      if (zoomSign === -1) {
        // Zoomolás be
        this.zoomValue += 20;
        this.Wavesurfer.zoom(this.zoomValue);
      }

      if (zoomSign === 1) {
        // Zoomolás ki
        this.zoomValue -= 20;
        this.Wavesurfer.zoom(this.zoomValue);
      }
    });

    const { updateSongPlaying } = this.props;

    this.Wavesurfer.on('finish', () => {
      updateSongPlaying();
    });

    this.Wavesurfer.load(music);
  }

  playHandler() {
    const { updateSongPlaying } = this.props;
    this.Wavesurfer.playPause();
    updateSongPlaying();
  }

  render() {
    const { isPlaying } = this.props;

    return (
      <>
        <div ref={this.waveRef} css={style.waveformContainer} />
        <div ref={this.timelineRef} css={style.waveformTimeline} />
        <button
          type="button"
          className="button"
          onClick={this.playHandler}
        >
          <span className="icon is-small">
            <i className={`ion ${decideIcon(isPlaying)}`} />
          </span>
        </button>
      </>
    );
  }
}

Waveform.propTypes = types;

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(Waveform);
