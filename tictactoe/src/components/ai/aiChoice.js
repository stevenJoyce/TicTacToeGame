import aiOpponent from "./aiOpponent";
import { getBestMove } from "./aiMaster";
import aiEasy from "./aiEasy";

export default function aiChoice(grid, aiPlayer, humanPlayer, aiLevel) {
    switch (aiLevel) {
        case "easy":
            return aiEasy(grid, aiPlayer);
        case "medium":
            return aiOpponent(grid, aiPlayer, humanPlayer);
        case "hard":
            return getBestMove(grid, aiPlayer, humanPlayer);
        default:
            return null;
    }
}