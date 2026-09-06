import './App.css';
import Grid from './components/grid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> Tic Tac Toe Game</p>
      </header>
      <main className="App-body">
          <Grid />
      </main>
    </div>
  );
}

export default App;
