import Square from './square';
import { calculateWinner, draw, nextPlayer, nextMove } from './gameLogic';
import { useState, useEffect } from 'react';
function Grid() {
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

  //How to update the score when a player wins or when there is a draw
  useEffect(() => {
    if(winner === "X") setXWins(prev => prev + 1);
    if(winner === "O") setOWins(prev => prev + 1);
    if(!winner && drawGame) setDraws(prev => prev + 1);
  }, [winner, drawGame]);

  let gameStatus = winner
    ? `Winner: ${winner}`
    : drawGame
    ? "Draw!"
    : `Next player: ${nextPlayer(isXNext)}`;

  return (
    <div className="game-container">
      <br />
      <br />
      <div className="grid">
        {Array(9).fill(null).map((_, index) => (
          <Square
            key={index}
            value={squares[index]}
            isWinningSquare={winningLine.includes(index)}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div className="scoreboard">
        <h3>Scoreboard</h3>
        <p>X Wins: {xWins}</p>
        <p>O Wins: {oWins}</p>
        <p>Draws: {draws}</p>
      </div>
      
      <div className="status"><h2>{gameStatus}</h2></div>
      {(winner || drawGame) && (
        <button className="reset-button" onClick={handleReset}>
          Reset Game
        </button>
      )}
    </div>
  );
}

export default Grid;
