import X from "../x";
import Circle from "./circle";
import { useSound } from "react-sounds";

function Square({ value, onSquareClick }) {

  // Hooks must ALWAYS run
  const soundX = useSound("ui/success_blip");
  const soundO = useSound("ui/success_bling");

  function handleClick() {
    if (value === "X") {
      soundX.play();
    } else if (value === "O") {
      soundO.play();
    }
    onSquareClick();
  }

  return (
    <button className="square" onClick={handleClick}>
      {value === "X" && <X />}
      {value === "O" && <Circle />}
    </button>
  );
}

export default Square;
