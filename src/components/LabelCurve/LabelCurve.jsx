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

  componentDidMount() {
    const { type, setCurvePath, startPath } = this.props;
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
  }

  componentDidUpdate(prevProps) {
    const { labelId, selectionId, startPath } = this.props;
    if (prevProps.selectionId === selectionId && prevProps.labelId === labelId) {
      return;
    }
    this.curveEditor._props.startPath = startPath;
    this.curveEditor._drawStartPath();
  }

  render() {
    const { type } = this.props;
    /* const dynamicStyle = {
      cursor: startPath === null ? 'not-allowed' : 'unset',
      opacity: startPath === null ? '0.5' : '1',
    }; */

    return (
      <div css={style.curveContainer}>
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
