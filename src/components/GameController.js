import "./GameController.scss";

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
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({ gameStats });

  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver
    });
  };

  // useInterval(() => {
  //   handleInput({ action: Action.SlowDrop });
  // }, dropTime);

  const onKeyUp = ({ code }) => {
    // console.log(code);
    const action = actionForKey(code);
    if (actionIsDrop(action)) resumeDropTime();
  };

  const onKeyDown = ({ code }) => {
    // console.log(code);
    const action = actionForKey(code);

    if (action === Action.Pause) {
      if (dropTime) {
        pauseDropTime();
      } else {
        resumeDropTime();
      }
    } else if (action === Action.Quit) {
      setGameOver(true);
    } else {
      if (actionIsDrop(action)) pauseDropTime();
      if (!dropTime) return;
      handleInput({ action });
    }
  };

  return (
    <input
      className="GameController"
      type="text"
      autoFocus
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    />
  );
}

export default GameController