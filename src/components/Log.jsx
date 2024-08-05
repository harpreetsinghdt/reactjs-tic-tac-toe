import React from "react";

const Log = ({ turns, gradientStyle }) => {
  return (
    <ol id="log" style={gradientStyle}>
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.row}
        </li>
      ))}
    </ol>
  );
};
export default Log;
