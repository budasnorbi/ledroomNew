/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component } from 'react';

// Style
import { connect } from 'react-redux';
import style from './LabelEditor.style';

import types from './LabelEditor.types';

import { mapStateToProps, mapDispatchToProps } from './LabelEditor.redux';
// Child components
// import LabelTitle from '../../components/LabelTitle/LabelTitle';
// import LabelTimePicker from '../../components/LabelTimePicker/LabelTimePicker';
// import LabelEffectSelect from '../../components/LabelEffectSelect/LabelEffectSelect';
import LabelSave from '../../components/LabelSave/LabelSave';
import LedIndexPicker from '../LedIndexPicker/LedIndexPicker';

import SelectionAdd from '../../components/SelectionAdd/SelectionAdd';

import SelectionItem from '../../components/SelectionItem/SelectionItem';

import LabelCurve from '../LabelCurve/LabelCurve';

import ColorPicker from '../LedColorPicker/LedColorPicker';

// eslint-disable-next-line react/prefer-stateless-function
class LabelEditor extends Component {
  addSelection = this.addSelection.bind(this);

  deleteSelection = this.deleteSelection.bind(this);

  updateLedStart = this.updateLedStart.bind(this);

  updateLedEnd = this.updateLedEnd.bind(this);

  addColor = this.addColor.bind(this);

  id = -1;

  addSelection() {
    const { addSelection, selectedLabelId } = this.props;
    this.id += 1;

    addSelection({
      labelId: selectedLabelId,
      selectionId: this.id,
      start: 0,
      end: 0,
      colorlist: [],
      isLocked: false,
    });
  }

  deleteSelection(selectionId) {
    const { labelId, deleteSelection } = this.props;
    deleteSelection({
      labelId,
      selectionId,
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
    const { addColor, labelId } = this.props;

    addColor({
      selectionId,
      labelId,
      colorIndex,
    });
  }

  render() {
    const { selectionIds } = this.props;
    return (
      <div className="columns" css={style.LabelEditorWrapper}>
        <div className="column is-two-thirds">
          <LedIndexPicker />
          <LabelCurve />
        </div>
        <div className="column" css={style.labelOptionWrapper}>
          <ul css={style.selectionList}>
            {selectionIds.map(selectionId => (
              <SelectionItem
                key={selectionId}
                selectionId={selectionId}
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

          <LabelSave />
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
