import React from 'react';

interface DraggableCircleProps {
  x: number;
  y: number;
  radius: number;
  onDrag: (x: number, y: number) => void;
}

const DraggableCircle: React.FC<DraggableCircleProps> = ({ x, y, radius, onDrag }) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      onDrag(x + deltaX, y + deltaY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        borderRadius: '50%',
        background: 'rgba(255, 0, 0, 0.5)',
        cursor: 'move',
      }}
      onMouseDown={handleMouseDown}
    />
  );
};

export default DraggableCircle;
