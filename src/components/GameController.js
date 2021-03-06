import "./GameController.scss";
import { useRef, useEffect } from "react";

import { Action, actionForKey, actionIsDrop } from "../utils/Input";
import { playerController } from "../utils/PlayerController";

import { useDropTime } from "../hooks/useDropTime";
import { useInterval } from "../hooks/useInterval";

const GameController = ({
  board,
  gameStats,
  player,
  setPlayer,
  setGameOver,
}) => {
  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({ gameStats });

  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
    });
  };

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  const onKeyDown = ({ code }) => {
    // console.log(code);
    const action = actionForKey(code);

    if (action === Action.Pause) {
      dropTime ? pauseDropTime() : resumeDropTime();
    } else if (action === Action.Quit) {
      setGameOver(true);
    } else {
      if (actionIsDrop(action)) pauseDropTime();
      if (!dropTime) return;
      handleInput({ action });
    }
  };

  const onKeyUp = ({ code }) => {
    // console.log(code);
    const action = actionForKey(code);
    if (actionIsDrop(action)) resumeDropTime();
  };

  return (
    <div
      className="gameController"
      ref={inputElement}
      role="button"
      tabIndex="0"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    />
  );
};

export default GameController;
