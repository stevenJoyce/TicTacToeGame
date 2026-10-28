import "./App.css";
import Classic from "./components/classic";
import { useState } from "react";
import BestOf from "./components/bestOf";
import SettingsPage from "./components/settings";
import StatsPage from "./components/statsPage";
import { IoSettingsSharp } from "react-icons/io5";

function App() {
  const [series, setSeries] = useState(false);
  const [oneRound, setOneRound] = useState(false);
  const [btns, setBtns] = useState(true);
  const [home, setHome] = useState(false);
  const [settings, setSettings] = useState(false);
  const [stats, setStats] = useState(false); // New stats state

  const handleSeriesClick = () => {
    setSeries(true);
    setOneRound(false);
    setBtns(false);
    setHome(true);
    setSettings(false);
    setStats(false);
  };

  const handleOneRoundClick = () => {
    setSeries(false);
    setOneRound(true);
    setBtns(false);
    setHome(true);
    setSettings(false);
    setStats(false);
  };

  const homePage = () => {
    setBtns(true);
    setOneRound(false);
    setSeries(false);
    setHome(false);
    setSettings(false);
    setStats(false);
  }

  const handleSettingsClick = () => {
    setSettings(true);
    setStats(false);
    setBtns(false);
    setOneRound(false);
    setSeries(false);
    setHome(true);
  };

  const handleStatsClick = () => {
    setStats(true);
    setSettings(false);
    setBtns(false);
    setOneRound(false);
    setSeries(false);
    setHome(true);
  };

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
        {oneRound && <Classic />}
        {series && <BestOf />}

        {home && (
          <button onClick={homePage} id="btn"> Back to Home </button>
        )}

        {/* Navigation buttons for Settings and Stats */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
          <button onClick={handleSettingsClick} id="btn" title="Settings"> 
            <IoSettingsSharp /> 
          </button>
          <button onClick={handleStatsClick} id="btn"> 
            Stats 
          </button>
        </div>
        
        {settings && <SettingsPage />}
        {stats && <StatsPage />}

      </main>
    </div>
  );
}

export default App;
