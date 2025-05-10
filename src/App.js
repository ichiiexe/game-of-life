import React, { useState, useEffect } from "react";

function GameOfLife() {
  const initialBoard = [
    [1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [0, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
  ];
  const [grid, setGrid] = useState(
    initialBoard
  );
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // checks around the cell its in if it has neighbors//
  const countNeighbors = (row, col) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // skip itsself //
        if (i === 0 && j === 0) continue;

        // check neighbor position //
        const newRow = row + i;
        const newCol = col + j;

        // Check neighbor in grid, makes sure it doesnt check outside the grid//
        if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
          count += grid[newRow][newCol];
        }
      }
    }
    return count;
  };

  const nextGen = () => {
    const newGrid = [];
    for (let i = 0; i < 5; i++) {
      newGrid[i] = [];
      for (let j = 0; j < 5; j++) {
        const neighbors = countNeighbors(i, j);

        //1. checks if a cell survives //
        //2. checks if a cell reproduces //
        newGrid[i][j] =
          (grid[i][j] === 1 && (neighbors === 2 || neighbors === 3)) ||
          (grid[i][j] === 0 && neighbors === 3)
            ? 1
            : 0;
      }
    }

    setGrid(newGrid);
    setGeneration(generation + 1);
  };

  const start = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    console.log("reset");
  };

  useEffect(() => {
    if (isRunning && generation < 10) {
      const timer = setTimeout(() => {
        nextGen();
      }, 2000);
      return () => clearTimeout(timer);
    } else if (generation >= 10) {
      setIsRunning(false);
    }
  }, [isRunning, generation]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Game of Life</h1>

      <div>
        <button onClick={start}>{isRunning ? "Stop" : "Start"}</button>
        <button onClick={reset()} style={{ marginLeft: "10px" }}>
          New Game
        </button>
      </div>

      <p>Generation: {generation} of 10</p>

      <div
        style={{
          display: "inline-grid",
          gridTemplateColumns: "repeat(5, 42px)",
          gap: "2px",
          margin: "20px",
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={(i, j)}
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: cell ? "black" : "white",
                border: "1px solid gray",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GameOfLife;

///reference///
// https://github.com/SverreNystad/game-of-Life/tree/master/app/src/main/java/conways_game_of_life ///
