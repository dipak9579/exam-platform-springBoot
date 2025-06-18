// components/Timer.jsx
import React, { useEffect, useState } from 'react';
import "../styles/Timer.css"

const Timer = ({ minutes, onTimeUp }) => {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((sec) => {
        if (sec <= 1) {
          clearInterval(interval);
          onTimeUp();
        }
        return sec - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return <div className="timer">Time Left: {formatTime()}</div>;
};

export default Timer;
