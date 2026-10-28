export default function SeriesHistory({ seriesHistory }) {
  return (
    <div className="history-container">
      <h3 className="history-title">Series History</h3>

      {seriesHistory.length === 0 && (
        <p className="history-empty">No rounds played yet</p>
      )}

      <ul className="history-list">
        {seriesHistory.map((entry, index) => (
          <li key={index} className="history-item">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}
