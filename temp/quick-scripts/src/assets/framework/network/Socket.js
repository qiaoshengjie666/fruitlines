"use strict";
cc._RF.push(module, '8cfb4mvQk5BQqbWZvml7K36', 'Socket');
// framework/network/Socket.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
var MessageHandler_1 = require("./MessageHandler");
var MessageType_1 = require("./MessageType");
/**
* name
*/
var Socket = /** @class */ (function () {
    function Socket(conf) {
        this._config = null;
        this._reconnetTimes = 200;
        this._defaultTimeout = 10000;
        this.retryTimer = 0;
        this.initSocket(conf);
    }
    Socket.prototype.initSocket = function (conf) {
        this._config = conf;
        if (!this._config.timeout)
            this._config.timeout = this._defaultTimeout;
        if (this._config.retime)
            this._reconnetTimes = this._config.retime;
        this.connect();
    };
    Socket.prototype.connect = function () {
        var _this = this;
        var addr = this._config.host;
        if (this._config.port) {
            addr = this._config.host + ":" + this._config.port;
        }
        console.log("start connect server>>>>", addr);
        this._webSocket = new WebSocket(addr);
        this._messageHandler = new MessageHandler_1.MessageHandler(this._webSocket);
        // this._webSocket.endian = Laya.Byte.BIG_ENDIAN;
        // if(this._config.timeout)this._webSocket.timeout=this._config.timeout;
        this._webSocket.onopen = function (event) { return _this.onSocketOpen(); };
        this._webSocket.onmessage = function (event) { return _this.onReceiveMessage(event); };
        this._webSocket.onclose = function (event) { return _this.onSocketClose(); };
        this._webSocket.onerror = function (event) { return _this.onSocketError(); };
    };
    Socket.prototype.close = function () {
        if (this._webSocket) {
            // this._webSocket.offAll(null);
            this._webSocket.close();
        }
    };
    Socket.prototype.flush = function () {
        // if(this._webSocket.connected){
        // this._webSocket.flush();
        // }
    };
    Socket.prototype.enableHeartbeat = function (enable) {
        this._messageHandler.enableHeartbeat = enable;
    };
    Socket.prototype.onSocketOpen = function () {
        console.log("connect " + this._config.host + " success");
        this._messageHandler.dispatch(MessageType_1.SocketTag.KSOCKET_OPEN, "");
    };
    Socket.prototype.onReceiveMessage = function (event) {
        var _this = this;
        if (event === void 0) { event = null; }
        console.log("websocket receive message:" + event.data);
        if (typeof (wx) == "undefined") {
            this.toArrayBuffer(event.data).then(function (arrbuf) {
                _this._messageHandler.dispatch(MessageType_1.SocketTag.KSOCKET_MESSAGE, arrbuf);
            });
        }
        else {
            this._messageHandler.dispatch(MessageType_1.SocketTag.KSOCKET_MESSAGE, event.data);
        }
    };
    Socket.prototype.toArrayBuffer = function (blob) {
        //将Blob 对象转换成 ArrayBuffer
        var arrayBuffer;
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        return new Promise(function (resolve, reject) {
            reader.onload = function (e) {
                arrayBuffer = reader.result;
                resolve(arrayBuffer);
            };
        });
    };
    Socket.prototype.sendMessage = function (msg) {
        if (this._webSocket.readyState == WebSocket.OPEN) {
            this._messageHandler.sendMessage(msg);
            return true;
        }
        return false;
    };
    Socket.prototype.sendCustomMessage = function (msg) {
        this._messageHandler.dispatchMessage(msg);
    };
    Socket.prototype.reconnect = function () {
        var _this = this;
        // cc.director.getScheduler().unscheduleAllForTarget(this);
        if (Socket.count >= 2 || this._webSocket.readyState == WebSocket.OPEN) {
            clearTimeout(this.retryTimer);
        }
        else {
            if (this._webSocket.readyState == WebSocket.CLOSED) {
                this.connect();
            }
            this.retryTimer = setTimeout(function () {
                _this.reconnect();
            }, this._reconnetTimes);
        }
    };
    Socket.prototype.onSocketClose = function (e) {
        if (e === void 0) { e = null; }
        this._messageHandler.dispatch(MessageType_1.SocketTag.KSOCKET_CLOSE, "");
        console.log("websocket connect close.", this._webSocket.readyState);
        this.close();
        this.reconnect();
    };
    Socket.prototype.onSocketError = function (e) {
        if (e === void 0) { e = null; }
        this._messageHandler.dispatch(MessageType_1.SocketTag.KSOCKET_ERROR, "");
        console.log("websocket io error.");
        // this.reconnect(true);
    };
    Socket.count = 0;
    return Socket;
}());
exports.Socket = Socket;

cc._RF.pop();