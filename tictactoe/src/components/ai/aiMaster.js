import { calculateWinner } from "../gamecore/gameLogic";

function aiMaster(board, player, aiPlayer, humanPlayer, depth = 0) {
  const winner = calculateWinner(board);

  // Score wins based on depth (wins sooner = higher score, loses later = higher score)
  if (winner === aiPlayer) return { score: 10 - depth };
  if (winner === humanPlayer) return { score: depth - 10 };
  if (winner === "Draw") return { score: 0 };
  if (!board.includes(null)) return { score: 0 };

  const moves = [];

  board.forEach((cell, index) => {
    if (cell === null) {
      const newBoard = [...board];
      newBoard[index] = player;

      const result = aiMaster(
        newBoard,
        player === aiPlayer ? humanPlayer : aiPlayer,
        aiPlayer,
        humanPlayer,
        depth + 1 // Increment depth each move ahead
      );

      moves.push({
        index: index,
        score: result.score,
      });
    }
  });

  if (moves.length === 0) return { score: 0 };

  // AI wants MAX score, Human wants MIN score
  if (player === aiPlayer) {
    let bestScore = -Infinity;
    let bestMove = moves[0];

    for (const move of moves) {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
    return bestMove;
  } else {
    let bestScore = Infinity;
    let bestMove = moves[0];

    for (const move of moves) {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
    return bestMove;
  }
}

export function getBestMove(board, aiPlayer, humanPlayer) {
  return aiMaster(board, aiPlayer, aiPlayer, humanPlayer, 0).index;
}