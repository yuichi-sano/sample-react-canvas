// src/CanvasDrawer.tsx
import React, { useRef, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import DraggableCircle from './DraggableCircle';
interface CanvasDrawerProps {
  canvasId: number;
}

const CanvasDrawer: React.FC<CanvasDrawerProps> = ({ canvasId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [circleRadius, setCircleRadius] = useState(20);
  const [showCircle, setShowCircle] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ x: 100, y: 100 });


  const handleCircleResize = (radius: number) => {
    setCircleRadius(radius);
  };

  const handleToggleCircle = () => {
    setShowCircle(!showCircle);
  };

  const handleCircleDrag = (x: number, y: number) => {
    // Ensure the circle stays within the canvas
    const canvasWidth = 800; // Replace with your canvas width
    const canvasHeight = 600; // Replace with your canvas height

    x = Math.min(Math.max(x, 0), canvasWidth);
    y = Math.min(Math.max(y, 0), canvasHeight);

    setCirclePosition({ x, y });
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;

    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left ;
      const y = e.clientY - rect.top + 100;

      if (e.shiftKey) {
        //
      } else {
        //
      }
    }
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={handleToggleCircle}>
            Add Circle
          </Button>{' '}
          <Button variant="success" onClick={(e) => handleCanvasClick(e)}>
            Add Square
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <canvas
            ref={canvasRef}
            className="canvas"
            width={500}
            height={500}
          ></canvas>

          {showCircle && (
            <DraggableCircle x={circlePosition.x} y={circlePosition.y} radius={20} onDrag={handleCircleDrag} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CanvasDrawer;
