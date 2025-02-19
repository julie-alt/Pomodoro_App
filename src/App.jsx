import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import clockMp3 from "./media/clock.mp3";
import bellMp3 from "./media/bell.mp3";
import start from "./media/start.svg";
import pause from "./media/pause.svg";
import reset from "./media/reset.svg";
import logo from "./media/logo.png";
import "./App.css";

//assets
const clockSound = new Howl({
  src: [clockMp3],
  loop: true,
});
const bellSound = new Howl({
  src: [bellMp3],
});

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeMin, setTimeMin] = useState(25);
  const [timeSec, setTimeSec] = useState(0);
  const [isWorkMode, setIsWorkMode] = useState(true);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        //Decrease seconds
        if (timeSec > 0) {
          setTimeSec(timeSec - 1);
        }
        //Decrease minutes
        if (timeSec === 0) {
          setTimeMin(timeMin - 1);
          setTimeSec(59);
        }
        //time ends
        if (timeMin === 0 && timeSec === 0) {
          setTimeMin(0);
          setTimeSec(0);
          setIsRunning(false);
          clockSound.stop();
          bellSound.play();
          if (isWorkMode) {
            startShortBreak();
          } else {
            startWork();
          }
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, timeMin, timeSec, isWorkMode]);

  const startWork = () => {
    setIsWorkMode(true);
    setTimeMin(25);
    setTimeSec(0);
    setIsRunning(false);
    clockSound.stop();
  };
  const startShortBreak = () => {
    setIsWorkMode(false);
    setTimeMin(5);
    setTimeSec(0);
    setIsRunning(false);
    clockSound.stop();
  };

  //Click handlers
  const startTimer = () => {
    setIsRunning(true);
    clockSound.play();
  };
  const pauseTimer = () => {
    setIsRunning(false);
    clockSound.pause();
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeMin(isWorkMode ? 25 : 5);
    setTimeSec(0);
    clockSound.stop();
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Pomodoro Timer</h1>
        <img src={logo} alt="logo" />
      </div>

      <h2>{isWorkMode ? "Work Time" : "Short Break"}</h2>

      <div className="timer">
        <div className="timeCard">
          <p>
            {timeMin}:{timeSec < 10 ? "0" + timeSec : timeSec}
          </p>
        </div>

        <div className="btn-container">
          <div className="btn">
            <button className="start-btn" onClick={startTimer}>
              <img src={start} alt="start" />
              <span>Start</span>
            </button>
          </div>

          <div className="btn">
            <button className="pause-btn" onClick={pauseTimer}>
              <img src={pause} alt="pause" />
              <span> Pause</span>
            </button>
          </div>

          <div className="btn">
            <button className="reset-btn" onClick={resetTimer}>
              <img src={reset} alt="reset" />
              <span> Reset</span>
            </button>
          </div>

          <div className="btn">
            <button
              className="short-break-btn"
              onClick={startShortBreak}
              disabled={!isWorkMode}
            >
              Short Break
            </button>
          </div>

          <div className="btn">
            <button
              className="work-btn"
              onClick={startWork}
              disabled={isWorkMode}
            >
              Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
