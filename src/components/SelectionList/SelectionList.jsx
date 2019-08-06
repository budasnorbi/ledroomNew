/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

// PropTypes
// import types from './SelectionList.types';

// Style
import { connect } from 'react-redux';
import style from './SelectionList.style';
import { mapDispatchToProps } from './SelectionList.redux';
// localUtil
// import util from './SelectionList.util';

// globalUtil
// import gUtil from '../../util';
class SelectionList extends Component {
  id = -1;

  addSelection = this.addSelection.bind(this);

  deleteSelection = this.deleteSelection.bind(this);

  selectSelection = this.selectSelection.bind(this);

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

  deleteSelection() {
    const {
      labelId, deleteSelection, selectSelection, selectionId,
    } = this.props;

    deleteSelection({
      labelId,
      selectionId,
    });

    selectSelection({
      selectionId: null,
    });
  }

  selectSelection(e) {
    const { selectSelection, labelId } = this.props;
    selectSelection({
      labelId,
      selectionId: parseInt(e.target.dataset.selection),
    });
  }

  render() {
    const { selectionIds, selectionId, labelId } = this.props;

    return (
      <>
        <h1 className="title is-6" css={style.heading}>Selections</h1>
        <div css={style.buttonsContainer} style={{ display: labelId === null ? 'none' : 'block' }}>
          <button
            type="button"
            className="button is-dark"
            css={style.addSelection}
            onClick={this.addSelection}
          >
            <span className="icon is-small">
              <i className="ion-md-add" />
            </span>
          </button>
          <button
            type="button"
            className="button is-dark"
            css={style.deleteSelection}
            disabled={selectionIds.length === 0}
            onClick={this.deleteSelection}
          >
            <span className="icon is-small">
              <i className="ion-md-remove" />
            </span>
          </button>
        </div>
        {selectionIds.map(selection => (
          <button
            key={selection}
            type="button"
            className="button is-dark"
            css={[
              style.selectionButton,
              selection === selectionId ? style.selectedSelection : null,
            ]}
            data-selection={selection}
            onClick={this.selectSelection}
          >
            {selection}
          </button>
        ))}
      </>
    );
  }
}

// SelectionList.propTypes = types;

export default connect(
  null,
  mapDispatchToProps,
)(SelectionList);
