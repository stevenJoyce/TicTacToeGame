import { useState, useEffect } from "react";
import { calculateWinner, draw, nextPlayer, nextMove } from "./gameLogic";
import Square from "./square";
import "../App.css"

function BestOf() {
  const bestOfOptions = [3, 5, 7]; // Options for best of series

  const [bestOf, setBestOf] = useState(3); // Default to best of 3 games
  const needed = Math.ceil(bestOf / 2);

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  //generate the winner and winning line
  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const drawGame = draw(squares);

  //Adding a scoreboard to keep track of the score
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  const [matchWinner, setMatchWinner] = useState(null);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const updatedSquares = nextMove(squares, i, isXNext);
    setSquares(updatedSquares);
    setIsXNext(!isXNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  function seriesReset() {
    setXWins(0);
    setOWins(0);
    setDraws(0);
    setGamesPlayed(0);
    setMatchWinner(0);
    handleReset();
  }

  //How to update the score when a round ends
  useEffect(() => {
    if (!winner && !drawGame) return;

    if (winner === "X") setXWins((prev) => prev + 1);
    if (winner === "O") setOWins((prev) => prev + 1);
    if (!winner && drawGame) setDraws((prev) => prev + 1);

    setGamesPlayed((prev) => prev + 1);
  }, [winner, drawGame]);

  let gameStatus = matchWinner
    ? `Match Winner: ${matchWinner}`
    : winner
      ? `Winner: ${winner}`
      : drawGame
        ? "Draw!"
        : `Next player: ${nextPlayer(isXNext)}`;

  return (
    <div className="best-of-container">
      {/* Best-of selector */}
      <label htmlFor="bestOfSelect">Best of:</label>
      <select
        id="bestOfSelect"
        value={bestOf}
        onChange={(e) => {
          setBestOf(Number(e.target.value));
          seriesReset(); // reset series when changing best-of mode
        }}
      >
        {bestOfOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className="game-container">
        {/* Board */}
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

        {/* Scoreboard */}
        <div className="scoreboard">
          <h3>Scoreboard</h3>
          <p>X Wins: {xWins}</p>
          <p>O Wins: {oWins}</p>
          <p>Draws: {draws}</p>
          <p>Needed to win series: {needed}</p>
        </div>

        {/* Status */}
        <div className="status">
          <h2>{gameStatus}</h2>
        </div>

        {/* Buttons */}
        {(winner || drawGame) && !matchWinner && (
          <button className="reset-button" onClick={handleReset}>
            Next Round
          </button>
        )}

        {matchWinner && (
          <button className="reset-button" onClick={seriesReset} id="bin">
            Start New Series
          </button>
        )}
      </div>
    </div>
  );
}

export default BestOf;
