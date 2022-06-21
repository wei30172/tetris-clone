import { useState, useEffect } from "react";

import { buildBoard, nextBoard } from "../utils/Board";

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 10;

export const useBoard = ({
  rows = BOARD_WIDTH,
  cols = BOARD_HEIGHT,
  player,
  resetPlayer,
  addLinesCleared
}) => {
  const [board, setBoard] = useState(buildBoard({ rows, cols }));

  useEffect(() => {
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared
      })
    );
  }, [player, resetPlayer, addLinesCleared]);

  return [board];
};