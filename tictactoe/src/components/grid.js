import Square from './square';
import { calculateWinner, draw, nextPlayer, nextMove } from './gameLogic';
import { useState } from 'react';
function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const drawGame = draw(squares);

  function handleClick(i) {
    if(squares[i] || winner) return;

    const updatedSquares = nextMove(squares, i, isXNext);
    setSquares(updatedSquares);
    setIsXNext(!isXNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  let gameStatus = winner
    ? `Winner: ${winner}`
    : drawGame
    ? "Draw!"
    : `Next player: ${nextPlayer(isXNext)}`;

  return (
    <div className="game-container">
      <div className="status">{gameStatus}</div>
      <div className="board">
        {Array(9).fill(null).map((_, index) => (
          <Square
            key={index}
            value={squares[index]}
            isWinningSquare={winningLine.includes(index)}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
      {(winner || drawGame) && (
        <button className="reset-button" onClick={handleReset}>
          Reset Game
        </button>
      )}
    </div>
  );
}

export default Board;
