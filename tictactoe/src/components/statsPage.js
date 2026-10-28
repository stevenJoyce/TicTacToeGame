import {useState, useEffect} from "react";
import { getStats, resetStats } from "./gamecore/stats";
import "../App.css";

function StatsPage() {
    const [stats, setStats] = useState(getStats());

    const handleResetStats = () => {
        if(window.confirm("Are you sure you want to reset your stats? This action cannot be undone.")) {
            const reset = resetStats();
            setStats(reset);
        }
    };

    const winRate = stats.played > 0 ? ((stats.xWins / stats.played) * 100).toFixed(2) : 0;

    return (
        <div className="scoreboard-retro">
      <h3 className="retro-title">LIFETIME STATS</h3>

      <div className="retro-row">
        <span className="retro-label">GAMES PLAYED</span>
        <span className="retro-value">{stats.played}</span>
      </div>

      <div className="retro-row">
        <span className="retro-label">WINS</span>
        <span className="retro-value" style={{ color: "#4ade80" }}>{stats.wins}</span>
      </div>

      <div className="retro-row">
        <span className="retro-label">LOSSES</span>
        <span className="retro-value" style={{ color: "#f87171" }}>{stats.losses}</span>
      </div>

      <div className="retro-row">
        <span className="retro-label">DRAWS</span>
        <span className="retro-value">{stats.draws}</span>
      </div>

      <div className="retro-row">
        <span className="retro-label">WIN RATE</span>
        <span className="retro-value">{winRate}%</span>
      </div>

      <div className="retro-row">
        <span className="retro-label">CURRENT STREAK</span>
        <span className="retro-value">{stats.currentStreak}</span>
      </div>

      <div className="retro-row retro-needed">
        <span className="retro-label">BEST STREAK</span>
        <span className="retro-value">{stats.bestStreak}</span>
      </div>

      <br />
      <button onClick={handleResetStats} id="btn" style={{ background: "#dc2626", color: "white" }}>
        Reset Stats
      </button>
    </div>
  );
}

export default StatsPage;