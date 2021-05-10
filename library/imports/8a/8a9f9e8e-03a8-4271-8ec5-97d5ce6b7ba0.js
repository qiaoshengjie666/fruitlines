"use strict";
cc._RF.push(module, '8a9f96OA6hCcY7Fl9XOa3ug', 'util');
// gameComon/scripts/model/util.js

"use strict";

module.exports = {
  format: function format(f) {
    if (typeof f !== 'string') {
      var objects = [];

      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect(arguments[i]));
      }

      return objects.join(' ');
    }

    var i = 1;
    var args = arguments;
    var len = args.length;
    var formatRegExp = new RegExp("%%|%s|%d|%j", "g");
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') return '%';
      if (i >= len) return x;

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          return JSON.stringify(args[i++]);

        default:
          return x;
      }
    });

    for (var x = args[i]; i < len; x = args[++i]) {
      if (x === null || typeof x !== 'object') {
        str += ' ' + x;
      } else {
        str += ' ' + inspect(x);
      }
    }

    return str;
  },
  loadGameAutoAtlas: function loadGameAutoAtlas(url, spriteName, node, cb) {
    if (CC_BUILD) {
      cc.resources.load(url, cc.SpriteAtlas, function (err, atlas) {
        var frame = atlas.getSpriteFrame(spriteName);
        node.spriteFrame = frame;
        cb(true);
      }.bind(this));
    } else {
      cc.resources.load(url + spriteName, cc.SpriteFrame, function (err, spriteFrame) {
        if (err) {
          cc.log(err.message || err);
          cb(false);
          return;
        }

        node.spriteFrame = spriteFrame;
        cb(true);
      }.bind(this));
    }
  },
  loadJSONData: function loadJSONData(bundleName, name, callback) {
    cc.assetManager.loadBundle(bundleName, function (err, bundle) {
      bundle.load(name, cc.JsonAsset, function (error, res) {
        if (error) {
          return;
        }

        var jsondata = res.json;
        callback(jsondata); //cc.log("jsondata=="+JSON.stringify(jsondata.data))
      }.bind(this));
    }.bind(this));
  },
  loadBundleSprite: function loadBundleSprite(bundlename, loadname, node, cb) {
    cc.assetManager.loadBundle(bundlename, function (err, bundle) {
      bundle.load(loadname, cc.SpriteFrame, function (err, spriteframe) {
        if (err) {
          return;
        }

        node.spriteFrame = spriteframe;
        cb(true);
      }.bind(this));
    }.bind(this));
  },
  guid: function guid() {
    function S4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }

    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  },
  timeConvertInt: function timeConvertInt(time) {
    //let converttime = 0;
    var sceond = parseInt(time / 1000); // if(sceond<=10){
    //     converttime = sceond;
    // }else{
    //     let timestr = sceond+'';
    //     let s1 = timestr.substring(0,timestr.length-1);
    //     s1 = s1+'0';
    //     converttime = parseInt(s1)
    // }

    return sceond;
  },
  random: function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
  },
  distance: function distance(p1, p2) {
    var dx = Math.abs(p2.x - p1.x);
    var dy = Math.abs(p2.y - p1.y);
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  },
  //货币进位
  goldCrarryBit: function goldCrarryBit(gold) {
    var array = [[100000000, 'N'], [10000000, 'T'], [1000000, 'G'], [100000, 'M'], [10000, 'K'], [1000, 'B']];

    for (var i = 0; i < array.length; i++) {
      var value = gold / array[i][0];

      if (value > 1) {
        return '' + value.toFixed(1) + array[i][1];
      }
    }

    return gold;
  },
  setVirusColor: function setVirusColor(node, color) {
    for (var i = 0; i < node.children.length; i++) {
      var js = node.children[i].getComponent('color');

      if (js != null) {
        node.children[i].color = color;
      }

      this.setVirusColor(node.children[i], color);
    }
  },
  getVirusColorByHp: function getVirusColorByHp(hp) {
    for (var i = 0; i < gVirusColor.length; i++) {
      if (hp <= gVirusColor[i].pro) {
        return gVirusColor[i].color;
      }
    }
  },
  getVirusScaleByHp: function getVirusScaleByHp(hp) {
    for (var i = 0; i < gVirusColor.length; i++) {
      if (hp <= gVirusColor[i].pro) {
        return gVirusScale[i].scale;
      }
    }
  },
  getRandomSpeed: function getRandomSpeed() {
    var index = random(0, gSpeed.length - 1);
    return gSpeed[index];
  },
  randAlloc: function randAlloc(total, min, max, length) {
    // 首先要判断是否符合 min 和 max 条件
    if (min * length > total || max * length < total) {
      throw Error("\u6CA1\u6CD5\u6EE1\u8DB3\u6700\u6700\u5C11 " + min + " \u6700\u5927 " + max + " \u7684\u6761\u4EF6");
    }

    var result = [];
    var restValue = total;
    var restLength = length;

    for (var i = 0; i < length - 1; i++) {
      restLength--; // 这一次要发的数量必须保证剩下的要足最小量
      // 同进要保证剩下的不能大于需要的最大量

      var restMin = restLength * min;
      var restMax = restLength * max; // 可发的量

      var usable = restValue - restMin; // 最少要发的量

      var minValue = Math.max(min, restValue - restMax); // 以 minValue 为最左，max 为中线来进行随机，即随机范围是 (max - minValue) * 2
      // 如果这个范围大于 usable - minValue，取 usable - minValue

      var limit = Math.min(usable - minValue, (max - minValue) * 2); // 随机部分加上最少要发的部分就是应该发的，但是如果大于 max，最大取到 max

      result[i] = Math.min(max, minValue + Math.floor(limit * Math.random()));
      restValue -= result[i];
    }

    result[length - 1] = restValue;
    return result;
  },
  copyText: function copyText(word, rid) {
    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME || cc.sys.platform == cc.sys.WECHAT_GAME || cc.sys.platform == cc.sys.BAIDU_GAME) {
      //头条平台
      var comObject;

      if (cc.sys.platform == cc.sys.BAIDU_GAME) {
        comObject = swan;
      } else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
        comObject = wx;
      } else {
        comObject = tt;
      }

      comObject.setClipboardData({
        data: word,
        success: function success(res) {
          if (cc.sys.platform == cc.sys.BAIDU_GAME) {
            comObject.showToast({
              title: '加载完成',
              icon: 'none'
            });
          }

          comObject.getClipboardData({
            success: function success(res) {
              var spreadUrl = consts.HTTP_SPREAD_REPORT + 'rid=' + rid + '&status=' + 1;
              httpUtils.httpSendRequest(spreadUrl, function (spreadRes) {});
            },
            fail: function fail(res) {
              var spreadUrl = consts.HTTP_SPREAD_REPORT + 'rid=' + rid + '&status=' + 0;
              httpUtils.httpSendRequest(spreadUrl, function (spreadRes) {});
            }
          });
        },
        fail: function fail(res) {
          var spreadUrl = consts.HTTP_SPREAD_REPORT + 'rid=' + rid + '&status=' + 0;
          httpUtils.httpSendRequest(spreadUrl, function (spreadRes) {});
        }
      });
    }
  },
  spreadWordFun: function spreadWordFun() {
    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME || cc.sys.platform == cc.sys.WECHAT_GAME || cc.sys.platform == cc.sys.BAIDU_GAME) {
      //头条平台
      var comApp, combrand, commodel;

      if (cc.sys.platform == cc.sys.BAIDU_GAME) {
        var _swan$getSystemInfoSy = swan.getSystemInfoSync(),
            host = _swan$getSystemInfoSy.host,
            brand = _swan$getSystemInfoSy.brand,
            model = _swan$getSystemInfoSy.model;

        comApp = host;
        combrand = brand;
        commodel = model;
      } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX') {
        var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
            appName = _wx$getSystemInfoSync.appName,
            _brand = _wx$getSystemInfoSync.brand,
            _model = _wx$getSystemInfoSync.model;

        comApp = appName;
        combrand = _brand;
        commodel = _model;
      } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ') {
        var _qq$getSystemInfoSync = qq.getSystemInfoSync(),
            _appName = _qq$getSystemInfoSync.appName,
            _brand2 = _qq$getSystemInfoSync.brand,
            _model2 = _qq$getSystemInfoSync.model;

        comApp = _appName;
        combrand = _brand2;
        commodel = _model2;
      } else {
        var _tt$getSystemInfoSync = tt.getSystemInfoSync(),
            _appName2 = _tt$getSystemInfoSync.appName,
            _brand3 = _tt$getSystemInfoSync.brand,
            _model3 = _tt$getSystemInfoSync.model;

        comApp = _appName2;
        combrand = _brand3;
        commodel = _model3;
      }

      var param = {
        "did": appGame.userId,
        "package": consts.HTTP_RECORD_PACKAGE,
        "app": comApp,
        "brand": combrand,
        "model": commodel
      }; //console.log("param=="+JSON.stringify(param))

      httpUtils.httpPostParam(consts.HTTP_SPREAD_WORD, param, function (resWord) {
        //console.log("resWord =="+JSON.stringify(resWord))
        if (resWord) {
          if (resWord.code == 200 && resWord.data) {
            appGame.gameServerRoom.wordRid = resWord.rid;
            util.copyText(resWord.data, resWord.rid);
          } else {
            appGame.gameServerRoom.wordRid = '';
          }
        }
      }.bind(this));
    } // let param = {"did":appGame.userId,"package":consts.HTTP_RECORD_PACKAGE,"app":"Toutiao"};
    // cc.log("param=="+JSON.stringify(param))
    // httpUtils.httpPostParam(consts.HTTP_SPREAD_WORD,param,function(resWord){
    //     cc.log("resWord =="+JSON.stringify(resWord))
    //     if(resWord){
    //         if(resWord.data && resWord.code == 200){
    //              appGame.gameServerRoom.wordRid = resWord.rid
    //             let spreadUrl =consts.HTTP_SPREAD_REPORT+'rid='+resWord.rid+'&status='+0;
    //             httpUtils.httpSendRequest(spreadUrl,function(spreadRes){}.bind(this));
    //             util.copyText(resWord.data,resWord.rid);
    //         }else{
    //             appGame.gameServerRoom.wordRid = '';
    //         }
    //     }else{
    //         appGame.gameServerRoom.wordRid = '';
    //     }
    // }.bind(this));

  },
  spreadClose: function spreadClose(rid) {
    var ridUrl = consts.HTTP_SPREAD_CLOSE + rid;
    httpUtils.httpSendRequest(ridUrl, function (spreadRes) {});
  },

  /*
  * url 获取配置url
  * bundle  本地配置bundle
  * json  本地配置文件名
  * config  存在该字段 
  * cb 回调
  */
  getUrlSerConfig: function getUrlSerConfig(url, bundle, json, cb) {
    httpUtils.httpSendRequest(url, function (res) {
      //console.log("room =="+JSON.stringify(res))
      if (res && res.Code == 200) {
        var detailparse = JSON.parse(res.Detail);
        cb(detailparse);
      } else {
        util.loadJSONData(bundle, json, function (data) {
          cb(data);
        }.bind(this));
      }
    }.bind(this));
  },

  /*
  *比较版本号
  */
  compareVersion: function compareVersion(v1, v2) {
    v1 = v1.split('.');
    v2 = v2.split('.');
    var len = Math.max(v1.length, v2.length);

    while (v1.length < len) {
      v1.push('0');
    }

    while (v2.length < len) {
      v2.push('0');
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i]);
      var num2 = parseInt(v2[i]);

      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }

    return 0;
  }
};

cc._RF.pop();