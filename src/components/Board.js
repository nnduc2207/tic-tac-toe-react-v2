import Square from "./Square";
import "../global.css";

function Board(props) {
  function renderSquare(i) {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        inWinLine={props.winLine.includes(i)}
        onClick={() => props.onClick(i)}
      />
    );
  };
  return (
    <div>
      {[...Array(props.size).keys()].map((i) => {
        return (
          <div className="board-row" key={i}>
            {[...Array(props.size).keys()].map((j) => {
              return renderSquare(i * props.size + j);
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
