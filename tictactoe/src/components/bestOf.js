import { useState, useEffect } from "react";
import { calculateWinner, draw, nextPlayer, nextMove } from "./gamecore/gameLogic";
import Square from "./icons/square";
import ProgressBar from "./gamecore/progressBar";
import GameHistory from "./gamecore/gameHistory";
import SeriesHistory from "./gamecore/seriesHistory";
import Scoreboard from "./gamecore/scoreboard";
import { recordGameResult } from "./gamecore/stats";
import aiChoice from "./ai/aiChoice";
import "../App.css";

function BestOf() {
  const bestOfOptions = [3, 5, 7]; // Options for best of series

  const [bestOf, setBestOf] = useState(3); // Default to best of 3 games
  const needed = Math.ceil(bestOf / 2);

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // generate the winner and winning line
  const result = calculateWinner(squares);
  const winner = result?.player;
  const winningLine = result?.line || [];
  const drawGame = draw(squares);

  // Scoreboard state
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  // Guard to prevent double-counting rounds
  const [roundProcessed, setRoundProcessed] = useState(false);

  const [matchWinner, setMatchWinner] = useState(null);
  const [seriesWinner, setSeriesWinner] = useState("");

  const [cpuEnabled, setCpuEnabled] = useState(true);

  const [history, setHistory] = useState([]);
  const [seriesHistory, setSeriesHistory] = useState([]);

  function handleClick(i) {
    if (squares[i] || winner) return;
    // If CPU is enabled, human is X and it must be X's turn
    if (cpuEnabled && !isXNext) return;

    const updatedSquares = nextMove(squares, i, isXNext);
    setSquares(updatedSquares);
    setIsXNext(!isXNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setRoundProcessed(false);
  }

  function seriesReset() {
    setXWins(0);
    setOWins(0);
    setDraws(0);
    setGamesPlayed(0);
    setMatchWinner(null);
    handleReset();
    setSeriesWinner(null);
    setHistory([]);
  }

  // CPU MOVE EFFECT
  useEffect(() => {
    if (winner || drawGame) return;
    if (!cpuEnabled) return;
    if (isXNext) return; // O is CPU's turn

    // Read difficulty live from localStorage
    const currentAiLevel = localStorage.getItem("aiLevel") || "medium";
    const aiMove = aiChoice(squares, "O", "X", currentAiLevel);

    if (aiMove !== null && aiMove !== undefined && squares[aiMove] === null) {
      const updatedSquares = nextMove(squares, aiMove, false);

      const timer = setTimeout(() => {
        setSquares(updatedSquares);
        setIsXNext(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [squares, winner, drawGame, cpuEnabled, isXNext]); // Removed unused aiLevel dependency

 // SCORE UPDATE & LIFETIME STATS RECORDING
  useEffect(() => {
    if ((!winner && !drawGame) || roundProcessed) return;

    setRoundProcessed(true);

    if (winner === "X") {
      setXWins((prev) => prev + 1);
      if (cpuEnabled) recordGameResult("win");
    } else if (winner === "O") {
      setOWins((prev) => prev + 1);
      if (cpuEnabled) recordGameResult("loss");
    } else if (drawGame) {
      setDraws((prev) => prev + 1);
      if (cpuEnabled) recordGameResult("draw");
    }

    setGamesPlayed((prev) => prev + 1);

    setHistory((prev) => [
      ...prev,
      winner
        ? `Round ${prev.length + 1}: ${winner} wins`
        : `Round ${prev.length + 1}: Draw`,
    ]);
  }, [winner, drawGame, roundProcessed, cpuEnabled]);

  // CHECK SERIES WINNER
  useEffect(() => {
    if (xWins === needed) {
      setSeriesWinner("X");
      setMatchWinner("X");

      setSeriesHistory((prev) => [
        ...prev,
        `Series (Best of ${bestOf}): X wins (${xWins}-${oWins}, ${draws} draws)`,
      ]);
    }
    if (oWins === needed) {
      setSeriesWinner("O");
      setMatchWinner("O");

      setSeriesHistory((prev) => [
        ...prev,
        `Series (Best of ${bestOf}): O wins (${oWins}-${xWins}, ${draws} draws)`,
      ]);
    }
  }, [xWins, oWins, needed, bestOf, draws]);

  useEffect(() => {
    if (gamesPlayed >= bestOf && !seriesWinner) {
      if (xWins > oWins) {
        setSeriesWinner("X");
        setMatchWinner("X");
      } else if (oWins > xWins) {
        setSeriesWinner("O");
        setMatchWinner("O");
      } else {
        setSeriesWinner("Draw");
        setMatchWinner("Draw");
      }
    }
  }, [gamesPlayed, bestOf, xWins, oWins, seriesWinner]);

  return (
    <div className="best-of-container">
      {/* Controls: CPU Toggle */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "15px" }}>
        <label>
          <input
            type="checkbox"
            checked={cpuEnabled}
            onChange={() => {
              setCpuEnabled(!cpuEnabled);
              seriesReset();
            }}
          />
          {" "}CPU Mode
        </label>
      </div>

      {/* Best-of selector */}
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="bestOfSelect">
          <b>BEST OF: </b>
        </label>
        <select
          id="bestOfSelect"
          value={bestOf}
          onChange={(e) => {
            setBestOf(Number(e.target.value));
            seriesReset();
          }}
        >
          {bestOfOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="game-layout">
        {/* LEFT SIDE — GRID */}
        <div className="grid-container">
          <div className="grid">
            {Array(9)
              .fill(null)
              .map((_, index) => (
                <Square
                  key={index}
                  value={squares[index]}
                  isWinningSquare={winningLine.includes(index)}
                  onSquareClick={() => handleClick(index)}
                />
              ))}
          </div>
          {(winner || drawGame) && !matchWinner && (
            <button className="reset-button" onClick={handleReset} id="btn">
              Next Round
            </button>
          )}

          {seriesWinner && (
            <div className="match-winner">
              {seriesWinner === "Draw" ? "Series is a Draw!" : `${seriesWinner} wins the series!`}
              <br />
              <button onClick={seriesReset} id="btn">
                Start New Series
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE — SCOREBOARD + PROGRESS */}
        <div className="side-panel">
          <Scoreboard
            xWins={xWins}
            oWins={oWins}
            draws={draws}
            needed={needed}
          />
          <ProgressBar xWins={xWins} oWins={oWins} needed={needed} />
        </div>

        {/* COLUMN 3 — HISTORY */}
        <div className="history-panel">
          <GameHistory history={history} /> <br />
          <SeriesHistory seriesHistory={seriesHistory} />
        </div>
      </div>
    </div>
  );
}

export default BestOf;