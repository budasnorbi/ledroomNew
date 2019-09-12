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

  updateVolume = this.updateVolume.bind(this);

  componentDidMount() {
    const container = this.waveRef.current;
    const {
      updateSongPlaying,
      setDuration,
      setLabelDuration, 
      getWavesurfer,
      setLabelActive,
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

    getWavesurfer(this.Wavesurfer);


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
      const {id} = e;
      this.Wavesurfer.regions.list[id].update({
        color: 'rgba(0, 0, 0, .15)',
      });
  
      // Action call
      // we should get the label id what label is get in to action
      setLabelActive({
        labelId: id,
      });
    });

    this.Wavesurfer.on('region-out', (e) => {
      const {id} = e;
      const {activeLabel} = this.props;

      this.Wavesurfer.regions.list[id].update({
        color: 'rgba(255, 255, 255, .15)',
      });
      console.log(activeLabel, id)
      if(activeLabel === id){
        setLabelActive({
          labelId: null,
        });
      }

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

    showPayload.labels = Object.values(showPayload.labels);
    console.log(JSON.stringify(showPayload));
    fetch('http://localhost:5600/startShow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(showPayload),
    })
    .then( res => res.json())
    .then( json => {
      const {canPlay} = json;

      console.log(json)
      if(canPlay){
        this.Wavesurfer.playPause();
      }
    });

  }

  updateVolume(volume) {
    this.Wavesurfer.setVolume(volume);
  }

  render() {
    const { isPlaying } = this.props;
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
