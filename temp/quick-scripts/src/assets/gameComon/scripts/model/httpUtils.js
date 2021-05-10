"use strict";
cc._RF.push(module, '1c82dl9OYBOLaaJO15Yt8bQ', 'httpUtils');
// gameComon/scripts/model/httpUtils.js

"use strict";

module.exports = {
  onLoad: function onLoad() {},
  httpGet: function httpGet(url, cb) {
    var xhr = cc.loader.getXMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        var respone = xhr.responseText;
        cb && cb(null, respone);
      } else if (xhr.readyState === 4 && (xhr.status > 400 || xhr.status == 0)) {
        cb && cb(xhr.status);
      }
    };

    xhr.onerror = function (error) {
      cc.log('httpUtils onreadystatechange  onerror====' + xhr.readyState + '===' + xhr.status);

      if (xhr.readyState == 4 && xhr.status == 0 || xhr.readyState == 1 && xhr.status == 0) {
        cb && cb(503); //503   （服务不可用） 服务器目前无法使用（由于超载或停机维护）
      }
    };

    if (cc.sys.isNative) {
      xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
    }

    xhr.open("GET", url, true);
    xhr.timeout = 5000; // 5 seconds for timeout

    xhr.send();
  },
  httpGets: function httpGets(url, callback) {
    cc.log("url==" + url);
    var xhr = cc.loader.getXMLHttpRequest();
    var timedout = false;
    var timer = setTimeout(function () {
      timedout = true;
      xhr.abort();
      callback();
    }, 2000);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (timedout) {
          return;
        }

        clearTimeout(timer);

        if (xhr.status >= 200 && xhr.status < 300) {
          var respone = xhr.responseText;

          if (respone) {
            callback(respone);
          }
        } else if (xhr.status > 400 || xhr.status == 0) {
          callback("false");
        }
      }
    };

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

    if (cc.sys.isNative) {
      xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
    }

    xhr.send();
  },
  httpPost: function httpPost(url, params, callback) {
    var query = [];
    var snmiguid = cc.sys.localStorage.getItem('snmi_guid');
    query['snmi'] = encodeURIComponent(JSON.stringify(snmiguid));
    query['deviceInfo'] = encodeURIComponent(JSON.stringify(appGame.deviceInfo));
    query['timestamp'] = new Date().getTime();
    var info = {
      'package': consts.HTTP_RECORD_PACKAGE,
      'packageName': consts.HTTP_RECORD_PACKAGENAME,
      'packageVersion': appGame.packageVersion,
      'versionCode': '1',
      'platfrom': appGame.platform
    };
    query['manifest'] = encodeURIComponent(JSON.stringify(info));
    query['title'] = encodeURIComponent(params.title);
    query['content'] = encodeURIComponent(params.content);

    if (params.desc) {
      query['desc'] = encodeURIComponent(params.desc);
    } else {
      query['desc'] = encodeURIComponent('');
    }

    var xhr = cc.loader.getXMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        var respone = xhr.responseText;

        if (respone) {
          callback(respone);
        }
      } else {
        callback(-1);
      }
    }; //xhr.open("POST", url, true);
    //xhr.send(params);  decodeURIComponent


    var geturl = url + "?" + Object.keys(query).map(function (key) {
      return key + "=" + query[key];
    }).join('&'); //cc.log("geturl===="+geturl)

    xhr.open("GET", geturl, true);
    xhr.send();
  },
  httpSendRequest: function httpSendRequest(url, callback) {
    //cc.log("url==="+url)
    var xhr = cc.loader.getXMLHttpRequest();
    var timedout = false;
    var timer = setTimeout(function () {
      timedout = true;
      xhr.abort();
      callback(-1);
    }, 2000);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (timedout) {
          return;
        }

        clearTimeout(timer);

        if (xhr.status >= 200 && xhr.status < 300) {
          var respone = xhr.responseText;

          if (respone) {
            var respones = JSON.parse(respone);
            callback(respones);
          } else {
            callback(1);
          }
        } else if (xhr.status > 400 || xhr.status == 0) {
          callback(-1);
        }
      }
    };

    xhr.open("POST", url, true);
    xhr.send(); //xhr.open("POST", url, true);
    //xhr.send(params);
  },
  httpPostParam: function httpPostParam(url, params, callback) {
    var xhr = cc.loader.getXMLHttpRequest();

    xhr.onreadystatechange = function () {
      console.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);

      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        var respone = xhr.responseText;

        if (respone) {
          var pars = JSON.parse(respone);
          callback(pars);
        }
      } else {
        callback(-1);
      }
    };

    xhr.open("POST", url, true); //xhr.setRequestHeader('Access-Control-Allow-Origin', '*'); 
    //xhr.setRequestHeader('content-type', 'application/json')

    xhr.timeout = 5000; // 5 seconds for timeout  

    var payload = JSON.stringify(params);
    xhr.send(payload);
  },
  loadNetToNativeImg: function loadNetToNativeImg(url, callback) {
    var dirpath = jsb.fileUtils.getWritablePath() + 'img/';
    var filepath = dirpath + MD5(url) + '.png';

    function loadEnd() {
      cc.loader.load(filepath, function (err, tex) {
        if (err) {
          cc.error(err);
        } else {
          var spriteFrame = new cc.SpriteFrame(tex);

          if (spriteFrame) {
            spriteFrame.retain();
            callback(spriteFrame);
          }
        }
      });
    }

    if (jsb.fileUtils.isFileExist(filepath)) {
      cc.log('Remote is find' + filepath);
      loadEnd();
      return;
    }

    var saveFile = function saveFile(data) {
      if (typeof data !== 'undefined') {
        if (!jsb.fileUtils.isDirectoryExist(dirpath)) {
          jsb.fileUtils.createDirectory(dirpath);
        }

        if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
          cc.log('Remote write file succeed.');
          loadEnd();
        } else {
          cc.log('Remote write file failed.');
        }
      } else {
        cc.log('Remote download file failed.');
      }
    };

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      cc.log("xhr.readyState  " + xhr.readyState);
      cc.log("xhr.status  " + xhr.status);

      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          xhr.responseType = 'arraybuffer';
          saveFile(xhr.response);
        } else {
          saveFile(null);
        }
      }
    }.bind(this);

    xhr.open("GET", url, true);
    xhr.send();
  }
};

cc._RF.pop();