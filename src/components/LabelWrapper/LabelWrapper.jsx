/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
import LabelWrapperTypes from './LabelWrapper.types';

// Style
import style from './style';

const LabelWrapper = ({
  children,
}) => (
  <div css={style.margin} className="is-flex">{children}</div>
);

LabelWrapper.propTypes = LabelWrapperTypes;

export default LabelWrapper;
