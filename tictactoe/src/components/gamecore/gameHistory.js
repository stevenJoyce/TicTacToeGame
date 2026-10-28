export default function GameHistory({ history }) {
  return (
    <div className="history-container">
      <h3 className="history-title">Game History</h3>

      {history.length === 0 && (
        <p className="history-empty">No rounds played yet</p>
      )}

      <ul className="history-list">
        {history.map((entry, index) => (
          <li key={index} className="history-item">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}
