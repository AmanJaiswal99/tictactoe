import React, { useEffect, useRef, useState } from "react";

export default function Dino() {
  const dinoRef = useRef(null);
  const obstacleRef = useRef(null);
  const [isJumping, setIsJumping] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleJump = () => {
    if (isJumping || isGameOver) return;

    setIsJumping(true);
    const dino = dinoRef.current;

    dino.classList.add("jump");
    setTimeout(() => {
      dino.classList.remove("jump");
      setIsJumping(false);
    }, 500);
  };

  const resetGame = () => {
    setIsGameOver(false);
    setScore(0);

    const obstacle = obstacleRef.current;
    obstacle.style.animation = "none";
    void obstacle.offsetHeight; // Trigger reflow to restart animation
    obstacle.style.animation = "obstacleMove 2s infinite linear";
    obstacle.style.left = "600px";
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        if (isGameOver) {
          resetGame();
        } else {
          handleJump();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameOver]);

  useEffect(() => {
    const checkCollision = setInterval(() => {
      const dino = dinoRef.current;
      const obstacle = obstacleRef.current;

      const dinoRect = dino.getBoundingClientRect();
      const obstacleRect = obstacle.getBoundingClientRect();

      const isColliding =
        dinoRect.left < obstacleRect.right &&
        dinoRect.right > obstacleRect.left &&
        dinoRect.top < obstacleRect.bottom &&
        dinoRect.bottom > obstacleRect.top;

      if (isColliding && !isGameOver) {
        setIsGameOver(true);
        obstacle.style.animation = "none";
        obstacle.style.left = `${obstacleRect.left}px`;
      } else if (!isGameOver) {
        setScore(prev => prev + 1);
      }
    }, 50);

    return () => clearInterval(checkCollision);
  }, [isGameOver]);

  return (
    <div className="game-container">
      <h2>Dino Jump Game</h2>
      <p>Score: {score}</p>
      <div className="game">
        <div ref={dinoRef} className="dino" />
        <div ref={obstacleRef} className="obstacle" />
      </div>
      {isGameOver && <h3>Game Over! Press Space to restart.</h3>}
    </div>
  );
}
