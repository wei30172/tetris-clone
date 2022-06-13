import { useState, useCallback } from "react";

const buildGameStats = () => ({
  level: 1,
  linesCompleted: 0,
  linesPerLevel: 10,
  points: 0
});

export const useGameStats = () => {
  const [gameStats, setGameStats] = useState(buildGameStats());

  const addLinesCleared = useCallback((lines) => {
    setGameStats((perv) => {
      const points = perv.points + lines * 100;
      const { linesPerLevel } = perv;
      const newLinesCompleted = perv.linesCompleted + lines;
      const level =
        newLinesCompleted >= linesPerLevel
          ? perv.level + 1
          : perv.level;
      const linesCompleted = newLinesCompleted % linesPerLevel;
  
      return {
        level,
        linesCompleted,
        linesPerLevel,
        points
      };
    });
  }, [])

  return [gameStats, addLinesCleared];
}