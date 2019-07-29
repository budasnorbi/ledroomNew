// Core
import React, { PureComponent } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

// Redux
import { connect } from 'react-redux';

// Wavesurfer
import WavesurferPlugin from 'wavesurfer.js';

// Wavesurfer plugins
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import types from './Wavesurfer.types';
import { mapDispatchToProps, mapStateToProps } from './Wavesurfer.redux';
import util from './Wavesurfer.util';
import style from './Wavesurfer.style';

import WavesurferPlayPause from '../../components/WavesurferPlayPause/WavesurferPlayPause';
import WavesurferAddLabel from '../../components/WavesurferAddLabel/WavesurferAddLabel';
import WavesurferDeleteLabel from '../../components/WavesurferDeleteLabel/WavesurferDeleteLabel';

// Test music
import music from '../../music.mp3';
import WavesurferVolume from '../../components/WavesurferVolume/WavesurferVolume';


class Wavesurfer extends PureComponent {
  waveRef = React.createRef();

  state = {
    isWavesurferReady: false,
  }

  timelineRef = React.createRef();

  playPause = this.playPause.bind(this);

  addLabel = this.addLabel.bind(this);

  deleteLabel = this.deleteLabel.bind(this);

  updateVolume = this.updateVolume.bind(this);

  id = -1;

  componentDidMount() {
    const container = this.waveRef.current;
    const {
      updateSongPlaying, setDuration, setLabelDuration, volume,
    } = this.props;

    this.Wavesurfer = WavesurferPlugin.create({
      container,
      waveColor: '#9b59b6',
      progressColor: '#2ecc71',
      hideScrollbar: true,
      minPxPerSec: 20,
      partialRender: true,
      plugins: [
        TimelinePlugin.create({
          container: this.timelineRef.current,
          notchPercentHeight: 50,
          primaryColor: '#ffffff',
          secondaryColor: '#ffffff',
          primaryFontColor: '#ffffff',
          secondaryFontColor: '#ffffff',

          /* deferInit: true, */
        }),
        CursorPlugin.create({
          showTime: true,
          opacity: 1,
          customShowTimeStyle: {
            'background-color': '#000',
            color: '#fff',
            padding: '2px',
            'font-size': '10px',
            /* deferInit: true, */
          },
        }),
        RegionPlugin.create(),
      ],
    });
    this.Wavesurfer.load(music);
    this.Wavesurfer.on('ready', () => {
      util.initWavesurfer({
        container,
        surferInstance: this.Wavesurfer,
        updateSongPlaying,
      });

      setDuration(this.Wavesurfer.getDuration());
      this.setState({ isWavesurferReady: true });
      this.Wavesurfer.setVolume(0.5);
    });

    this.Wavesurfer.on('region-in', (e) => {
      this.Wavesurfer.regions.list[e.id].update({
        color: 'rgba(0, 0, 0, .15)',
      });
    });
    this.Wavesurfer.on('region-out', (e) => {
      this.Wavesurfer.regions.list[e.id].update({
        color: 'rgba(255, 255, 255, .15)',
      });
    });

    this.Wavesurfer.on('region-update-end', (e) => {
      const { id, start, end } = e;
      setLabelDuration({ id, start, end });
    });
  }

  playPause() {
    this.Wavesurfer.playPause();
  }

  addLabel() {
    const { duration, addLabel } = this.props;

    this.id += 1;

    const label = {
      id: this.id,
      startTime: 0,
      endTime: duration,
      selectionList: {},
    };

    const { id, startTime, endTime } = label;

    this.Wavesurfer.addRegion({
      id,
      start: startTime,
      end: endTime,
      color: 'rgba(255,255,255,.15)',
    });

    addLabel(label);
  }

  deleteLabel() {
    const { deleteLabel, id } = this.props;
    this.Wavesurfer.regions.list[id].remove();

    deleteLabel(id);
  }

  updateVolume(volume) {
    this.Wavesurfer.setVolume(volume);
  }

  render() {
    const {
      isPlaying,
      id,
    } = this.props;
    const { isWavesurferReady } = this.state;

    return (
      <>
        <div ref={this.waveRef} css={style.container} />
        <div ref={this.timelineRef} css={style.marginBottom} />
        {isWavesurferReady && (
          <>
            <div css={style.marginBottom} className="is-flex">
              <WavesurferPlayPause playPause={this.playPause} isPlaying={isPlaying} />
              <WavesurferVolume updateVolume={this.updateVolume} />
              <WavesurferDeleteLabel id={id} deleteLabel={this.deleteLabel} />
              <WavesurferAddLabel addLabel={this.addLabel} />
            </div>
          </>
        )}
      </>
    );
  }
}

Wavesurfer.propTypes = types;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wavesurfer);

// export default Wavesurfer;
