const STATS_KEY = "tictactoe_stats";

export const getStats = () => {
    const stats = localStorage.getItem(STATS_KEY);
    if (stats) {
        return JSON.parse(stats);
    }
    return {
        totalGames: 0,
        xWins: 0,
        losses: 0,
        draws: 0,
        currentStreak: 0,
        bestStreak: 0,
    };
};

export function recordGameResult(winner) {
    const stats = getStats();
    stats.totalGames += 1;

    switch (winner) {
        case "X":
            stats.xWins += 1;
            stats.currentStreak += 1; // Increment streak on win!
            if (stats.currentStreak > stats.bestStreak) {
                stats.bestStreak = stats.currentStreak; // Update best streak
            }
            break;

        case "O":
            stats.losses += 1;
            stats.currentStreak = 0; // Reset on loss
            break;

        case "Draw":
        default:
            stats.draws += 1;
            stats.currentStreak = 0; // Reset on draw
            break;
    }

    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    return stats;
}

export function resetStats() {
    const initialStats = {
        totalGames: 0,
        xWins: 0,
        losses: 0,
        draws: 0,
        currentStreak: 0,
        bestStreak: 0,
    };
    localStorage.setItem(STATS_KEY, JSON.stringify(initialStats));
    return initialStats;
}