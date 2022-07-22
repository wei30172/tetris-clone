import "./Game.scss";
import { Menu, Tetris } from "./index";
import { useGameOver } from "../hooks/useGameOver";

const Game = () => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  const start = () => resetGameOver();

  return (
    <div className="game">
      {gameOver ? <Menu start={start} /> : <Tetris setGameOver={setGameOver} />}
    </div>
  );
};

export default Game;
