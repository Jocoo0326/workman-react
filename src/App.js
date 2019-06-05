import React from "react";
import "./App.css";
import Pool from "./Pool";
import BoardView from "./board_view/BoardView";

function App() {
  return (
    <React.Fragment>
      <Pool />
      <BoardView />
    </React.Fragment>
  );
}

export default App;
