// Core
import React, { PureComponent } from 'react';

/** @jsx jsx */
import { jsx } from '@emotion/core';

// Prop types
import { connect } from 'react-redux';
import types from './App.types';

// Redux

import { mapStateToProps, mapDispatchToProps } from './App.redux';

// Style
// import style from './App.style';

// Child components
import Wavesurfer from '../Wavesurfer/Wavesurfer';
import LabelEditor from '../LabelEditor/LabelEditor';

class App extends PureComponent {
  render() {
    const {
      // State
      isPlaying,
      // Label
      id,
      opacityCurvePath,
      pickedColors,
      startLedIndex,
      endLedIndex,
    } = this.props;
    return (

      <div className="container">
        <div className="columns">
          <div className="column" />
          <div className="column is-four-fifths">
            <Wavesurfer
              id={id}
              isPlaying={isPlaying}
            />

            {id !== -1 && (
              <LabelEditor
                id={id}
                opacityCurvePath={opacityCurvePath}
                pickedColors={pickedColors}
                startLedIndex={startLedIndex}
                endLedIndex={endLedIndex}
              />
            )
            }
          </div>
          <div className="column" />
        </div>
      </div>
    );
  }
}

App.propTypes = types;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
