
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/network/Socket.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxuZXR3b3JrXFxTb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0Q7QUFDbEQsNkNBQXVDO0FBRXZDOztFQUVFO0FBRUY7SUFPQyxnQkFBbUIsSUFBSTtRQU5mLFlBQU8sR0FBUSxJQUFJLENBQUM7UUFHcEIsbUJBQWMsR0FBVSxHQUFHLENBQUM7UUFDNUIsb0JBQWUsR0FBVyxLQUFLLENBQUM7UUFDeEMsZUFBVSxHQUFVLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFHTywyQkFBVSxHQUFsQixVQUFtQixJQUFRO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87WUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ3RFLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNsRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDZixDQUFDO0lBRU8sd0JBQU8sR0FBZjtRQUFBLGlCQWlCQztRQWhCQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUM3QixJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUNwQjtZQUNDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRSxHQUFHLEdBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7U0FDaEQ7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFHLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxVQUFVLEdB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QUNsQixDQUFDO0lBRU0sOEJBQWEsR0FBcEIsVUFBcUIsQ0FBYTtRQUFiLGtCQUFBLEVBQUEsUUFBYTtRQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyx1QkFBUyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsd0JBQXdCO0lBQ3pCLENBQUM7SUE3Qk0sWUFBSyxHQUFHLENBQUMsQ0FBQztJQThCbEIsYUFBQztDQWpJRCxBQWlJQyxJQUFBO0FBaklZLHdCQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZUhhbmRsZXIgfSBmcm9tIFwiLi9NZXNzYWdlSGFuZGxlclwiO1xuaW1wb3J0IHtTb2NrZXRUYWd9IGZyb20gXCIuL01lc3NhZ2VUeXBlXCJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiLi9NZXNzYWdlXCI7XG4vKipcbiogbmFtZSBcbiovXG5cbmV4cG9ydCBjbGFzcyBTb2NrZXR7XG5cdHByaXZhdGUgX2NvbmZpZzogYW55ID0gbnVsbDtcblx0cHJpdmF0ZSBfd2ViU29ja2V0OiBXZWJTb2NrZXQ7XG5cdHByaXZhdGUgX21lc3NhZ2VIYW5kbGVyOiBNZXNzYWdlSGFuZGxlcjtcblx0cHJpdmF0ZSBfcmVjb25uZXRUaW1lczpudW1iZXIgPSAyMDA7XG5cdHByaXZhdGUgX2RlZmF1bHRUaW1lb3V0OiBudW1iZXIgPSAxMDAwMDtcblx0cmV0cnlUaW1lcjpudW1iZXIgPSAwO1xuXHRwdWJsaWMgY29uc3RydWN0b3IoY29uZikge1xuXHRcdHRoaXMuaW5pdFNvY2tldChjb25mKTtcblx0fVxuXG5cblx0cHJpdmF0ZSBpbml0U29ja2V0KGNvbmY6YW55KXtcblx0XHR0aGlzLl9jb25maWcgPSBjb25mO1xuXHRcdGlmKCF0aGlzLl9jb25maWcudGltZW91dCkgdGhpcy5fY29uZmlnLnRpbWVvdXQgPSB0aGlzLl9kZWZhdWx0VGltZW91dDtcblx0XHRpZih0aGlzLl9jb25maWcucmV0aW1lKSB0aGlzLl9yZWNvbm5ldFRpbWVzID0gdGhpcy5fY29uZmlnLnJldGltZTtcblx0XHR0aGlzLmNvbm5lY3QoKVxuXHR9XG5cblx0cHJpdmF0ZSBjb25uZWN0KCl7XG5cdFx0bGV0IGFkZHIgPSB0aGlzLl9jb25maWcuaG9zdDtcblx0XHRpZih0aGlzLl9jb25maWcucG9ydClcblx0XHR7XG5cdFx0XHRhZGRyID0gdGhpcy5fY29uZmlnLmhvc3QgK1wiOlwiICt0aGlzLl9jb25maWcucG9ydFxuXHRcdH1cblx0XHRjb25zb2xlLmxvZyhcInN0YXJ0IGNvbm5lY3Qgc2VydmVyPj4+PlwiICwgYWRkcik7XG5cdFx0dGhpcy5fd2ViU29ja2V0ID0gbmV3IFdlYlNvY2tldChhZGRyKTtcblx0XHR0aGlzLl9tZXNzYWdlSGFuZGxlciA9IG5ldyBNZXNzYWdlSGFuZGxlcih0aGlzLl93ZWJTb2NrZXQpO1xuXHRcdC8vIHRoaXMuX3dlYlNvY2tldC5lbmRpYW4gPSBMYXlhLkJ5dGUuQklHX0VORElBTjtcblx0XHQvLyBpZih0aGlzLl9jb25maWcudGltZW91dCl0aGlzLl93ZWJTb2NrZXQudGltZW91dD10aGlzLl9jb25maWcudGltZW91dDtcblx0XHRcblx0XHR0aGlzLl93ZWJTb2NrZXQub25vcGVuID0gKGV2ZW50KT0+dGhpcy5vblNvY2tldE9wZW4oKTtcblx0XHR0aGlzLl93ZWJTb2NrZXQub25tZXNzYWdlID0gKGV2ZW50KT0+dGhpcy5vblJlY2VpdmVNZXNzYWdlKGV2ZW50KTtcblx0XHR0aGlzLl93ZWJTb2NrZXQub25jbG9zZSA9IChldmVudCk9PnRoaXMub25Tb2NrZXRDbG9zZSgpO1xuXHRcdHRoaXMuX3dlYlNvY2tldC5vbmVycm9yID0gKGV2ZW50KT0+dGhpcy5vblNvY2tldEVycm9yKCk7XG5cblx0fVxuXG5cdHB1YmxpYyBjbG9zZSgpe1xuXHRcdGlmKHRoaXMuX3dlYlNvY2tldCl7XG5cdFx0XHQvLyB0aGlzLl93ZWJTb2NrZXQub2ZmQWxsKG51bGwpO1xuXHRcdFx0dGhpcy5fd2ViU29ja2V0LmNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGZsdXNoKCl7XG5cdFx0Ly8gaWYodGhpcy5fd2ViU29ja2V0LmNvbm5lY3RlZCl7XG5cdFx0XHQvLyB0aGlzLl93ZWJTb2NrZXQuZmx1c2goKTtcblx0XHQvLyB9XG5cdH1cblxuXHRwdWJsaWMgZW5hYmxlSGVhcnRiZWF0KGVuYWJsZSkge1xuXHRcdHRoaXMuX21lc3NhZ2VIYW5kbGVyLmVuYWJsZUhlYXJ0YmVhdCA9IGVuYWJsZTtcblx0fVxuXG5cdHByaXZhdGUgb25Tb2NrZXRPcGVuKCk6IHZvaWR7XG5cdFx0Y29uc29sZS5sb2coXCJjb25uZWN0IFwiICsgdGhpcy5fY29uZmlnLmhvc3QgK1wiIHN1Y2Nlc3NcIik7XG5cdFx0dGhpcy5fbWVzc2FnZUhhbmRsZXIuZGlzcGF0Y2goU29ja2V0VGFnLktTT0NLRVRfT1BFTiwgXCJcIik7XG5cdH1cblxuXHRwcml2YXRlIG9uUmVjZWl2ZU1lc3NhZ2UoZXZlbnQ6IGFueSA9IG51bGwpOiB2b2lke1xuXHRcdGNvbnNvbGUubG9nKFwid2Vic29ja2V0IHJlY2VpdmUgbWVzc2FnZTpcIiArIGV2ZW50LmRhdGEpO1xuXHRcdGlmICh0eXBlb2Yod3gpID09IFwidW5kZWZpbmVkXCIpXG5cdFx0e1xuXHRcdFx0dGhpcy50b0FycmF5QnVmZmVyKGV2ZW50LmRhdGEpLnRoZW4oYXJyYnVmPT57XG5cdFx0XHRcdHRoaXMuX21lc3NhZ2VIYW5kbGVyLmRpc3BhdGNoKFNvY2tldFRhZy5LU09DS0VUX01FU1NBR0UsIGFycmJ1Zik7XG5cdFx0XHR9KVxuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5fbWVzc2FnZUhhbmRsZXIuZGlzcGF0Y2goU29ja2V0VGFnLktTT0NLRVRfTUVTU0FHRSwgZXZlbnQuZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSB0b0FycmF5QnVmZmVyKGJsb2IpOlByb21pc2U8QXJyYXlCdWZmZXI+XG5cdHtcblx0XHQvL+WwhkJsb2Ig5a+56LGh6L2s5o2i5oiQIEFycmF5QnVmZmVyXG5cdFx0dmFyIGFycmF5QnVmZmVyO1xuXHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKTtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuXHRcdFx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGFycmF5QnVmZmVyID0gcmVhZGVyLnJlc3VsdDtcblx0XHRcdFx0cmVzb2x2ZShhcnJheUJ1ZmZlcik7XG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdFxuXHRwdWJsaWMgc2VuZE1lc3NhZ2UobXNnOiBNZXNzYWdlKTogYm9vbGVhbntcblx0XHRpZiggdGhpcy5fd2ViU29ja2V0LnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0Lk9QRU4gKXtcblx0XHRcdHRoaXMuX21lc3NhZ2VIYW5kbGVyLnNlbmRNZXNzYWdlKG1zZyk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cHVibGljIHNlbmRDdXN0b21NZXNzYWdlKG1zZzogTWVzc2FnZSkge1xuXHRcdHRoaXMuX21lc3NhZ2VIYW5kbGVyLmRpc3BhdGNoTWVzc2FnZShtc2cpO1xuXHR9XG5cblx0c3RhdGljIGNvdW50ID0gMDtcblxuXHRwcml2YXRlIHJlY29ubmVjdCgpe1xuXHRcdC8vIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnVuc2NoZWR1bGVBbGxGb3JUYXJnZXQodGhpcyk7XG5cdFx0aWYoU29ja2V0LmNvdW50ID49IDJ8fHRoaXMuX3dlYlNvY2tldC5yZWFkeVN0YXRlID09IFdlYlNvY2tldC5PUEVOKVxuXHRcdHtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnJldHJ5VGltZXIpO1xuXHRcdH1lbHNle1xuXHRcdFx0aWYodGhpcy5fd2ViU29ja2V0LnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0LkNMT1NFRClcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5jb25uZWN0KCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJldHJ5VGltZXIgPSBzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRcdHRoaXMucmVjb25uZWN0KCk7XG5cdFx0XHR9LHRoaXMuX3JlY29ubmV0VGltZXMpXG5cdFx0fVxuXHR9XG5cblx0cHVibGljIG9uU29ja2V0Q2xvc2UoZTogYW55ID0gbnVsbCl7XG5cdFx0dGhpcy5fbWVzc2FnZUhhbmRsZXIuZGlzcGF0Y2goU29ja2V0VGFnLktTT0NLRVRfQ0xPU0UsIFwiXCIpO1xuXHRcdGNvbnNvbGUubG9nKFwid2Vic29ja2V0IGNvbm5lY3QgY2xvc2UuXCIgLHRoaXMuX3dlYlNvY2tldC5yZWFkeVN0YXRlKTtcblx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0dGhpcy5yZWNvbm5lY3QoKTtcblx0fVxuXG5cdHB1YmxpYyBvblNvY2tldEVycm9yKGU6IGFueSA9IG51bGwpe1xuXHRcdHRoaXMuX21lc3NhZ2VIYW5kbGVyLmRpc3BhdGNoKFNvY2tldFRhZy5LU09DS0VUX0VSUk9SLCBcIlwiKTtcblx0XHRjb25zb2xlLmxvZyhcIndlYnNvY2tldCBpbyBlcnJvci5cIik7XG5cdFx0Ly8gdGhpcy5yZWNvbm5lY3QodHJ1ZSk7XG5cdH1cbn0iXX0=