import React, { Component } from "react";
import Header from "./Header";
import Panel from "./Panel";

class BoardView extends Component {
  state = {};
  constructor() {
    super();
  }

  render() {
    return (
      <div className="board-view-container">
        <Header />
        <Panel />
      </div>
    );
  }
}

export default BoardView;
