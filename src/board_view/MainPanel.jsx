import React, { Component } from "react";

class MainPanel extends Component {
  state = {};
  constructor() {
    super();
    var months = [];
    months.push(this.createMonth(2019, 4));
    months.push(this.createMonth(2019, 5));
    months.push(this.createMonth(2019, 6));
    this.state = { timeData: months };
  }
  render() {
    const divStyle = {
      overflow: "hidden",
      position: "relative"
    };
    return (
      <div style={divStyle}>
        <div className="right" id="board-view-timeline" />
      </div>
    );
  }
}

export default MainPanel;
