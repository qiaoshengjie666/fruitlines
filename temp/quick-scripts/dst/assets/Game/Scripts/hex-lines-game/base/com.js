
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Game/Scripts/hex-lines-game/base/com.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZVxcU2NyaXB0c1xcaGV4LWxpbmVzLWdhbWVcXGJhc2VcXGNvbS5qcyJdLCJuYW1lcyI6WyJjb20iLCJkYXRlU3RyIiwidCIsImUiLCJnZXRNb250aCIsIm4iLCJnZXREYXRlIiwiaSIsImdldEhvdXJzIiwicyIsImdldE1pbnV0ZXMiLCJhIiwiZ2V0U2Vjb25kcyIsImdldEZ1bGxZZWFyIiwic3RyRGF0ZSIsImxlbmd0aCIsInNwbGl0IiwiRGF0ZSIsInNldFRpbWUiLCJzZXRVVENIb3VycyIsInNldFVUQ01pbnV0ZXMiLCJzZXRVVENTZWNvbmRzIiwiY2NhIiwiY2hhckNvZGVBdCIsInN1YnN0ciIsInJlbW92ZSIsImluZGV4T2YiLCJzcGxpY2UiLCJpdGVyIiwiY3VyIiwiYXJyIiwiaGFzTmV4dCIsIm5leHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsR0FBRyxHQUFHLFNBQU5BLEdBQU0sR0FBVSxDQUFFLENBQXRCOztBQUVBQSxHQUFHLENBQUNDLE9BQUosR0FBYyxVQUFTQyxDQUFULEVBQVk7QUFDdEIsTUFBSUMsQ0FBQyxHQUFHRCxDQUFDLENBQUNFLFFBQUYsS0FBZSxDQUF2QjtBQUFBLE1BQ0FDLENBQUMsR0FBR0gsQ0FBQyxDQUFDSSxPQUFGLEVBREo7QUFBQSxNQUVBQyxDQUFDLEdBQUdMLENBQUMsQ0FBQ00sUUFBRixFQUZKO0FBQUEsTUFHQUMsQ0FBQyxHQUFHUCxDQUFDLENBQUNRLFVBQUYsRUFISjtBQUFBLE1BSUFDLENBQUMsR0FBR1QsQ0FBQyxDQUFDVSxVQUFGLEVBSko7QUFLQSxTQUFPVixDQUFDLENBQUNXLFdBQUYsS0FBa0IsR0FBbEIsSUFBeUIsS0FBS1YsQ0FBTCxHQUFTLE1BQU1BLENBQWYsR0FBa0IsS0FBS0EsQ0FBaEQsSUFBcUQsR0FBckQsSUFBNEQsS0FBS0UsQ0FBTCxHQUFTLE1BQU1BLENBQWYsR0FBa0IsS0FBS0EsQ0FBbkYsSUFBd0YsR0FBeEYsSUFBK0YsS0FB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NUUsRUFBNkdELENBQUMsQ0FBQ3NCLE1BQUYsQ0FBU3JCLENBQVQsRUFBWUUsQ0FBWixDQUE5SixDQUFQO0FBQ0gsQ0FGRDs7QUFHQUwsR0FBRyxDQUFDeUIsTUFBSixHQUFhLFVBQVN2QixDQUFULEVBQVlDLENBQVosRUFBZTtBQUN4QixNQUFJRSxDQUFDLEdBQUdILENBQUMsQ0FBQ3dCLE9BQUYsQ0FBVXZCLENBQVYsQ0FBUjtBQUNBLFNBQU8sQ0FBRSxDQUFGLElBQU9FLENBQVAsR0FBVyxDQUFDLENBQVosSUFBaUJILENBQUMsQ0FBQ3lCLE1BQUYsQ0FBU3RCLENBQVQsRUFBWSxDQUFaLEdBQWdCLENBQUMsQ0FBbEMsQ0FBUDtBQUNILENBSEQ7O0FBSUFMLEdBQUcsQ0FBQzRCLElBQUosR0FBVyxVQUFTMUIsQ0FBVCxFQUFZO0FBQ25CLFNBQU87QUFDSDJCLElBQUFBLEdBQUcsRUFBRSxDQURGO0FBRUhDLElBQUFBLEdBQUcsRUFBRTVCLENBRkY7QUFHSDZCLElBQUFBLE9BQU8sRUFBRSxtQkFBVztBQUNoQixhQUFPLEtBQUtGLEdBQUwsR0FBVyxLQUFLQyxHQUFMLENBQVNmLE1BQTNCO0FBQ0gsS0FMRTtBQU1IaUIsSUFBQUEsSUFBSSxFQUFFLGdCQUFXO0FBQ2IsYUFBTyxLQUFLRixHQUFMLENBQVMsS0FBS0QsR0FBTCxFQUFULENBQVA7QUFDSDtBQVJFLEdBQVA7QUFVSCxDQVhEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29tID0gZnVuY3Rpb24oKXt9XG5cbmNvbS5kYXRlU3RyID0gZnVuY3Rpb24odCkge1xuICAgIHZhciBlID0gdC5nZXRNb250aCgpICsgMSxcbiAgICBuID0gdC5nZXREYXRlKCksXG4gICAgaSA9IHQuZ2V0SG91cnMoKSxcbiAgICBzID0gdC5nZXRNaW51dGVzKCksXG4gICAgYSA9IHQuZ2V0U2Vjb25kcygpO1xuICAgIHJldHVybiB0LmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArICgxMCA+IGUgPyBcIjBcIiArIGU6IFwiXCIgKyBlKSArIFwiLVwiICsgKDEwID4gbiA/IFwiMFwiICsgbjogXCJcIiArIG4pICsgXCIgXCIgKyAoMTAgPiBpID8gXCIwXCIgKyBpOiBcIlwiICsgaSkgKyBcIjpcIiArICgxMCA+IHMgPyBcIjBcIiArIHM6IFwiXCIgKyBzKSArIFwiOlwiICsgKDEwID4gYSA/IFwiMFwiICsgYTogXCJcIiArIGEpXG59LFxuXG5jb20uc3RyRGF0ZSA9IGZ1bmN0aW9uKHQpIHtcbiAgICBzd2l0Y2ggKHQubGVuZ3RoKSB7XG4gICAgY2FzZSA4OlxuICAgICAgICB2YXIgdCA9IHQuc3BsaXQoXCI6XCIpLFxuICAgICAgICBlID0gbmV3IERhdGU7XG4gICAgICAgIHJldHVybiBlLnNldFRpbWUoMCksXG4gICAgICAgIGUuc2V0VVRDSG91cnModFswXSksXG4gICAgICAgIGUuc2V0VVRDTWludXRlcyh0WzFdKSxcbiAgICAgICAgZS5zZXRVVENTZWNvbmRzKHRbMl0pLFxuICAgICAgICBlO1xuICAgIGNhc2UgMTA6XG4gICAgICAgIHJldHVybiB0ID0gdC5zcGxpdChcIi1cIiksXG4gICAgICAgIG5ldyBEYXRlKHRbMF0sIHRbMV0gLSAxLCB0WzJdLCAwLCAwLCAwKTtcbiAgICBjYXNlIDE5OlxuICAgICAgICByZXR1cm4gZSA9IHQuc3BsaXQoXCIgXCIpLFxuICAgICAgICB0ID0gZVswXS5zcGxpdChcIi1cIiksXG4gICAgICAgIGUgPSBlWzFdLnNwbGl0KFwiOlwiKSxcbiAgICAgICAgbmV3IERhdGUodFswXSwgdFsxXSAtIDEsIHRbMl0sIGVbMF0sIGVbMV0sIGVbMl0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IFwiSW52YWxpZCBkYXRlIGZvcm1hdCA6IFwiICsgdFxuICAgIH1cbn1cbmNvbS5jY2EgPSBmdW5jdGlvbih0LCBlKSB7XG4gICAgdmFyIG4gPSB0LmNoYXJDb2RlQXQoZSk7XG4gICAgcmV0dXJuIG4gIT0gbiA/IHZvaWQgMCA6IG5cbn1cbmNvbS5zdWJzdHIgPSBmdW5jdGlvbih0LCBlLCBuKSB7XG4gICAgcmV0dXJuIG51bGwgIT0gZSAmJiAwICE9IGUgJiYgbnVsbCAhPSBuICYmIDAgPiBuID8gXCJcIjogKG51bGwgPT0gbiAmJiAobiA9IHQubGVuZ3RoKSwgMCA+IGUgPyAoZSA9IHQubGVuZ3RoICsgZSwgMCA+IGUgJiYgKGUgPSAwKSkgOiAwID4gbiAmJiAobiA9IHQubGVuZ3RoICsgbiAtIGUpLCB0LnN1YnN0cihlLCBuKSlcbn1cbmNvbS5yZW1vdmUgPSBmdW5jdGlvbih0LCBlKSB7XG4gICAgdmFyIG4gPSB0LmluZGV4T2YoZSk7XG4gICAgcmV0dXJuIC0gMSA9PSBuID8gITEgOiAodC5zcGxpY2UobiwgMSksICEwKVxufVxuY29tLml0ZXIgPSBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3VyOiAwLFxuICAgICAgICBhcnI6IHQsXG4gICAgICAgIGhhc05leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VyIDwgdGhpcy5hcnIubGVuZ3RoXG4gICAgICAgIH0sXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyW3RoaXMuY3VyKytdXG4gICAgICAgIH1cbiAgICB9XG59OyJdfQ==