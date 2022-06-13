import './App.scss';
import { Game } from './components';

function App() {
  return (
    <div className="App">
      <Game rows={20} cols={10}/>
    </div>
  );
}

export default App;
