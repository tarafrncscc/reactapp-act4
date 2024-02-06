import React, { useState, useEffect } from "react";

const Pomodoro = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(sessionLength * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [isSession, setIsSession] = useState(true);

  // Update timerSeconds whenever sessionLength changes
  useEffect(() => {
    setTimerSeconds(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    let interval;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      clearInterval(interval);
      setTimerActive(false);
      if (isSession) {
        setIsSession(false);
        setTimerSeconds(breakLength * 60);
      } else {
        setIsSession(true);
        setTimerSeconds(sessionLength * 60);
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds, isSession, sessionLength, breakLength]);

  const startTimer = () => {
    setTimerActive(true);
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setIsSession(true);
    setTimerSeconds(sessionLength * 60); // Reset to the updated sessionLength value
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="pomodoro-container">
      <h2>Pomodoro Timer</h2>
      <div className="timer-display">{formatTime(timerSeconds)}</div>
      <div className="controls">
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="settings">
        <div>
          <label>
            Session Length (minutes):
            <input
              type="number"
              value={sessionLength}
              onChange={(e) => setSessionLength(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
