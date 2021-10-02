import { useState } from "react";
import Game from "./Game";
import "../global.css";

function Window() {
  const [input, setInput] = useState();
  const [size, setSize] = useState();

  function renderGame(_size) {
    if (_size > 0) {
      return <Game size={Number(_size)} />;
    }
    return null;
  }

  return (
    <div>
      <input
        className={"input"}
        type={"number"}
        placeholder={"Please input size of board (nxn) ..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button onClick={() => setSize(input)} disabled={size} > Enter </button>
      <button onClick={() => setSize(null)} disabled={!size} > Reset </button>

      {renderGame(size)}
    </div>
  );
}

export default Window;
