function ProgressBar({xWins, oWins, needed}){
  const xPercent = (xWins / needed) * 100;
  const oPercent = (oWins / needed) * 100;

  return (
    <div className="series-progress">
      <div className="progress-row">
        <span className="label">X</span>
        <div className="bar">
          <div className="fill x-fill" style={{ width: `${xPercent}%` }}></div>
        </div>
        <span className="count">{xWins}/{needed}</span>
      </div>

      <div className="progress-row">
        <span className="label">O</span>
        <div className="bar">
          <div className="fill o-fill" style={{ width: `${oPercent}%` }}></div>
        </div>
        <span className="count">{oWins}/{needed}</span>
      </div>
    </div>
  );
}

export default ProgressBar;