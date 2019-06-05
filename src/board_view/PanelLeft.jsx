import React, { Component } from "react";

class PanelLeft extends Component {
  constructor() {
    super();
    var kinds = [
      new Mac(1, "1号机"),
      new Mac(2, "2号机"),
      new Mac(3, "3号机"),
      new Mac(4, "4号机"),
      new Mac(5, "5号机"),
      new Mac(6, "6号机")
    ];
    this.state = { kinds };
  }
  render() {
    return (
      <div className="left" id="board-view-kind">
        <ul>
          {this.state.kinds.map((k, index) => {
            return (
              <li key={index}>
                <span className="noselct"> {k.name} </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Mac {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export default PanelLeft;
