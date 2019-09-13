/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Core
import React, { PureComponent } from 'react';

// PropTypes
// ?import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
// import LabelCurveShape from './LabelCurveShape';
import '@mojs/core';
import './mojs-curve-editor.min';

// Style
/** @jsx jsx */
import style from './LabelCurve.style';

// Utils
// import {} from './utils';

// Redux
// import { connect } from 'redux';
// import { mapStateToProps, mapDispatchToProps } from './redux';

class LabelCurve extends PureComponent {
  ref = React.createRef();

  timelineRef = React.createRef();

  setTimelinePosition = this.setTimelinePosition.bind(this);

  componentDidMount() {
    const { 
      type,
      setCurvePath,
      startPath,
      startTime,
      endTime,
    } = this.props;

    this.curveEditor = new MojsCurveEditor({
      name: `${type}-editor`,
      isSaveState: false,
      root: this.ref.current,
      onChange: (path) => {
        if (startPath !== null && startPath !== path) {
          setCurvePath(type, path);
        }
      },
    });
    this.setTimelinePosition();
    console.log('Label curve is mounted')
    console.log(startTime, endTime);
    // timeline should start
    // timeline position should set
  }

  setTimelinePosition(){
    if(this.props.activeLabel !== this.props.labelId){
      return;
    }

    const width = this.ref.current.getBoundingClientRect().width - 42;
    const {
      startTime,
      endTime,
      currentTime,
    } = this.props;

    const duration = endTime - startTime;

    const offsetSecond = currentTime - duration;

    const rate = width / duration;

    this.timelineRef.current.style.left = `${rate * offsetSecond}px`;
  }

  componentWillUnmount(){
    console.log('Label curve is UNmounted')
  }

  componentDidUpdate(prevProps) {
    const { labelId, selectionId, startPath} = this.props;
    if (prevProps.selectionId === selectionId && prevProps.labelId === labelId) {
      return;
    }
    this.curveEditor._props.startPath = startPath;
    this.curveEditor._drawStartPath();
  }

  render() {
    const { type } = this.props;

    return (
      <div css={style.curveContainer}>
        <div ref={this.timelineRef} css={style.timeline}></div>
        <h3 css={style.heading} className="title is-3">{`Curve ${type} Path`}</h3>
        <div ref={this.ref} />
      </div>
    );
  }
}

// LabelCurve.propTypes = LabelCurveShape;

/*
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelCurve);
*/
export default LabelCurve;
