import './App.css';
import Board from './components/grid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> Tic Tac Toe Game</p>
      </header>
      <main className="App-body">
          <Board />
      </main>
    </div>
  );
}

export default App;
