import { useState } from "react";
import "./App.css";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = { X: "Player 1", O: "Player 2" };

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  let current = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    current = "O";
  }
  return current;
};

const deriveWinner = (gameBoard, players) => {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
};

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAMEBOARD.map((arr) => [...arr])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
};

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {
  const [gradient, setGradient] = useState({
    color1: getRandomColor(),
    color2: getRandomColor(),
  });

  const gradientStyle = {
    background: `linear-gradient(to right, ${gradient.color1}, ${gradient.color2})`,
    // height: "100vh",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "column",
  };

  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  const handleClickSquare = (rowIndex, colIndex) => {
    setGradient({
      color1: getRandomColor(),
      color2: getRandomColor(),
    });

    setGameTurns((prev) => {
      let current = deriveActivePlayer(prev);
      if (prev.length > 0 && prev[0].player === "X") {
        current = "O";
      }
      const updated = [
        { square: { row: rowIndex, col: colIndex }, player: current },
        ...prev,
      ];

      return updated;
    });
  };

  const handleRematch = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prev) => {
      return {
        ...prev,
        [symbol]: newName,
      };
    });
  };
  return (
    <>
      <header>
        {/* <img src="logo.jpg" alt="Tic tac toe game board" /> */}
        <h1>Tic Tac Toe Harp</h1>
      </header>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={PLAYERS.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerNameChange}
            />
            <Player
              initialName={PLAYERS.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerNameChange}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRematch={handleRematch} />
          )}
          <GameBoard onClickSquare={handleClickSquare} board={gameBoard} />
        </div>
        <Log turns={gameTurns} gradientStyle={gradientStyle} />
      </main>
    </>
  );
}

export default App;
