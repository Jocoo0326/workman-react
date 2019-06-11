export default class Mac {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Month {
  constructor(year, month) {
    this.year = year;
    this.month = month;
  }
  isPast(d) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var t = new Date(this.year, this.month, d);
    return t.getTime() < today.getTime();
  }
  getDaysInMonth() {
    return new Date(this.year, this.month + 1, 0).getDate();
  }
  isThisMonth() {
    var today = new Date();
    var thisyear = today.getFullYear();
    var thismonth = today.getMonth();
    return thisyear === this.year && thismonth === this.month;
  }

  today() {
    return new Date().getDate();
  }
}

export function createMonth(y, m) {
  return new Month(y, m);
}

export class Work {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

export class Schedual {
  constructor(work, mac, beg, end) {
    this.work = work;
    this.mac = mac;
    this.beg = beg;
    this.end = end;
  }
}
