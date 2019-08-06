/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
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
import style from './App.style';

// Child components
import Wavesurfer from '../Wavesurfer/Wavesurfer';
import LabelEditor from '../LabelEditor/LabelEditor';

import ColorPicker from '../LedColorPicker/LedColorPicker';
import LabelList from '../LabelList/LabelList';
import SelectionList from '../SelectionList/SelectionList';

class App extends PureComponent {
  selectLabel = this.selectLabel.bind(this);

  selectLabel(labelId) {
    const { selectLabel } = this.props;

    selectLabel({
      labelId,
    });
  }

  render() {
    const {
      // State
      isPlaying,
      // Label
      labelId,
      labelsCount,
      colorPickerIsOpened,
      labelIds,
      selectionIds,
      selectionId,
    } = this.props;

    return (
      <>
        <div className="container">
          <div className="columns">
            <div className="column" css={style.labelBorderRight}>
              <LabelList
                addLabel={() => this.WavesurferComponent.addLabel()}
                deleteLabel={() => this.WavesurferComponent.deleteLabel()}
                selectLabel={this.selectLabel}
                labelIds={labelIds}
                labelId={labelId}
              />
            </div>
            <div className="column">
              <SelectionList
                labelId={labelId}
                selectionId={selectionId}
                selectionIds={selectionIds}
              />
            </div>
            <div className="column is-three-quarters">
              <Wavesurfer
                labelId={labelId}
                labelsCount={labelsCount}
                isPlaying={isPlaying}
                onRef={ref => this.WavesurferComponent = ref}
              />

              {labelId !== null && <LabelEditor labelId={labelId} />}
            </div>
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
