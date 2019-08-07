/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Core
import React, { Component } from 'react';

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

class LabelCurve extends Component {
  ref = React.createRef();

  componentDidMount() {
    const { type, setCurvePath, startPath } = this.props;
    this.curveEditor = new MojsCurveEditor({
      name: 'some name',
      startPath,
      isSaveState: false,
      root: this.ref.current,
      onChange: (path) => {
        // console.log(startPath, path);
        if (startPath !== null && startPath !== path) {
          setCurvePath(type, path);
        }
      },
    });
  }

  componentDidUpdate() {
    // console.log(this.props.startPath);
    // this.curveEditor._defaults.startPath = this.props.startPath;
  }

  render() {
    const { type, startPath } = this.props;
    const dynamicStyle = {
      cursor: startPath === null ? 'not-allowed' : 'unset',
      opacity: startPath === null ? '0.5' : '1',
    };

    return (
      <div css={style.curveContainer} style={dynamicStyle}>
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
