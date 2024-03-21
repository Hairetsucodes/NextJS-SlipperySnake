'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Snake } from './Snake';
import { Food } from './Food';

const BOARD_SIZE = 20;

export const GameBoard = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    const gameboardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gameStarted) {
            const intervalId = setInterval(() => {
                moveSnake();
            }, 200);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [snake, gameStarted]);

    const moveSnake = () => {
        const head = { ...snake[0] };

        switch (direction) {
            case 'UP':
                head.y -= 1;
                break;
            case 'DOWN':
                head.y += 1;
                break;
            case 'LEFT':
                head.x -= 1;
                break;
            case 'RIGHT':
                head.x += 1;
                break;
        }

        if (isCollision(head)) {
            setGameOver(true);
            setGameStarted(false);
            return;
        }

        const newSnake = [head, ...snake.slice(0, -1)];

        if (head.x === food.x && head.y === food.y) {
            setFood(generateRandomFood());
            setSnake([...newSnake, snake[snake.length - 1]]);
            setScore(score + 1);
        } else {
            setSnake(newSnake);
        }
    };

    const isCollision = (head: { x: any; y: any; }) => {
        if (
            head.x < 1 ||
            head.x > BOARD_SIZE ||
            head.y < 1 ||
            head.y > BOARD_SIZE
        ) {
            return true;
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }

        return false;
    };

    const generateRandomFood = () => {
        return {
            x: Math.floor(Math.random() * BOARD_SIZE) + 1,
            y: Math.floor(Math.random() * BOARD_SIZE) + 1,
        };
    };

    const handleKeyPress = (event: { key: any; }) => {
        switch (event.key) {
            case 'ArrowUp':
                setDirection('UP');
                break;
            case 'ArrowDown':
                setDirection('DOWN');
                break;
            case 'ArrowLeft':
                setDirection('LEFT');
                break;
            case 'ArrowRight':
                setDirection('RIGHT');
                break;
        }
    };

    const handleStartGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: 5, y: 5 });
        setDirection('RIGHT');
        setScore(0);
        gameboardRef.current?.focus();
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#000000'
            }}
            onKeyDown={handleKeyPress}
            tabIndex={0}
            ref={gameboardRef}
        >
            <h1 style={{color: '#00FF00'}}>Slippery Snake Matrix</h1>
            <div className={'text-white'}>Score: {score}</div>
            <div
                style={{
                    width: '400px',
                    height: '400px',
                    display: 'grid',
                    gridTemplate: `repeat(${BOARD_SIZE}, 1fr) / repeat(${BOARD_SIZE}, 1fr)`,
                    gap: '1px',
                    backgroundColor: '#1C1C1C'
                }}
            >
                <Snake snake={snake} />
                <Food food={food} />
            </div>
            {gameOver && (
                <div>
                    <div>Game Over!</div>
                    <button className={'text-white'} onClick={handleStartGame}>Restart</button>
                </div>
            )}
            {!gameStarted && !gameOver && (
                <button className={'text-white'} onClick={handleStartGame}>Start Game</button>
            )}
        </div>
    );
};
