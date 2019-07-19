/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Component, createRef } from 'react';
import { Stage, Layer } from 'react-konva';

// Utils
import {
  getZoomPos,
  colorizeRange,
  setRoomScale,
} from './utils';

// Child components
import LedRow from '../../components/LedRow/LedRow';

const canvasStyle = css`
  margin-bottom:15px;
  border: dashed 2px rgba(255,255,255,.1);
  border-radius:2px;
  cursor: grabbing;
`;

class LedIndexPicker extends Component {
  // Bindings
  addToShapeList = this.addToShapeList.bind(this);

  handleZoom = this.handleZoom.bind(this);

  handleLedClick = this.handleLedClick.bind(this);

  // Refs
  canvasRef = createRef();

  // Variables
  zoomCount = 0;

  maxZoomCount = 15;

  shapeRefList = [];

  selectedArea = {
    start: null,
    end: null,
  };

  componentDidMount() {
    const canvas = this.canvasRef.current;
    // Set the canvas size of it parent size
    setRoomScale(canvas);

    window.addEventListener('resize', setRoomScale.bind(this, canvas));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', setRoomScale);
  }

  handleZoom(e) {
    e.evt.preventDefault();
    const stage = e.currentTarget;

    if (Math.sign(e.evt.deltaY) === -1) {
      // Prevent zooming
      if (this.zoomCount + 1 >= this.maxZoomCount) {
        return;
      }

      this.zoomCount += 1;
    } else {
      // Kifelé zoomolás
      if (this.zoomCount === 0 || this.zoomCount - 1 === -1) {
        // Set the position to default
        stage.position({ x: 0, y: 0 });
        stage.batchDraw();
        return;
      }

      this.zoomCount -= 1;
    }

    const newPos = getZoomPos(stage, e.evt.deltaY);

    stage.position(newPos);
    stage.batchDraw();
  }

  addToShapeList(reference) {
    this.shapeRefList.push(reference);
  }

  // eslint-disable-next-line class-methods-use-this
  handleLedClick({ target: { index }, evt: { shiftKey } }) {
    const canvas = this.canvasRef.current;

    if (!shiftKey) {
      // Clear the unwanted range
      colorizeRange(this.selectedArea, this.shapeRefList, null);

      this.selectedArea = {
        start: index,
        end: null,
      };
    } else {
      // Clear the unwanted range
      colorizeRange(this.selectedArea, this.shapeRefList, null);
      this.selectedArea.end = index;
    }

    colorizeRange(this.selectedArea, this.shapeRefList, 'green');

    // Render the modifications
    canvas.batchDraw();
  }

  render() {
    return (
      <Stage
        onWheel={this.handleZoom}
        css={canvasStyle}
        draggable
        ref={this.canvasRef}
        height={800}
      >
        <Layer>
          <LedRow
            pointType="start"
            type="x"
            ledCount={220}
            xOffset={20}
            yOffset={20}
            addToShapeList={this.addToShapeList}
            handleLedClick={this.handleLedClick}
          />
          <LedRow
            pointType="start"
            type="y"
            ledCount={184}
            xOffset={2220}
            yOffset={20}
            addToShapeList={this.addToShapeList}
            handleLedClick={this.handleLedClick}
          />
          <LedRow
            pointType="end"
            type="x"
            ledCount={186}
            xOffset={2210}
            yOffset={1850}
            addToShapeList={this.addToShapeList}
            handleLedClick={this.handleLedClick}
          />
          <LedRow
            pointType="end"
            type="y"
            ledCount={99}
            xOffset={350}
            yOffset={1850}
            addToShapeList={this.addToShapeList}
            handleLedClick={this.handleLedClick}
          />
          <LedRow
            pointType="end"
            type="x"
            ledCount={33}
            xOffset={350}
            yOffset={860}
            addToShapeList={this.addToShapeList}
            handleLedClick={this.handleLedClick}
          />
          <LedRow
            pointType="end"
            type="y"
            ledCount={85}
            xOffset={20}
            yOffset={860}
            addToShapeList={this.addToShapeList}
            handleLedClick={this.handleLedClick}
          />
        </Layer>
      </Stage>
    );
  }
}

export default LedIndexPicker;
