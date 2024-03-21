import React from 'react';

interface SnakeProps {
    snake: { x: number; y: number }[];
}

export const Snake: React.FC<SnakeProps> = ({ snake }) => {
    return (
        <>
            {snake.map((segment, index) => (
                <div
                    key={index}
                    style={{
                        gridColumnStart: segment.x,
                        gridRowStart: segment.y,
                        backgroundColor: '#00FF00',
                        border: '1px solid #000000',
                    }}
                />
            ))}
        </>
    );
};