import { useState } from "react";
function Circle() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue("O");
  }

  return (
    <button className="circle" onClick={handleClick}>
      {value}
    </button>
  );
}

export default Circle;
