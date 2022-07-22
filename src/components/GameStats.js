import "./GameStats.scss";

const GameStats = ({ gameStats }) => {
  const { level, score, linesCompleted, linesPerLevel } = gameStats;

  return (
    <ul className="gameStats">
      <li>SCORE</li>
      <li className="value">{score}</li>
      <li>ROWS</li>
      <li className="value">
        {linesCompleted}/{linesPerLevel}
      </li>
      <li>LEVEL</li>
      <li className="value">{level}</li>
    </ul>
  );
};

export default GameStats;
