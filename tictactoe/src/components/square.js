import X from "./x";
import Circle from "./circle";

function Square( { value, onSquareClick } ) {
    return (
    <button className="square" onClick={onSquareClick}>
      {value === "X" && <X />}
      {value === "O" && <Circle />}
    </button>
    );
}

export default Square;