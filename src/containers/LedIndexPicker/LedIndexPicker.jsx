import React, { Component, createRef } from 'react';
import { Stage, Layer } from 'react-konva';

// Utils
import { getZoomPos, colorizeRange, getScaleCoords } from './utils';

// Child components
import LedRow from '../../components/LedRow/LedRow';

const canvasStyle = {
  height: '100%',
  'border-right': 'solid 1px rgba(10,10,10,.1)',
};

class LedIndexPicker extends Component {
  addToShapeList = this.addToShapeList.bind(this);

  handleZoom = this.handleZoom.bind(this);

  handleLedClick = this.handleLedClick.bind(this);

  canvasRef = createRef();

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
    const { width, height } = canvas.getContainer().getBoundingClientRect();

    // Set the canvas size of it parent size
    canvas.width(width);
    canvas.height(height);

    const { x } = getScaleCoords(canvas.children[0].children, width, height);
    canvas.scaleX(x);

    canvas.scaleY(x);

    window.addEventListener('resize', () => {
      // eslint-disable-next-line no-shadow
      const { width, height } = canvas.getContainer().getBoundingClientRect();

      // Set the canvas size of it parent size
      canvas.width(width);
      canvas.height(height);

      // eslint-disable-next-line no-shadow
      const { x } = getScaleCoords(canvas.children[0].children, width, height);
      canvas.scaleX(x);
      canvas.scaleY(x);
    });
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
  handleLedClick({ target: { index }, evt: { shiftKey, ctrlKey } }) {
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

    if (shiftKey && !ctrlKey) {
      // Decide to selected area
      colorizeRange(this.selectedArea, this.shapeRefList, 'green');
    }

    // Render the modifications
    canvas.batchDraw();
  }

  render() {
    return (
      <Stage
        onWheel={this.handleZoom}
        style={canvasStyle}
        draggable
        ref={this.canvasRef}
        onRes
      >
        <Layer>
          <LedRow
            pointType="start"
            type="x"
            ledCount={249}
            xOffset={20}
            yOffset={20}
            addToShapeList={this.addToShapeList}
            handleLedClick={this.handleLedClick}
          />
          <LedRow
            pointType="start"
            type="y"
            ledCount={187}
            xOffset={2510}
            yOffset={20}
            addToShapeList={this.addToShapeList}
            handleLedClick={this.handleLedClick}
          />
          <LedRow
            pointType="end"
            type="x"
            ledCount={216}
            xOffset={2510}
            yOffset={1890}
            addToShapeList={this.addToShapeList}
            handleLedClick={this.handleLedClick}
          />
          <LedRow
            pointType="end"
            type="y"
            ledCount={99}
            xOffset={350}
            yOffset={1890}
            addToShapeList={this.addToShapeList}
            handleLedClick={this.handleLedClick}
          />
          <LedRow
            pointType="end"
            type="x"
            ledCount={33}
            xOffset={350}
            yOffset={900}
            addToShapeList={this.addToShapeList}
            handleLedClick={this.handleLedClick}
          />
          <LedRow
            pointType="end"
            type="y"
            ledCount={88}
            xOffset={20}
            yOffset={900}
            addToShapeList={this.addToShapeList}
            handleLedClick={this.handleLedClick}
          />
        </Layer>
      </Stage>
    );
  }
}

export default LedIndexPicker;
