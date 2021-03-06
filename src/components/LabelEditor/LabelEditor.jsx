/* eslint-disable radix */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Component } from 'react';

// Style
import { connect } from 'react-redux';
import style from './LabelEditor.style';

import types from './LabelEditor.types';

import ColorButton from '../ColorButton/ColorButton';

import { mapStateToProps, mapDispatchToProps } from './LabelEditor.redux';
import LabelCurve from '../LabelCurve/LabelCurve';
import LedIndexPicker from '../LedIndexPicker/LedIndexPicker';
// eslint-disable-next-line react/prefer-stateless-function
class LabelEditor extends Component {
  updateLedStart = this.updateLedStart.bind(this);

  updateLedEnd = this.updateLedEnd.bind(this);

  addColor = this.addColor.bind(this);

  setCurvePath = this.setCurvePath.bind(this);

  id = -1;

  setCurvePath(type, path) {
    const {
      setOpacityPath, setTransitionPath, labelId, selectionId,
    } = this.props;

    if (type === 'opacity') {
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

  addColor() {
    const {
      addColor, selectColor, labelId, addOpacityPath, addTransitionPath, selectionId, colorList, openColorPicker,
    } = this.props;

    const colorIndex = colorList.length;

    addColor({
      selectionId,
      labelId,
      colorIndex,
    });

    openColorPicker();

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

  updateLedStart(e) {
    const valueAsNumber = parseInt(e.target.value === '' ? 0 : e.target.value);
    const {
      setLedStart, labelId, selectionId, maxLedCount,
    } = this.props;

    if (valueAsNumber > maxLedCount || valueAsNumber < 0) {
      return;
    }

    setLedStart({
      labelId,
      selectionId,
      start: valueAsNumber,
    });
  }

  updateLedEnd(e) {
    const valueAsNumber = parseInt(e.target.value === '' ? 0 : e.target.value);
    const { maxLedCount } = this.props;

    if (valueAsNumber > maxLedCount || valueAsNumber < 0) {
      return;
    }

    const { setLedEnd, labelId, selectionId } = this.props;

    setLedEnd({
      labelId,
      selectionId,
      end: valueAsNumber,
    });
  }

  render() {
    const {
      labelId,
      opacityPath,
      transitionPath,
      selectionId,
      colorList,
      startLedIndex,
      endLedIndex,
      startTime,
      endTime,
      activeLabel,
    } = this.props;

    return (
      <div css={style.labelEditorContainer}>
        <div css={style.colorCurveContainer}>
          <div css={style.colorContainer}>
            <button
              type="button"
              className="button"
              css={style.colorAdd}
              onClick={this.addColor}
            >
              <span className="icon is-small">
                <i className="ion ion-md-add" />
              </span>
            &nbsp;
            color
            </button>
            {colorList.map((color, index) => (
              <ColorButton
                key={index}
                selectionId={selectionId}
                labelId={labelId}
                colorIndex={index}
                color={color}
              />
            ))}
          </div>
          {selectionId !== null && (
            <>
              {opacityPath !== null && (
                <LabelCurve
                  labelId={labelId}
                  selectionId={selectionId}
                  startPath={opacityPath}
                  type="opacity"
                  setCurvePath={this.setCurvePath}
                  startTime={startTime}
                  endTime={endTime}
                  activeLabel={activeLabel}
                />
              )}
              {transitionPath !== null && (
                <LabelCurve
                  labelId={labelId}
                  selectionId={selectionId}
                  startPath={transitionPath}
                  type="transition"
                  setCurvePath={this.setCurvePath}
                  startTime={startTime}
                  endTime={endTime}
                  activeLabel={activeLabel}
                />
              )}
            </>
          )}
        </div>

        <div css={style.ledIndexContainer}>

          <div css={style.rangeContainer}>
            <div css={style.ledIndexInputContainer}>
              <h5 css={style.ledHeading} className="title is-5">Start led</h5>
              <input
                css={style.ledInput}
                className="input is-small"
                type="text"
                placeholder="start led"
                value={startLedIndex}
                onChange={this.updateLedStart}
              />
            </div>
            <div css={style.ledIndexInputContainer}>
              <h5 css={style.ledHeading} className="title is-5">End led</h5>
              <input
                css={style.ledInput}
                className="input is-small"
                type="text"
                placeholder="end led"
                value={endLedIndex}
                onChange={this.updateLedEnd}
              />
            </div>
          </div>
          <LedIndexPicker
            startLedIndex={startLedIndex}
            endLedIndex={endLedIndex}
          />
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
