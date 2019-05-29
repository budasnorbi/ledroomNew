// Core dependencies
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Component } from 'react';

// React redux
import { connect } from 'react-redux';

// Wavesurfer
import Wavesurfer from 'wavesurfer.js';

// Wavesurfe plugins
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';


import { mapStateToProp, mapDispatchToProp } from './redux';

// Wavesurfer config
import initWavesurfer from './Waveform.config';

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
        RegionPlugin.create(),
      ],
    });
    this.Wavesurfer.load(music);
    this.Wavesurfer.on('ready', () => initWavesurfer(this));
  }

  playHandler() {
    const { updateSongPlaying } = this.props;
    this.Wavesurfer.playPause();
    updateSongPlaying();
  }

  render() {
    const { isPlaying, regions } = this.props;
    console.log(regions);
    // Initialize the stored regions on the timeline
    regions.forEach(region => this.Wavesurfer.addRegion(region));

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
