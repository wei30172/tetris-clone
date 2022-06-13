import './Menu.scss';

const Menu = ({ onClick }) => {
  return (
    <div className="Menu">
      <button className="btn" onClick={onClick}>Play Tetris</button>
    </div>
  )
}

export default Menu