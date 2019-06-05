import React, { Component } from "react";
import PanelLeft from "./PanelLeft";
import MainPanel from "./MainPanel";

class Panel extends Component {
  render() {
    return (
      <div className="board-view-component dark-theme">
        <PanelLeft />
        <MainPanel />
      </div>
    );
  }
}

export default Panel;
