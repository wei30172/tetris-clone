import "./Menu.scss";

const Menu = ({ start }) => {
  return (
    <div className="menu">
      <button className="btn" onClick={start}>
        Play Tetris
      </button>
    </div>
  );
};

export default Menu;
