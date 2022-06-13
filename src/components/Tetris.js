import './Tetris.scss';
import { Board, GameStats, Previews } from './index';

import { useBoard } from '../hooks/useBoard';
import { useGameStats } from '../hooks/useGameStats';
import { usePlayer } from "../hooks/usePlayer";

const Tetris = ({ rows, cols, setGameOver }) => {
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, resetPlayer] = usePlayer();
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
    </div>
  )
}

export default Tetris