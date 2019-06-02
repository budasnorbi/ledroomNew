import React, { Component, createContext } from 'react';
import { Stage, Layer } from 'react-konva';

// Child components
import LedRow from '../../components/LedRow/LedRow';

const canvasStyle = {
  height: '100%',
  border: 'solid 1px red',
};

class LedIndexPicker extends Component {
  addToShapeList = this.addToShapeList.bind(this);

  canvasRef = createContext();

  shapeRefList = [];

  componentDidMount() {
    /* const stage = this.canvasRef.current;

    const coords = Object.values(
      stage.children[0].children.map(rect => ({
        x: rect.attrs.x,
        y: rect.attrs.y,
      })),
    );

    const mostFarX = coords.sort((a, b) => b.x - a.x)[0].x;
    const mostFarY = coords.sort((a, b) => b.y - a.y)[0].y;

    const { width, height } = stage.attrs;

    stage.scale({
      x: 0.9 / (mostFarX / width),
      y: 0.9 / (mostFarY / height),
    }); */
  }

  addToShapeList(reference) {
    this.shapeRefList.push(reference);
  }

  render() {
    return (
      <Stage
        style={canvasStyle}
        draggable
        ref={this.canvasRef}
      >
        <Layer>
          <LedRow
            type="x"
            ledCount={249}
            ledSize={10}
            xOffset={20}
            yOffset={20}
            addToShapeList={this.addToShapeList}
          />
          <LedRow
            type="y"
            ledCount={87}
            ledSize={10}
            xOffset={20}
            yOffset={20}
            addToShapeList={this.addToShapeList}
          />
          <LedRow
            type="x"
            ledCount={33}
            ledSize={10}
            xOffset={20}
            yOffset={890}
            addToShapeList={this.addToShapeList}
          />
          <LedRow
            type="y"
            ledCount={99}
            ledSize={10}
            xOffset={350}
            yOffset={890}
            addToShapeList={this.addToShapeList}
          />
          <LedRow
            type="x"
            ledCount={216}
            ledSize={10}
            xOffset={350}
            yOffset={1880}
            addToShapeList={this.addToShapeList}
          />
          <LedRow
            type="y"
            ledCount={187}
            ledSize={10}
            xOffset={2510}
            yOffset={20}
            addToShapeList={this.addToShapeList}
          />
        </Layer>
      </Stage>
    );
  }
}

export default LedIndexPicker;
