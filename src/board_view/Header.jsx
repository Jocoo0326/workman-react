import React, { Component } from "react";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="board-view-header">
        <div className="header-btn date-backward">
          <img src="img/right.png" alt="" />
          <img className="top" src="img/right-blue.png" alt="" />
        </div>
        <div className="header-btn date-forward">
          <img src="img/left.png" alt="" />
          <img className="top" src="img/left-blue.png" alt="" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    var date_backward = document.querySelector("div.date-backward");
    var date_forward = document.querySelector("div.date-forward");
    var thiz = this;
    date_forward.addEventListener("click", function() {
      // var ts = getTranslate(thiz.main);
      // thiz.scrollToPosition(ts[0] + thiz.date_item_width);
      console.log("forward");
    });
    date_backward.addEventListener("click", function() {
      // var ts = getTranslate(thiz.main);
      // thiz.scrollToPosition(ts[0] - thiz.date_item_width);
      console.log("backward");
    });
  }
}

export default Header;
