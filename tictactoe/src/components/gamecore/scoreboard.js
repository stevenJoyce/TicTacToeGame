function Scoreboard({ xWins, oWins, draws, needed }) {
    return (
        <div className="scoreboard-retro">
          <h3 className="retro-title">SCOREBOARD</h3>

          <div className="retro-row">
            <span className="retro-label">X WINS</span>
            <span className="retro-value">{xWins}</span>
          </div>

          <div className="retro-row">
            <span className="retro-label">O WINS</span>
            <span className="retro-value">{oWins}</span>
          </div>

          <div className="retro-row">
            <span className="retro-label">DRAWS</span>
            <span className="retro-value">{draws}</span>
          </div>

          <div className="retro-row retro-needed">
            <span className="retro-label">NEEDED TO WIN SERIES</span>
            <span className="retro-value">{needed}</span>
          </div>
        </div>
    )
}

export default Scoreboard;