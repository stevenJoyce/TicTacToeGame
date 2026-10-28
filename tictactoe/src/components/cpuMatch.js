import React, { useState, useEffect } from "react";
import { calculateWinner } from "./gamecore/gameLogic";
import GameHistory from "./gamecore/gameHistory";
import Square from "./icons/square";
import aiChoice from "./ai/aiChoice";
import { recordGameResult } from "./gamecore/stats";
import "../App.css";
import { sounds } from "./gamecore/sounds";

function CpuGame() {
  const player = "X";
  const aiPlayer = "O";

  const [grid, setGrid] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(player);

  const [history, setHistory] = useState([]);

  // Guard flag to ensure stats are logged exactly once per round
  const [roundProcessed, setRoundProcessed] = useState(false);

  // RESET GAME
  const resetGame = () => {
    setGrid(Array(9).fill(null));
    setWinner(null);
    setWinningLine([]);
    setCurrentPlayer(player);
    setRoundProcessed(false); // Reset for the next round
  };

  // PLAYER MOVE
  function handleClick(index) {
    if (grid[index] || winner || currentPlayer !== player) return;

    const nGrid = [...grid];
    nGrid[index] = player;

    setGrid(nGrid);
    setCurrentPlayer(aiPlayer);

  }

  // AI MOVE
  useEffect(() => {
    if (winner) return;
    if (currentPlayer !== aiPlayer) return;

    const currentAiLevel = localStorage.getItem("aiLevel") || "medium";
    const aiMove = aiChoice(grid, aiPlayer, player, currentAiLevel);

    if (aiMove !== null && grid[aiMove] === null) {
      const updatedGrid = [...grid];
      updatedGrid[aiMove] = aiPlayer;

      const timer = setTimeout(() => {
        setGrid(updatedGrid);
        setCurrentPlayer(player);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, grid, winner]);

  // WINNER / DRAW CHECK & LIFETIME STATS RECORDING
  useEffect(() => {
    // If the round has already been recorded, stop
    if (roundProcessed) return;

    const result = calculateWinner(grid);
    const isDraw = grid.every((cell) => cell !== null);

    // WINNER
    if (result) {
      setRoundProcessed(true);
      setWinner(result.player);
      setWinningLine(result.line);

      recordGameResult(result.player);

      if (result.player === player) {
        sounds.win();
      } else {
        sounds.loss();
      }

      setHistory((prev) => [
        ...prev,
        `Round ${prev.length + 1}: ${result.player} wins`,
      ]);
      return;
    }

    // DRAW
    if (isDraw) {
      setRoundProcessed(true);
      setWinner("Draw");
      sounds.draw();
      recordGameResult("draw");

      setHistory((prev) => [...prev, `Round ${prev.length + 1}: Draw`]);
    }
  }, [grid, roundProcessed]);

  return (
    <div className="cpu-container">
      {winner && (
        <div className="winner-box">
          {winner === "Draw" ? "It's a Draw!" : `${winner} wins!`}
        </div>
      )}

      {/* Game Grid */}
      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <Square
              key={index}
              value={grid[index]}
              isWinningSquare={winningLine.includes(index)}
              onSquareClick={() => handleClick(index)}
            />
          ))}
      </div>
      <br />
      <div className="history-panel">
        <GameHistory history={history} /> <br />
      </div>

      {/* Reset Button */}
      <button onClick={resetGame} id="btn">
        Reset Game
      </button>
    </div>
  );
}

export default CpuGame;
