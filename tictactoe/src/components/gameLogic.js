
export function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2], [3, 4, 5],[6, 7, 8],
    [0, 3, 6], [1, 4, 7],[2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for(let [a, b, c] of winningLines) {
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
}
return null;
}

export function draw(squares) {
    const hasWinner = Boolean(calculateWinner(squares));
    const isFull = squares.every(Boolean);
    return !hasWinner && isFull;
}

export function nextPlayer(isXNext) {
  return isXNext ? "X" : "O";
}

export function nextMove( squares, index, isXNext ) {
    if(squares[index]) return squares;

    const next = squares.slice();
    next[index] = nextPlayer(isXNext);
    return next;
}
