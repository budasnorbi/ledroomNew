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
import {wavesurferRef} from './LabelCurve.util';

// Redux
// import { connect } from 'redux';
// import { mapStateToProps, mapDispatchToProps } from './redux';

class LabelCurve extends PureComponent {
  ref = React.createRef();

  timelineRef = React.createRef();

  timeIntervalId;

  componentDidMount() {
    const { 
      type,
      setCurvePath,
      startPath,
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
    
    wavesurferRef.on('audioprocess', currentTime =>{
      const {startTime, endTime} = this.props;
      if (currentTime > startTime && currentTime < endTime) {

        const difference = endTime - startTime;
        const timeoffset = currentTime - startTime;
        
        const offsetPct = timeoffset / difference * 100;
        this.timelineRef.current.style.left = `${offsetPct}%`;
      }
    });

    wavesurferRef.on('seek', progress =>{
      const { startTime, endTime } = this.props;

      const duration = wavesurferRef.getDuration();
      const currentTime = duration * progress;

      if (currentTime > startTime && currentTime < endTime) {

        const difference = endTime - startTime;
        const timeoffset = currentTime - startTime;

        const offsetPct = timeoffset / difference * 100;
        this.timelineRef.current.style.left = `${offsetPct}%`;
      }
    });

    wavesurferRef.on('region-updated', region => {
      if(wavesurferRef.isPlaying()){
        return;
      }
      
      const {start, end} = region;

      const currentTime = wavesurferRef.getCurrentTime();
      if (currentTime > start && currentTime < end) {

        const difference = end - start;
        const timeoffset = currentTime - start;

        const offsetPct = timeoffset / difference * 100;
        this.timelineRef.current.style.left = `${offsetPct}%`;
      }
    })

  }

  componentWillUnmount(){
    // wavesurferRef.un('audioprocess');
    // wavesurferRef.un('region-updated');
    // wavesurferRef.un('seek');
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
        <div css={style.timelineContainer}>
          <div id="timeIndicator" ref={this.timelineRef} css={style.timeline} />
        </div>
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
