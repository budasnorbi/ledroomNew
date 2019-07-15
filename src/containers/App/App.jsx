// Core
import React from 'react';

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

class App extends React.Component {
  render() {
    const {
      // State
      isPlaying,
    } = this.props;
    return (
      <div className="container">
        <div className="columns">
          <div className="column" />
          <div className="column is-four-fifths">
            <Wavesurfer isPlaying={isPlaying} />

            {/* <LabelEditor /> */}
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
