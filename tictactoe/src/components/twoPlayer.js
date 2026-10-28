import Square from "./icons/square";
import { calculateWinner, draw, nextPlayer, nextMove } from "./gamecore/gameLogic";
import { useState, useEffect } from "react";
import GameHistory from "./gamecore/gameHistory";

function TwoPlayer() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
 
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [isDraw, setIsDraw] = useState(false);

  const [history, setHistory] = useState([]);

  function handleClick(i) {
    if (squares[i] || winner || isDraw) return;

    const updatedSquares = nextMove(squares, i, isXNext);
    setSquares(updatedSquares);
    setIsXNext(!isXNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
    setIsDraw(false);
  }

  useEffect(() => {
    const result = calculateWinner(squares);

    if (result) {
      setWinner(result.player);
      setWinningLine(result.line);  
      
      setHistory((prevHistory) => [
        ...prevHistory, `Winner: ${result.player}`
      ]);  
      
    return;
    }
    if (draw(squares)) {
      setIsDraw(true);
      setHistory((prevHistory) => [
        ...prevHistory, "Draw!"]);  
    }
  }, [squares]);

  let gameStatus = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "Draw!"
      : `Next player: ${nextPlayer(isXNext)}`;

  return (
    <div className="game-container">
      <br />
      <br />
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

      <div className="status">
        <h2>{gameStatus}</h2>
      </div>
      <div className="history-panel">
        <GameHistory history={history} /> <br />
      </div>
      {(winner || isDraw) && (
        <button className="reset-button" onClick={handleReset} id="btn">
          Reset Game
        </button>
      )}
    </div>
  );
}

export default TwoPlayer;
