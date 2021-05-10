"use strict";
cc._RF.push(module, '9e139lB+RRCNpxXRSqgoURG', 'Net');
// framework/plugin_boosts/misc/Net.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Net = /** @class */ (function () {
    function Net() {
    }
    Net.httpGet = function (url, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                var respone = xhr.responseText;
                callback(respone);
            }
        };
        xhr.open("GET", url, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000; // 5 seconds for timeout
        xhr.send();
    };
    Net.httpPost = function (url, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // console.log('xhr.readyState='+xhr.readyState+'  xhr.status='+xhr.status);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                var respone = xhr.responseText;
                callback(respone);
            }
            else {
                callback(-1);
            }
        };
        xhr.open("POST", url, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000; // 5 seconds for timeout
        xhr.send(params);
    };
    return Net;
}());
exports.default = Net;

cc._RF.pop();