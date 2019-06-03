import React, { Component, createRef } from 'react';
import { Stage, Layer } from 'react-konva';

// Child components
import LedRow from '../../components/LedRow/LedRow';

const canvasStyle = {
  height: '100%',
  border: 'solid 1px red',
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
    const { width, height } = canvas.getContainer().getBoundingClientRect();

    // Set the canvas size of it parent size
    canvas.width(width);
    canvas.height(height);

    // Zoom the canvas
    const coords = Object.values(
      canvas.children[0].children.map(({ attrs: { x, y } }) => ({ x, y })),
    );

    const mostFarX = coords.sort((a, b) => b.x - a.x)[0].x;
    const mostFarY = coords.sort((a, b) => b.y - a.y)[0].y;

    canvas.scale({
      x: 0.98 / (mostFarX / width),
      y: 0.98 / (mostFarY / height),
    });
  }

  handleZoom(e) {
    e.evt.preventDefault();
    const canvas = this.canvasRef.current;
    const stage = e.currentTarget;
    const scaleBy = 1.25;

    if (Math.sign(e.evt.deltaY) === -1) {
      // Befelé zoomolás
      if (this.zoomCount + 1 >= this.maxZoomCount) {
        return;
      }

      if (!canvas.draggable()) {
        canvas.draggable(true);
      }

      this.zoomCount += 1;
    } else {
      // Kifelé zoomolás
      if (this.zoomCount === 0 || this.zoomCount - 1 === -1) {
        if (canvas.draggable()) {
          canvas.draggable(false);
        }

        // Set the position to default
        stage.position({ x: 0, y: 0 });
        stage.batchDraw();

        return;
      }

      this.zoomCount -= 1;
    }

    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };

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
      // A sima kattintasnak ket dolgot kell csinalnia
      // 1. megadni a kezdo poziciot
      // 2. ha mar van megadva a sgift kattintas altal egy vegzo pozicio akkor azt törölni

      const { start, end } = this.selectedArea;
      // 3 törölni is kell az egykori kezdeti kijelolest
      if (Number.isInteger(start) && Number.isInteger(end)) {
        if (start > end) {
          for (let shapeIndex = end; shapeIndex < start; shapeIndex += 1) {
            this.shapeRefList[shapeIndex].fill(null);
          }
        } else {
          for (let shapeIndex = start; shapeIndex < end; shapeIndex += 1) {
            this.shapeRefList[shapeIndex].fill(null);
          }
        }
      }

      if (Number.isInteger(start)) {
        this.shapeRefList[start].fill(null);
      }

      this.selectedArea = {
        start: index,
        end: null,
      };
    } else {
      // A shiftes kattintasnak egy dolga van frissiteni a vegzo pozicciot
      this.selectedArea.end = index;
    }

    // Decide to selected area
    const { start, end } = this.selectedArea;

    if (Number.isInteger(start) && Number.isInteger(end)) {
      if (start > end) {
        for (let shapeIndex = end; shapeIndex < start; shapeIndex += 1) {
          this.shapeRefList[shapeIndex].fill('green');
        }
      } else {
        for (let shapeIndex = start; shapeIndex < end; shapeIndex += 1) {
          this.shapeRefList[shapeIndex].fill('green');
        }
      }
    }


    if (start) {
      console.log(this.shapeRefList)
      console.log(this.shapeRefList[start])
      this.shapeRefList[start].fill('green');
    }

    canvas.batchDraw();
  }

  render() {
    return (
      <Stage
        onWheel={this.handleZoom}
        style={canvasStyle}
        ref={this.canvasRef}
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
