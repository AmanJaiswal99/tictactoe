import React, { useRef, useEffect, useState } from 'react';

const PingPongGame = () => {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef(0);
  const [displayTimer, setDisplayTimer] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('highScore')) || 0;
  });

  const paddle = useRef({ x: 200, y: 280, width: 80, height: 10, dx: 0 });
  const ball = useRef({ x: 240, y: 150, dx: 3, dy: -3, radius: 6 });

  useEffect(() => {
    let animationId;
    let timerInterval;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Paddle
      ctx.fillStyle = 'black';
      ctx.fillRect(paddle.current.x, paddle.current.y, paddle.current.width, paddle.current.height);

      // Ball
      ctx.beginPath();
      ctx.arc(ball.current.x, ball.current.y, ball.current.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'black';
      ctx.fill();

      // Timer and High Score inside canvas
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';

      if (gameOver) {
        ctx.font = '20px Arial';
        ctx.fillText('Game Over! Press Start', 130, 150);
      }
    };

    const update = () => {
      // Move paddle
      paddle.current.x += paddle.current.dx;
      paddle.current.x = Math.max(0, Math.min(canvas.width - paddle.current.width, paddle.current.x));

      // Move ball
      ball.current.x += ball.current.dx;
      ball.current.y += ball.current.dy;

      // Bounce off walls
      if (ball.current.x - ball.current.radius <= 0 || ball.current.x + ball.current.radius >= canvas.width)
        ball.current.dx *= -1;
      if (ball.current.y - ball.current.radius <= 0)
        ball.current.dy *= -1;

      // Paddle collision
      if (
        ball.current.y + ball.current.radius >= paddle.current.y &&
        ball.current.x >= paddle.current.x &&
        ball.current.x <= paddle.current.x + paddle.current.width
      ) {
        ball.current.dy *= -1;
        ball.current.y = paddle.current.y - ball.current.radius;
      }

      // Game over
      if (ball.current.y - ball.current.radius > canvas.height) {
        setRunning(false);
        setGameOver(true);
        clearInterval(timerInterval);
        if (timerRef.current > highScore) {
          localStorage.setItem('highScore', timerRef.current.toString());
          setHighScore(timerRef.current); // Update high score dynamically
        }
        cancelAnimationFrame(animationId);
        return;
      }
    };

    const gameLoop = () => {
      update();
      draw();
      animationId = requestAnimationFrame(gameLoop);
    };

    if (running) {
      timerRef.current = 0;
      setDisplayTimer(0);
      timerInterval = setInterval(() => {
        timerRef.current += 1;
        setDisplayTimer(timerRef.current); // Update displayTimer
      }, 1000);
      gameLoop();
    }

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(timerInterval);
    };
  }, [running, highScore]);

  const handleKeyDown = (e) => {
    if (e.key === 'a' || e.key === 'ArrowLeft') paddle.current.dx = -5;
    if (e.key === 'd' || e.key === 'ArrowRight') paddle.current.dx = 5;
  };

  const handleKeyUp = (e) => {
    if (['a', 'd', 'ArrowLeft', 'ArrowRight'].includes(e.key)) paddle.current.dx = 0;
  };

  const handleTouchStart = (e) => {
    const x = e.touches[0].clientX;
    const canvasLeft = canvasRef.current.getBoundingClientRect().left;
    const canvasMid = canvasLeft + canvasRef.current.width / 2;
    paddle.current.dx = x < canvasMid ? -5 : 5;
  };

  const handleTouchEnd = () => {
    paddle.current.dx = 0;
  };

  const startGame = () => {
    paddle.current.x = 200;
    paddle.current.dx = 0;
    ball.current.x = 240;
    ball.current.y = 150;
    ball.current.dx = 3;
    ball.current.dy = -3;
    timerRef.current = 0;
    setDisplayTimer(0);
    setGameOver(false);
    setRunning(true);
  };

  return (
    <div
      className="ping-pong-game"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ outline: 'none', userSelect: 'none' }}
    >
      <h3>⏱ Time: {displayTimer}s | High Score: {highScore}s</h3>
      <canvas ref={canvasRef} width={500} height={300} style={{ border: '1px solid black' }} />
      <br />
      <button onClick={startGame}>{gameOver ? 'Restart' : 'Start'}</button>
    </div>
  );
};

export default PingPongGame;
