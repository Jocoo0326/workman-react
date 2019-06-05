import React, { Component } from "react";

class Pool extends Component {
  state = { works: [] };
  constructor() {
    super();
    let works = [];
    works.push(new Work("001", 1000));
    works.push(new Work("002", 1500));
    works.push(new Work("003", 2000));
    works.push(new Work("004", 2500));
    works.push(new Work("005", 3000));
    works.push(new Work("006", 3500));
    works.push(new Work("007", 4000));
    works.push(new Work("008", 4500));

    this.state = { works: works };
  }
  render() {
    return (
      <div className="pool container">
        {this.state.works.map((w, index) => {
          return (
            <div className="work" key={index} id={w.name}>
              产品: {w.name} 数量: {w.amount}
            </div>
          );
        })}
      </div>
    );
  }
}

class Work {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

export default Pool;
