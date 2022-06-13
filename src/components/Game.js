import { Menu, Tetris } from './index';
import { useGameOver } from '../hooks/useGameOver';

const Game = ({ rows, cols }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  const start = () => resetGameOver();

  return (
    <div className="Game">
      {gameOver ? (
        <Menu onClick={start}/>
      ) : (
        <Tetris rows={20} cols={10} setGameOver={setGameOver}/>
      )}
      
    </div>
  )
}

export default Game