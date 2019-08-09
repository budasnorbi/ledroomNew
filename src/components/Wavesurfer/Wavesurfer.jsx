/* eslint-disable class-methods-use-this */
// Core
import React, { PureComponent } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

// Redux
import { connect } from 'react-redux';

import clonedeep from 'lodash.clonedeep';

// Wavesurfer
import WavesurferPlugin from 'wavesurfer.js';

// Wavesurfer plugins
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import store from '../../store/configureStore';
import types from './Wavesurfer.types';
import { mapDispatchToProps, mapStateToProps } from './Wavesurfer.redux';
import util from './Wavesurfer.util';
import style from './Wavesurfer.style';

import WavesurferPlayPause from '../WavesurferPlayPause/WavesurferPlayPause';
import WavesurferAddLabel from '../WavesurferAddLabel/WavesurferAddLabel';
import WavesurferDeleteLabel from '../WavesurferDeleteLabel/WavesurferDeleteLabel';

// Test music
import music from '../../music.mp3';
import WavesurferVolume from '../WavesurferVolume/WavesurferVolume';


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

  labelId = -1;

  componentDidMount() {
    const container = this.waveRef.current;
    const {
      updateSongPlaying, setDuration, setLabelDuration,
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

      this.props.onRef(this);
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
    const { ColorStore, LabelStore } = store.getState();
    const colors = Object.entries(ColorStore);
    const showPayload = clonedeep(LabelStore);

    colors.forEach(([labelAndSelection, colorList]) => {
      const [labelId, selectionId] = labelAndSelection.split('-');
      showPayload.labels[labelId].selectionList[selectionId].colorList = colorList;
    });

    showPayload.labels = Object.assign([], showPayload.labels);

    fetch('http://localhost:5600/startShow', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, cors, *same-origin
      headers: {
        'Access-Control-Request-Headers': 'content-type',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(showPayload),
    });
    console.log(JSON.stringify(showPayload));
    // const [colorLabelId, colorSelectionId] =
    //
    // this.Wavesurfer.playPause();
  }

  addLabel() {
    const { duration, addLabel, selectLabel } = this.props;

    this.labelId += 1;

    this.Wavesurfer.addRegion({
      id: this.labelId,
      start: 0,
      end: duration,
      color: 'rgba(255,255,255,.15)',
    });

    addLabel({
      id: this.labelId,
      endTime: duration,
    });

    selectLabel({
      labelId: this.labelId,
    });
  }

  deleteLabel() {
    const { deleteLabel, labelId, selectLabel } = this.props;
    this.Wavesurfer.regions.list[labelId].remove();

    selectLabel({
      labelId: null,
    });

    deleteLabel(labelId);
  }

  updateVolume(volume) {
    this.Wavesurfer.setVolume(volume);
  }

  render() {
    const {
      isPlaying,
      labelId,
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
              {/* <WavesurferDeleteLabel labelId={labelId} deleteLabel={this.deleteLabel} /> */}
              {/* <WavesurferAddLabel addLabel={this.addLabel} /> */}
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
