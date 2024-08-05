import React, { useState } from "react";

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  // console.log("before", isEditing);
  const handleEdit = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, name);
    }
  };
  // console.log("after", isEditing);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  let playerName = <span className="player-name">{name}</span>;
  if (isEditing) {
    playerName = (
      <input type="text" value={name} onChange={handleChange} required />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
