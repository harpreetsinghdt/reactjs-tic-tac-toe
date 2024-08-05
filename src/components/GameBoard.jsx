import React, { useState } from "react";

const GameBoard = ({ onClickSquare, board }) => {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // const handleClick = (rowIndex, colIndex) => {
  // setGameBoard((prev) => {
  //   const updated = [...prev.map((innerArray) => [...innerArray])];
  //   updated[rowIndex][colIndex] = activePlayerSymbol;
  //   return updated;
  // });

  // onClickSquare();
  // };

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onClickSquare(rowIndex, colIndex)}
                  disabled={col !== null}
                >
                  {col}
                </button>
              </li>
            ))}
          </ol>{" "}
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
