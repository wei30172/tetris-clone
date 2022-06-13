import './Tetris.scss';
import { Board, GameStats, Previews, GameController } from './index';

import { useBoard } from '../hooks/useBoard';
import { useGameStats } from '../hooks/useGameStats';
import { usePlayer } from "../hooks/usePlayer";

const Tetris = ({ rows, cols, setGameOver }) => {
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board] = useBoard({
    rows,
    cols,
    player,
    resetPlayer,
    addLinesCleared
  });

  return (
    <div className="Tetris">
      <Board board={board}/>
      <GameStats gameStats={gameStats} />
      <Previews tetrominoes={player.tetrominoes} />
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setPlayer={setPlayer}
        setGameOver={setGameOver}
      />
    </div>
  )
}

export default Tetris