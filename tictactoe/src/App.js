import "./App.css";
import Grid from "./components/grid";
import { useState } from "react";
import BestOf from "./components/bestOf";

function App() {
  const [series, setSeries] = useState(false);
  const [oneRound, setOneRound] = useState(false);
  const [btns, setBtns] = useState(true);
  const [home, setHome] = useState(false);

  const handleSeriesClick = () => {
    setSeries(true);
    setOneRound(false);
    setBtns(false);
    setHome(true);
  };

  const handleOneRoundClick = () => {
    setSeries(false);
    setOneRound(true);
    setBtns(false);
    setHome(true);
  };

  const homePage = () => {
    setBtns(true);
    setOneRound(false);
    setSeries(false);
    setHome(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p> Tic Tac Toe Game</p>
      </header>
      <main className="App-body">
        {btns && (
          <>
            <button
              className="one-round-button"
              onClick={handleOneRoundClick}
              id="btn"
            >
              One Round{" "}
            </button>
            <button
              className="series-button"
              onClick={handleSeriesClick}
              id="btn"
            >
              {" "}
              Best of Series
            </button>
          </>
        )}
        {oneRound && <Grid />}
        {series && <BestOf />}

        {
          home &&
          <button onClick={homePage} id="btn"> Back to Home </button>
        }

        
      </main>
    </div>
  );
}

export default App;
