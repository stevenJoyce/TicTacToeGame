import Square from './square';
import { calculateWinner, draw, nextPlayer, nextMove } from './gameLogic';

import { useState } from 'react';



function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handleClick(i) {
    const result = calculateWinner(squares);
    if (result || squares[i]) {
      return;
    }
    const updated = nextMove(squares, i, isXNext);
    setSquares(updated);
    setIsXNext(!isXNext);
  }

  const result = calculateWinner(squares);
  const winningPlayer = result?.winner;
  const winningLine = result?.line || [];
  const drawGame = !winningPlayer && draw(squares);

  let gameStatus = winningPlayer
    ? `Winner: ${winningPlayer}`
    : drawGame
    ? "Draw!"
    : `Next player: ${nextPlayer(isXNext)}`;

  return (
    <>
      <div className="status">{gameStatus}</div>
      <div className="board">
        {[0,3,6].map(row => (
          <div className="board-row" key={row}>
            <Square value={squares[row]} onSquareClick={() => handleClick(row)} />
            <Square value={squares[row+1]} onSquareClick={() => handleClick(row+1)} />
            <Square value={squares[row+2]} onSquareClick={() => handleClick(row+2)} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
