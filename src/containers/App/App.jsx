// Core dependencies
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Component } from 'react';

// React redux
import { connect } from 'react-redux';

// Wavesurfer
import Wavesurfer from 'wavesurfer.js';

// Wavesurfer plugins
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';

import { mapStateToProps, mapDispatchToProps } from './redux';

// Wavesurfer config
import initWavesurfer from './App.config';

// Prop Types
import types from './types';

// Style
import style from './style';

// Test music
import music from '../../music.mp3';

// Child components
import WaveformController from '../../components/WaveformController/WaveformController';
import RegionEditor from '../RegionEditor/RegionEditor';

class Waveform extends Component {
  waveRef = React.createRef();

  timelineRef = React.createRef();

  zoomValue = 0;

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

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column" />
          <div className="column is-four-fifths">
            <div ref={this.waveRef} css={style.waveformContainer} />
            <div ref={this.timelineRef} css={style.waveformTimeline} />

            <WaveformController waveformRef={this.Wavesurfer} />
            <RegionEditor />
          </div>
          <div className="column" />
        </div>
      </div>
    );
  }
}

Waveform.propTypes = types;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Waveform);
