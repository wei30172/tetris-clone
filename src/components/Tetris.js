import "./Tetris.scss";
import { Board, GameStats, Previews, GameController, Guide } from "./index";

import { useBoard } from "../hooks/useBoard";
import { useGameStats } from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";

const Tetris = ({ setGameOver }) => {
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board] = useBoard({
    player,
    resetPlayer,
    addLinesCleared,
  });

  return (
    <div className="tetris">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews tetrominoes={player.tetrominoes} />
      <Guide />
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setPlayer={setPlayer}
        setGameOver={setGameOver}
      />
    </div>
  );
};

export default Tetris;
