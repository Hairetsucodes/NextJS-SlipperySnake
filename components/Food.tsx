import React from 'react';

interface FoodProps {
    food: { x: number; y: number };
}

export const Food: React.FC<FoodProps> = ({ food }) => {
    return (
        <div
            style={{
                gridColumnStart: food.x,
                gridRowStart: food.y,
                backgroundColor: '#FF0000',
                border: '1px solid #000000',
            }}
        />
    );
};