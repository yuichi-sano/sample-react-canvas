// src/CanvasContainer.tsx
import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ImageUploader from './ImageUploader';
import CanvasDrawer from './CanvasDrawer';

const CanvasContainer: React.FC = () => {
  const [canvasList, setCanvasList] = useState<number[]>([]);

  const addCanvas = () => {
    setCanvasList([...canvasList, Date.now()]);
  };

  const removeCanvas = (index: number) => {
    const updatedCanvasList = [...canvasList];
    updatedCanvasList.splice(index, 1);
    setCanvasList(updatedCanvasList);
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={addCanvas}>
            Add Canvas
          </Button>
        </Col>
      </Row>
      {canvasList.map((canvasId, index) => (
        <Row key={canvasId} className="mb-4">
          <Col>
            <Button variant="danger" onClick={() => removeCanvas(index)}>
              Remove Canvas
            </Button>
          </Col>
          <Col>
            <CanvasDrawer canvasId={canvasId} />
            <ImageUploader canvasId={canvasId} />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default CanvasContainer;
