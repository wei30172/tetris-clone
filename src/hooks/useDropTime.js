import { useState, useCallback, useEffect } from "react";

const DEFAULT_DROP_TIME = 1000;
const MINIMUM_DROP_TIME = 100;
const SPEED_INCREMENT = 150;

export const useDropTime = ({ gameStats }) => {
  const [dropTime, setDropTime] = useState(DEFAULT_DROP_TIME);
  const [previousDropTime, setPreviousDropTime] = useState();

  const resumeDropTime = useCallback(() => {
    if (!previousDropTime) {
      return;
    }
    setDropTime(previousDropTime);
    setPreviousDropTime(null);
  }, [previousDropTime]);

  const pauseDropTime = useCallback(() => {
    if (dropTime) {
      setPreviousDropTime(dropTime);
    }
    setDropTime(null);
  }, [dropTime, setPreviousDropTime]);

  useEffect(() => {
    const speed = SPEED_INCREMENT * (gameStats?.level - 1);
    const newDropTime = Math.max(DEFAULT_DROP_TIME - speed, MINIMUM_DROP_TIME);

    setDropTime(newDropTime);
  }, [gameStats?.level, setDropTime]);

  return [dropTime, pauseDropTime, resumeDropTime];
};
