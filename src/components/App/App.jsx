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

  getWavesurfer = this.getWavesurfer.bind(this);

  addLabel = this.addLabel.bind(this);

  deleteLabel = this.deleteLabel.bind(this);

  labelId = 0;

  wavesurferInstance;

  getWavesurfer(wavesurferInstance) {
    this.wavesurferInstance = wavesurferInstance;
  }

  selectLabel(labelId) {
    const { selectLabel, selectSelection, closeColorPicker } = this.props;

    closeColorPicker();
    selectLabel({ labelId });
    selectSelection({ selectionId: null });
  }

  addLabel() {
    const {
      duration, addLabel, selectLabel, selectSelection,
    } = this.props;

    this.labelId += 1;

    this.wavesurferInstance.addRegion({
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

    selectSelection({
      selectionId: null,
    });
  }

  deleteLabel() {
    const { deleteLabel, labelId, selectLabel } = this.props;
    this.wavesurferInstance.regions.list[labelId].remove();

    selectLabel({ labelId: null });

    deleteLabel(labelId);
  }

  render() {
    const {
      // State
      isPlaying,
      // Label
      labelId,
      colorPickerIsOpened,
      labelIds,
      selectionIds,
      selectionId,
      labelTitleList,
      selectionRanges,
    } = this.props;

    return (
      <>
        <div className="container">
          <div className="columns">
            <div className="column" css={style.labelBorderRight}>
              <LabelList
                addLabel={this.addLabel}
                deleteLabel={this.deleteLabel}
                selectLabel={this.selectLabel}
                labelIds={labelIds}
                labelId={labelId}
                labelTitleList={labelTitleList}
              />
            </div>
            <div className="column">
              <SelectionList
                labelId={labelId}
                selectionId={selectionId}
                selectionIds={selectionIds}
                selectionRanges={selectionRanges}
              />
            </div>
            <div className="column is-three-quarters">
              <Wavesurfer
                isPlaying={isPlaying}
                getWavesurfer={this.getWavesurfer}
              />

              {(labelId !== null && selectionId !== null) && <LabelEditor />}
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
