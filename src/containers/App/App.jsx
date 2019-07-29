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
      id,
      labelsCount,
      left,
      top,
    } = this.props;
    return (
      <>
        <div className="container">
          <div className="columns">
            <div className="column" />
            <div className="column is-four-fifths">
              <Wavesurfer
                id={id}
                labelsCount={labelsCount}
                isPlaying={isPlaying}
              />

              {id !== -1 && (
                <LabelEditor labelId={id} />
              )
              }
            </div>
            <div className="column" />
          </div>
        </div>
        {left && top && <ColorPicker left={left} top={top} />}
      </>
    );
  }
}

App.propTypes = types;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
