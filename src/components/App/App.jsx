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

import ColorPicker from '../LedColorPicker/LedColorPicker';

class App extends PureComponent {
  render() {
    const {
      // State
      isPlaying,
      // Label
      labelId,
      labelsCount,
      colorPickerIsOpened,
    } = this.props;
    return (
      <>
        <div className="container">
          <div className="columns">
            <div className="column" />
            <div className="column is-four-fifths">
              <Wavesurfer
                labelId={labelId}
                labelsCount={labelsCount}
                isPlaying={isPlaying}
              />

              {labelId !== null && <LabelEditor labelId={labelId} />}
            </div>
            <div className="column" />
          </div>
        </div>
        {colorPickerIsOpened && <ColorPicker />}
      </>
    );
  }
}

App.propTypes = types;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
