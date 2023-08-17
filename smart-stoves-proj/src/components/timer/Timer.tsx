import { useEffect } from "react";

import styles from "./styles.module.scss";

interface TimerProps {
  setTimerValue: React.Dispatch<React.SetStateAction<number>>;
  timerValue: number;
}

const Timer: React.FC<TimerProps> = ({ timerValue, setTimerValue }) => {
  useEffect(() => {
    let interval: any;
    if (timerValue > 0) {
      interval = setInterval(() => {
        setTimerValue((prevTimer: number) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerValue]);

  useEffect(() => {
    setTimerValue(timerValue);
  }, [timerValue, setTimerValue]);

  const minutes = Math.floor(timerValue / 60);
  const seconds = timerValue % 60;

  return (
    <span className={styles.timer}>{`${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`}</span>
  );
};

export default Timer;
