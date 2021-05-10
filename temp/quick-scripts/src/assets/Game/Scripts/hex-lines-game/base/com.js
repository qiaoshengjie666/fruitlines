"use strict";
cc._RF.push(module, 'e25bakBQd9I5LmDR7yLx+Jf', 'com');
// Game/Scripts/hex-lines-game/base/com.js

"use strict";

var com = function com() {};

com.dateStr = function (t) {
  var e = t.getMonth() + 1,
      n = t.getDate(),
      i = t.getHours(),
      s = t.getMinutes(),
      a = t.getSeconds();
  return t.getFullYear() + "-" + (10 > e ? "0" + e : "" + e) + "-" + (10 > n ? "0" + n : "" + n) + " " + (10 > i ? "0" + i : "" + i) + ":" + (10 > s ? "0" + s : "" + s) + ":" + (10 > a ? "0" + a : "" + a);
}, com.strDate = function (t) {
  switch (t.length) {
    case 8:
      var t = t.split(":"),
          e = new Date();
      return e.setTime(0), e.setUTCHours(t[0]), e.setUTCMinutes(t[1]), e.setUTCSeconds(t[2]), e;

    case 10:
      return t = t.split("-"), new Date(t[0], t[1] - 1, t[2], 0, 0, 0);

    case 19:
      return e = t.split(" "), t = e[0].split("-"), e = e[1].split(":"), new Date(t[0], t[1] - 1, t[2], e[0], e[1], e[2]);

    default:
      throw "Invalid date format : " + t;
  }
};

com.cca = function (t, e) {
  var n = t.charCodeAt(e);
  return n != n ? void 0 : n;
};

com.substr = function (t, e, n) {
  return null != e && 0 != e && null != n && 0 > n ? "" : (null == n && (n = t.length), 0 > e ? (e = t.length + e, 0 > e && (e = 0)) : 0 > n && (n = t.length + n - e), t.substr(e, n));
};

com.remove = function (t, e) {
  var n = t.indexOf(e);
  return -1 == n ? !1 : (t.splice(n, 1), !0);
};

com.iter = function (t) {
  return {
    cur: 0,
    arr: t,
    hasNext: function hasNext() {
      return this.cur < this.arr.length;
    },
    next: function next() {
      return this.arr[this.cur++];
    }
  };
};

cc._RF.pop();