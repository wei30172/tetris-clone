import './guide.scss';

const Guide = () => {
  return (
    <ul className="guide">
      <li className="value">←Left</li>
      <li className="value">→Right</li>
      <li className="value">↑Rotate</li>
      <li className="value">↓Down</li>
      <li className="value">⎵Drop</li>
      <li className="value">(Q)Quit</li>
      <li className="value">(P)Pause</li>
    </ul>
  )
}

export default Guide