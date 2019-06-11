import React, { Component } from "react";
import Mac, { createMonth, Work, Schedual } from "./model";
import dragula from "../dragula/dragula";
import "../dragula/dist/dragula.css";

class BoardView extends Component {
  constructor() {
    super();
    this.onBackward = this.onBackward.bind(this);
    this.onForward = this.onForward.bind(this);
    var kinds = [
      new Mac(1, "1号机"),
      new Mac(2, "2号机"),
      new Mac(3, "3号机"),
      new Mac(4, "4号机"),
      new Mac(5, "5号机"),
      new Mac(6, "6号机")
    ];
    var months = [];
    months.push(createMonth(2019, 4));
    months.push(createMonth(2019, 5));
    months.push(createMonth(2019, 6));
    this.state = {
      kinds: kinds,
      timeData: months,
      date_item_width: 60,
      viewport_cols: 19,
      today_offset_left: 5
    };
  }
  render() {
    return (
      <div className="board-view-container">
        {this.renderHeader()}
        {this.renderPanel()}
      </div>
    );
  }

  renderHeader() {
    return (
      <div className="board-view-header">
        <div className="header-btn date-backward" onClick={this.onBackward}>
          <img src="img/right.png" alt="" />
          <img className="top" src="img/right-blue.png" alt="" />
        </div>
        <div className="header-btn date-forward" onClick={this.onForward}>
          <img src="img/left.png" alt="" />
          <img className="top" src="img/left-blue.png" alt="" />
        </div>
      </div>
    );
  }

  renderPanel() {
    const { kinds } = this.state;
    return (
      <div className="board-view-component dark-theme">
        {this.renderPanelLeft(kinds)}
        {this.renderMainPanel()}
      </div>
    );
  }

  renderPanelLeft(kinds) {
    return (
      <div className="left" id="board-view-kind">
        <ul>
          {kinds.map((k, index) => {
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

  renderMainPanel() {
    const divStyle = {
      overflow: "hidden",
      position: "relative"
    };
    const timelineStyle = {
      width: this.getBoardWith() + "px"
    };
    return (
      <div style={divStyle}>
        <div className="right" id="board-view-timeline" style={timelineStyle}>
          {this.renderBackground()}
          {this.renderDateContainer()}
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderBackground() {
    return (
      <div className="board-view-tl-background">
        <ul>
          {this.state.timeData
            .map(k => {
              let nodes = [];
              for (var d = 1; d <= k.getDaysInMonth(); d++) {
                nodes.push(
                  <li
                    key={k.year + "" + (k.month + 1) + "" + d}
                    className={this.getDayClass(k, d)}
                  />
                );
              }
              return nodes;
            })
            .flat()}
        </ul>
      </div>
    );
  }

  renderDateContainer() {
    return (
      <div className="board-view-date-container">
        <ul>
          {this.state.timeData
            .map((k, index) => {
              let nodes = [];
              for (var d = 1; d <= k.getDaysInMonth(); d++) {
                nodes.push(
                  <li
                    key={k.year + "" + (k.month + 1) + "" + d}
                    className="date-day"
                  >
                    <span>{k.month + 1 + "/" + d}</span>
                  </li>
                );
              }
              return nodes;
            })
            .flat()}
        </ul>
      </div>
    );
  }

  renderContent() {
    return (
      <div
        id="board-view-content"
        className="board-view-content container noselect"
      >
        {this.populateRandomWorks()}
      </div>
    );
  }

  onForward() {
    var ts = this.getTranslate(this.getMain());
    this.scrollToPosition(ts[0] + this.state.date_item_width);
  }

  onBackward() {
    var ts = this.getTranslate(this.getMain());
    this.scrollToPosition(ts[0] - this.state.date_item_width);
  }

  componentDidMount() {
    this.initContent();
    this.initState();
  }

  initContent() {
    var content = this.getContentContainer();
    const thiz = this;
    const date_item_width_const = this.state.date_item_width;
    dragula([document.querySelector("#pool"), content], {
      moves: function(item, source, handle, nextEl) {
        if (source === content && isPast(item)) {
          return false;
        }
        return true;

        function isPast(el) {
          var rect = el.getBoundingClientRect();
          var contentrect = content.getBoundingClientRect();
          return rect.x + rect.width < contentrect.x + thiz.getNowOffsetPx();
        }
      }
    }).drag = function(item, dropTarget, clientX, clientY, mirror) {
      var mr = mirror.getBoundingClientRect();
      var mx = getBoundRectX(mr);
      var my = getBoundRectY(mr);
      if (dropTarget === content) {
        dropTarget.insertBefore(item, null);
        var pos = calcCellOffsetsUnderPoint();
        item.style.left = pos[0] + "px";
        item.style.top = pos[1] + "px";
        item.style.width =
          calcWidth(pos[1], item) * date_item_width_const - 2 + "px";

        var l = pos[0];
        while (collision() && l < thiz.getTotalCols() * date_item_width_const) {
          l += date_item_width_const;
          item.style.left = l + "px";
        }
        return true;
      } else {
        item.removeAttribute("style");
        return false;
      }

      function calcCellOffsetsUnderPoint() {
        var contentRect = dropTarget.getBoundingClientRect();
        var x =
          Math.floor(
            (mx - getBoundRectX(contentRect)) / date_item_width_const
          ) * date_item_width_const;
        x = Math.min(
          Math.max(thiz.getNowOffsetPx(), x),
          thiz.getTotalCols() * date_item_width_const
        );
        var y =
          Math.floor(
            (my - getBoundRectY(contentRect)) / date_item_width_const
          ) * date_item_width_const;
        y = Math.max(
          0,
          Math.min(date_item_width_const * (thiz.state.kinds.length - 1), y)
        );
        return [x, y];
      }

      function collision() {
        var works = content.children;
        const itemrect = item.getBoundingClientRect();
        for (let index = 0; index < works.length; index++) {
          const element = works[index];
          if (element !== item) {
            if (isCollide(itemrect, element.getBoundingClientRect())) {
              return true;
            }
          }
        }
        return false;
      }

      function isCollide(a, b) {
        return !(
          getBoundRectY(a) + a.height <= getBoundRectY(b) ||
          getBoundRectY(a) >= getBoundRectY(b) + b.height ||
          getBoundRectX(a) + a.width <= getBoundRectX(b) ||
          getBoundRectX(a) >= getBoundRectX(b) + b.width
        );
      }

      function getBoundRectX(r) {
        return r.x || r.left;
      }

      function getBoundRectY(r) {
        return r.y || r.top;
      }

      function calcWidth(mac, wk) {
        var v = parseInt(wk.id) + mac / 60;
        return Math.floor((v + 3.1) % 3) + 3;
      }
    };
  }

  initState() {
    this.scrollToPosition(
      (this.getNowOffset() - this.state.today_offset_left) *
        this.state.date_item_width *
        -1
    );
  }

  getNowOffset() {
    var offset = 0;
    const { timeData } = this.state;
    for (var i = 0; i < timeData.length; i++) {
      var v = timeData[i];
      if (v.isThisMonth()) {
        offset += v.today() - 1;
        break;
      }
      offset += v.getDaysInMonth();
    }
    return offset;
  }

  getNowOffsetPx() {
    return this.getNowOffset() * this.state.date_item_width;
  }

  populateRandomWorks() {
    // generate some schedual past data for preview
    var pastScheduals = [];
    const M = 1000;
    var l = this.getNowOffset();
    var id = M;
    const { kinds } = this.state;
    for (let i = 0; i < kinds.length; i++) {
      for (let j = 0; j < 10; j++) {
        var r = l - j * 10;
        var end = r - this.randInt(6);
        var beg = end - (this.randInt(3) + 3);
        if (beg < 0) continue;
        var w = new Work(id++ + "", this.randInt(M));
        var m = kinds[i];
        pastScheduals.push(new Schedual(w, m, beg, end));
      }
    }

    const date_item_width_const = this.state.date_item_width;
    return pastScheduals.map(v => {
      const style = {
        left: v.beg * date_item_width_const + "px",
        top: (parseInt(v.mac.id) - 1) * date_item_width_const + "px",
        width: (v.end - v.beg) * date_item_width_const - 2 + "px"
      };
      return (
        <div key={v.work.name} className="work" id={v.work.name} style={style}>
          {"产品: " + v.work.name + " 数量: " + v.work.amount}
        </div>
      );
    });
  }

  randInt(v) {
    return Math.floor(v * Math.random());
  }

  getDayClass(month, day) {
    return "with-line" + (month.isPast(day) ? " past" : "");
  }

  getBoardWith() {
    return this.getTotalCols() * this.state.date_item_width;
  }

  getTotalCols() {
    var datelen = 0;
    this.state.timeData.forEach(v => {
      datelen += v.getDaysInMonth();
    });
    return datelen;
  }

  scrollToPosition(p) {
    this.getMain().style.transform =
      "translate(" + this.clipScrollRange(p) + "px)";
  }

  getMain() {
    return (
      this.main || (this.main = document.querySelector("#board-view-timeline"))
    );
  }

  getContentContainer() {
    return (
      this.content ||
      (this.content = document.querySelector("#board-view-content"))
    );
  }

  clipScrollRange(r) {
    var range = this.getScrollRange();
    if (r > range[0]) {
      return range[0];
    } else if (r < range[1]) {
      return range[1];
    }
    return r;
  }

  getScrollRange() {
    return [
      0,
      (this.state.viewport_cols - this.getTotalCols()) *
        this.state.date_item_width
    ];
  }

  getTranslate(item) {
    var transArr = [];
    if (!window.getComputedStyle) return null;
    var style = getComputedStyle(item),
      transform =
        style.transform ||
        style.webkitTransform ||
        style.mozTransform ||
        style.msTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(", ")[13]);

    mat = transform.match(/^matrix\((.+)\)$/);
    mat ? transArr.push(parseFloat(mat[1].split(", ")[4])) : transArr.push(0);
    mat ? transArr.push(parseFloat(mat[1].split(", ")[5])) : transArr.push(0);

    return transArr;
  }
}

export default BoardView;
