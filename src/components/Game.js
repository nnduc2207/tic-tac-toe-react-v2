import { useState } from "react";
import Board from "./Board";
import "../global.css";

function Game(props) {
  const size = props.size
  const [history, setHistory] = useState([
    {
      squares: Array(props.size ** 2).fill(null),
      location: {
        col: null,
        row: null,
      },
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isASC, setIsASC] = useState(true);

  function handleClick(i) {
    const _history = history.slice(0, stepNumber + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      _history.concat([
        {
          squares: squares,
          location: {
            col: i % size,
            row: Math.floor(i / size),
          },
        },
      ])
    );
    setXIsNext(!xIsNext);
    setStepNumber(_history.length);
  }

  function jumpTo(step) {
    setXIsNext(step % 2 === 0);
    setStepNumber(step);
  }

  const current = history[stepNumber];
  const win = calculateWinner(current.squares);

  let status;
  if (win?.winner) {
    status = "Winner: " + win.winner;
  } else if (stepNumber < size ** 2) {
    status = "Next player: " + (xIsNext ? "X" : "O");
  } else {
    status = "Draw game: no one become winner";
  }

  const moves = history.map((el, move) => {
    const desc = move
      ? `Go to move # ${move}: Choice at (${el.location.col}, ${el.location.row}) `
      : "Go to game start";
    return (
      <li key={move}>
        <button
          className={stepNumber === move ? "bold" : ""}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          size={size}
          squares={current.squares}
          winLine={win ? win.line : []}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div className={'bold'}>{status}</div>
        <button onClick={() => {setIsASC(true)}} disabled={isASC}>Ascending order</button>
        <button onClick={() => {setIsASC(false)}} disabled={!isASC}>Descending order</button>
        <ol>{isASC ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}

export default Game;

function calculateWinner(squares) {
  const size = Math.sqrt(squares.length);

  // Check all lines to calculate winner
  const lines = [];
  for (let i = 0; i <= size - 5; i++) {
    for (let j = 0; j <= size - 5; j++) {
      lines.push(...generateWinline5x5(i * size + j, size))
    }
  }
  console.log(lines);
  // check winner
  for (let i = 0; i < lines.length; i++) {
    if (!squares[lines[i][0]]) {
      continue;
    }
    let role = squares[lines[i][0]];
    const res = lines[i].every((num) => {
      return squares[num] === role;
    });

    if (res) {
      return {
        winner: role,
        line: lines[i],
      };
    }
  }
  return null;
}

function generateWinline5x5(location, size) {
  const res = []
  for (let i = 0; i < 5; i++) {
    // Add horizontal
    res.push([...[...Array(5).keys()].map(key => key + location + i*size)])
    // Add vertical
    res.push([...[...Array(5).keys()].map(key => key * size + location + i)])
  }
  // Add cross
  res.push([...[...Array(5).keys()].map(key => key * size + key + location)])
  // Add reverse-cross
  res.push([...[...Array(5).keys()].map(key => key * size + 5-1-key + location)])
  return res
}