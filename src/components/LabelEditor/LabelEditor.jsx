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

  addColor() {
    const {
      addColor, selectColor, labelId, addOpacityPath, addTransitionPath, selectionId, colorList,
    } = this.props;

    const colorIndex = colorList.length;

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

  updateLedStart(e) {
    const { setLedStart, labelId, selectionId } = this.props;
    const valueAsNumber = parseInt(e.target.value);

    setLedStart({
      labelId,
      selectionId,
      start: valueAsNumber,
    });
  }

  updateLedEnd(e) {
    const { setLedEnd, labelId, selectionId } = this.props;
    const valueAsNumber = parseInt(e.target.value);

    setLedEnd({
      labelId,
      selectionId,
      end: valueAsNumber,
    });
  }

  render() {
    const {
      labelId, opacityPath, transitionPath, selectionId, colorList, startLedIndex, endLedIndex,
    } = this.props;

    return (
      <div css={style.LabelEditorWrapper}>
        <div>
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
        <div css={style.labelOptionWrapper}>

          <div css={style.rangeContainer}>
            <input
              css={style.ledInput}
              className="input"
              type="text"
              placeholder="start led"
              value={startLedIndex}
              onChange={this.updateLedStart}
            />
            <span css={style.dash}> - </span>
            <input
              css={style.ledInput}
              className="input"
              type="text"
              placeholder="end led"
              value={endLedIndex}
              onChange={this.updateLedEnd}
            />
          </div>
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
