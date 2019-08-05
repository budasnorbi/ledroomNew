/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Component } from 'react';

// Style
import { connect } from 'react-redux';
import style from './LabelEditor.style';

import types from './LabelEditor.types';

import { mapStateToProps, mapDispatchToProps } from './LabelEditor.redux';
// Child components
// import LabelTitle from '../../components/LabelTitle/LabelTitle';
// import LabelTimePicker from '../../components/LabelTimePicker/LabelTimePicker';
// import LabelEffectSelect from '../../components/LabelEffectSelect/LabelEffectSelect';
import LabelSave from '../LabelSave/LabelSave';
import LedIndexPicker from '../LedIndexPicker/LedIndexPicker';

import SelectionAdd from '../SelectionAdd/SelectionAdd';

import SelectionItem from '../SelectionItem/SelectionItem';

import LabelCurve from '../LabelCurve/LabelCurve';

import ColorPicker from '../LedColorPicker/LedColorPicker';

// eslint-disable-next-line react/prefer-stateless-function
class LabelEditor extends Component {
  addSelection = this.addSelection.bind(this);

  deleteSelection = this.deleteSelection.bind(this);

  updateLedStart = this.updateLedStart.bind(this);

  updateLedEnd = this.updateLedEnd.bind(this);

  addColor = this.addColor.bind(this);

  setCurvePath = this.setCurvePath.bind(this);

  id = -1;

  addSelection() {
    const { addSelection, labelId, selectSelection } = this.props;
    this.id += 1;

    addSelection({
      labelId,
      selectionId: this.id,
    });

    selectSelection({
      labelId,
      selectionId: this.id,
    });
  }

  deleteSelection(selectionId) {
    const { labelId, deleteSelection, selectSelection } = this.props;
    deleteSelection({
      labelId,
      selectionId,
    });

    selectSelection({
      selectionId: null,
    });
  }

  updateLedStart(valueAsString, selectionId) {
    const { setLedStart, labelId } = this.props;
    const valueAsNumber = parseInt(valueAsString, 0);

    setLedStart({
      labelId,
      selectionId,
      start: valueAsNumber,
    });
  }

  updateLedEnd(valueAsString, selectionId) {
    const { setLedEnd, labelId } = this.props;
    const valueAsNumber = parseInt(valueAsString, 0);

    setLedEnd({
      labelId,
      selectionId,
      end: valueAsNumber,
    });
  }

  addColor(selectionId, colorIndex) {
    const {
      addColor, selectColor, labelId, selectSelection, addOpacityPath, addTransitionPath,
    } = this.props;

    selectSelection({ selectionId });

    addColor({
      selectionId,
      labelId,
      colorIndex,
    });

    if (colorIndex === 0) {
      addOpacityPath({ selectionId, labelId });
    }

    if (colorIndex === 1) {
      addTransitionPath({ selectionId, labelId });
    }

    selectColor({
      colorIndex,
    });
  }

  setCurvePath(type, path) {
    const {
      setOpacityPath, setTransitionPath, labelId, selectionId,
    } = this.props;

    if (type === 'opcaity') {
      setOpacityPath({
        selectionId,
        labelId,
        path,
      });
    }

    if (type === 'transition') {
      setTransitionPath({
        selectionId,
        labelId,
        path,
      });
    }
  }

  render() {
    const {
      selectionIds, labelId, opacityPath, transitionPath, selectionId,
    } = this.props;
    console.log(selectionId);
    return (
      <div className="columns" css={style.LabelEditorWrapper}>
        <div className="column is-two-thirds">
          {selectionId !== null && (
            <>
              <LabelCurve
                startPath={opacityPath}
                type="opacity"
                setCurvePath={this.setCurvePath}
              />
              <LabelCurve
                startPath={transitionPath}
                type="transition"
                setCurvePath={this.setCurvePath}
              />
            </>
          )}
        </div>
        <div className="column" css={style.labelOptionWrapper}>
          <ul css={style.selectionList}>
            {selectionIds.map(selectionId => (
              <SelectionItem
                key={selectionId}
                selectionId={selectionId}
                labelId={labelId}
                deleteSelection={this.deleteSelection}
                updateLedStart={this.updateLedStart}
                updateLedEnd={this.updateLedEnd}
                addColor={this.addColor}
              />
            ))}
          </ul>
          <SelectionAdd addSelection={this.addSelection} />
          {/* <LedColorPicker /> */}
          {/* <LabelTitle />

          <LabelEffectSelect />

          <LabelWrapper>
            <LabelTimePicker placeholder="Start time" />
            <LabelTimePicker placeholder="End time" />
          </LabelWrapper> */}

          {/* <LabelSave /> */}
        </div>
      </div>
    );
  }
}

LabelEditor.propTypes = types;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LabelEditor);
