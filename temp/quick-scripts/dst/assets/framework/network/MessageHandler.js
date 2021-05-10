
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/network/MessageHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'af7b1a7LUJIBaVXazyQWhWN', 'MessageHandler');
// framework/network/MessageHandler.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHandler = void 0;
var Message_1 = require("./Message");
var MessageType_1 = require("./MessageType");
var MessageDispatch_1 = require("./MessageDispatch");
var MessageHandler = /** @class */ (function () {
    function MessageHandler(webSocket) {
        this._writeMessage = null;
        this._messages = null;
        this._messages = [];
        this._heartbeatTime = 0;
        this._writeMessage = [];
        this._webSocket = webSocket;
        this.setHeartbeatInterval(30); //30秒
        this._isEnableHeartbeat = false;
    }
    Object.defineProperty(MessageHandler.prototype, "enableHeartbeat", {
        get: function () {
            return this._isEnableHeartbeat;
        },
        set: function (flag) {
            this._isEnableHeartbeat = flag;
        },
        enumerable: false,
        configurable: true
    });
    MessageHandler.prototype.setHeartbeatInterval = function (time) {
        if (time <= 0)
            time = 1;
        this._heartbeatInterval = time * 1000;
    };
    MessageHandler.prototype.onUpdate = function (timeStamp) {
        if (this._writeMessage.length > 0) {
            var msg = this._writeMessage[0];
            var message = msg.pack();
            if (this._webSocket.readyState == WebSocket.OPEN) {
                console.log("size: " + message.byteLength);
                this._webSocket.send(message);
                this._writeMessage.shift();
            }
        }
        if (this._messages.length > 0) {
            var msg = this._messages.shift();
            this.dispatchMessage(msg);
        }
        if (this._isEnableHeartbeat)
            this.checkHeartbeat();
        return false;
    };
    MessageHandler.prototype.checkHeartbeat = function () {
        var diff = new Date().getTime() - this._heartbeatTime;
        if (diff >= this._heartbeatInterval) {
            this.sendMessage(new Message_1.Message(game.Command.Heartbeat));
            this._heartbeatTime = new Date().getTime();
        }
    };
    MessageHandler.prototype.dispatchMessage = function (msg) {
        var dispatch = MessageDispatch_1.MessageDispatch.getInstance();
        if (!dispatch.onMessage(msg)) {
            this._messages.push(msg);
        }
    };
    MessageHandler.prototype.dispatchSocket = function (type) {
        var obj = { type: type };
        this.dispatchMessage(obj);
    };
    MessageHandler.prototype.dispatch = function (type, msg) {
        var _this = this;
        if (type == MessageType_1.SocketTag.KSOCKET_OPEN) {
            // cc.director.getScheduler().unschedule(this.onUpdate,this)
            // cc.director.getScheduler().schedule(this.onUpdate,this,0);
            clearInterval(this.updateTimer);
            this.updateTimer = setInterval(function (dt) { return _this.onUpdate(dt); }, 1000 / 60);
            this.dispatchSocket(type);
        }
        else if (type == MessageType_1.SocketTag.KSOCKET_CLOSE) {
            clearInterval(this.updateTimer);
            this.dispatchSocket(type);
        }
        else if (type == MessageType_1.SocketTag.KSOCKET_ERROR) {
            clearInterval(this.updateTimer);
            this.dispatchSocket(type);
        }
        else if (type == MessageType_1.SocketTag.KSOCKET_MESSAGE) {
            var obj = { type: type, msg: msg };
            this.dispatchMessage(obj);
        }
    };
    MessageHandler.prototype.clearWriteMessage = function () {
        this._writeMessage = [];
    };
    MessageHandler.prototype.clearMessage = function () {
        this._messages = [];
    };
    MessageHandler.prototype.sendMessage = function (msg) {
        this._writeMessage.push(msg);
    };
    return MessageHandler;
}());
exports.MessageHandler = MessageHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxuZXR3b3JrXFxNZXNzYWdlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFvQztBQUNwQyw2Q0FBdUM7QUFDdkMscURBQWlEO0FBQ2pEO0lBUUMsd0JBQW1CLFNBQWM7UUFOekIsa0JBQWEsR0FBYyxJQUFJLENBQUM7UUFDaEMsY0FBUyxHQUFVLElBQUksQ0FBQztRQU0vQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQSxLQUFLO1FBQ25DLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVELHNCQUFXLDJDQUFlO2FBSTFCO1lBQ0MsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDaEMsQ0FBQzthQU5ELFVBQTJCLElBQWE7WUFDdkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTtJQU1NLDZDQUFvQixHQUEzQixVQUE0QixJQUFZO1FBQ3ZDLElBQUcsSUFBSSxJQUFJLENBQUM7WUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxpQ0FBUSxHQUFoQixVQUFpQixTQUFpQjtRQUNqQyxJQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztZQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksT0FB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QUFHLEVBQUUsR0FBRyxFQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMxQjtJQUNGLENBQUM7SUFFTSwwQ0FBaUIsR0FBeEI7UUFDQyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU0scUNBQVksR0FBbkI7UUFDQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sb0NBQVcsR0FBbEIsVUFBbUIsR0FBWTtRQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0YscUJBQUM7QUFBRCxDQW5HQSxBQW1HQyxJQUFBO0FBbkdZLHdDQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCIuL01lc3NhZ2VcIjtcbmltcG9ydCB7U29ja2V0VGFnfSBmcm9tIFwiLi9NZXNzYWdlVHlwZVwiXG5pbXBvcnQge01lc3NhZ2VEaXNwYXRjaH0gZnJvbSBcIi4vTWVzc2FnZURpc3BhdGNoXCJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlSGFuZGxlciB7XG5cdHByaXZhdGUgX3dlYlNvY2tldDogV2ViU29ja2V0O1xuXHRwcml2YXRlIF93cml0ZU1lc3NhZ2U6IE1lc3NhZ2VbXSA9IG51bGw7XG5cdHByaXZhdGUgX21lc3NhZ2VzOiBhbnlbXSA9IG51bGw7XG5cdHByaXZhdGUgX2hlYXJ0YmVhdEludGVydmFsOiBudW1iZXI7XG5cdHByaXZhdGUgX2hlYXJ0YmVhdFRpbWU6IG51bWJlcjtcblx0cHJpdmF0ZSBfaXNFbmFibGVIZWFydGJlYXQ6IGJvb2xlYW47XG5cdHByaXZhdGUgdXBkYXRlVGltZXI6bnVtYmVyO1xuXHRwdWJsaWMgY29uc3RydWN0b3Iod2ViU29ja2V0OiBhbnkpe1xuXHRcdHRoaXMuX21lc3NhZ2VzID0gW107XG5cdFx0dGhpcy5faGVhcnRiZWF0VGltZSA9IDA7XG5cdFx0dGhpcy5fd3JpdGVNZXNzYWdlID0gW107XG5cdFx0dGhpcy5fd2ViU29ja2V0ID0gd2ViU29ja2V0O1xuXHRcdHRoaXMuc2V0SGVhcnRiZWF0SW50ZXJ2YWwoMzApOy8vMzDnp5Jcblx0XHR0aGlzLl9pc0VuYWJsZUhlYXJ0YmVhdCA9IGZhbHNlO1xuXHR9XG5cblx0cHVibGljIHNldCBlbmFibGVIZWFydGJlYXQoZmxhZzogYm9vbGVhbil7XG5cdFx0dGhpcy5faXNFbmFibGVIZWFydGJlYXQgPSBmbGFnO1xuXHR9XG5cblx0cHVibGljIGdldCBlbmFibGVIZWFydGJlYXQoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2lzRW5hYmxlSGVhcnRiZWF0O1xuXHR9XG5cblx0cHVibGljIHNldEhlYXJ0YmVhdEludGVydmFsKHRpbWU6IG51bWJlcil7Ly/np5Jcblx0XHRpZih0aW1lIDw9IDApIHRpbWUgPSAxO1xuXHRcdHRoaXMuX2hlYXJ0YmVhdEludGVydmFsID0gdGltZSAqIDEwMDA7XG5cdH1cblxuXHRwcml2YXRlIG9uVXBkYXRlKHRpbWVTdGFtcDogbnVtYmVyKTogYm9vbGVhbntcblx0XHRpZih0aGlzLl93cml0ZU1lc3NhZ2UubGVuZ3RoID4gMCl7XG5cdFx0XHRsZXQgbXNnID0gdGhpcy5fd3JpdGVNZXNzYWdlWzBdO1xuXHRcdFx0bGV0IG1lc3NhZ2UgPSBtc2cucGFjaygpO1xuXHRcdFx0aWYodGhpcy5fd2ViU29ja2V0LnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0Lk9QRU4pe1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInNpemU6IFwiICsgbWVzc2FnZS5ieXRlTGVuZ3RoKTtcblx0XHRcdFx0dGhpcy5fd2ViU29ja2V0LnNlbmQobWVzc2FnZSk7XG5cdFx0XHRcdHRoaXMuX3dyaXRlTWVzc2FnZS5zaGlmdCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZih0aGlzLl9tZXNzYWdlcy5sZW5ndGggPiAwKXtcblx0XHRcdGxldCBtc2cgPSB0aGlzLl9tZXNzYWdlcy5zaGlmdCgpO1xuXHRcdFx0dGhpcy5kaXNwYXRjaE1lc3NhZ2UobXNnKTtcblx0XHR9XG5cdFx0aWYodGhpcy5faXNFbmFibGVIZWFydGJlYXQpXG5cdFx0XHR0aGlzLmNoZWNrSGVhcnRiZWF0KCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cHJpdmF0ZSBjaGVja0hlYXJ0YmVhdCgpe1xuXHRcdGxldCBkaWZmID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLl9oZWFydGJlYXRUaW1lO1xuXHRcdGlmKCBkaWZmID49IHRoaXMuX2hlYXJ0YmVhdEludGVydmFsKXtcblx0XHRcdHRoaXMuc2VuZE1lc3NhZ2UobmV3IE1lc3NhZ2UoZ2FtZS5Db21tYW5kLkhlYXJ0YmVhdCkpO1xuXHRcdFx0dGhpcy5faGVhcnRiZWF0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBkaXNwYXRjaE1lc3NhZ2UobXNnOiBhbnkpe1xuXHRcdGxldCBkaXNwYXRjaCA9IE1lc3NhZ2VEaXNwYXRjaC5nZXRJbnN0YW5jZSgpO1xuXHRcdGlmKCFkaXNwYXRjaC5vbk1lc3NhZ2UobXNnKSkge1xuXHRcdFx0dGhpcy5fbWVzc2FnZXMucHVzaChtc2cpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgZGlzcGF0Y2hTb2NrZXQodHlwZTogU29ja2V0VGFnKXtcblx0XHRsZXQgb2JqID0ge3R5cGU6IHR5cGV9O1xuXHRcdHRoaXMuZGlzcGF0Y2hNZXNzYWdlKG9iaik7XG5cdH1cblxuXHRwdWJsaWMgZGlzcGF0Y2godHlwZTogU29ja2V0VGFnLCBtc2c6IGFueSl7XG5cdFx0aWYodHlwZSA9PSBTb2NrZXRUYWcuS1NPQ0tFVF9PUEVOKXtcblx0XHRcdC8vIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnVuc2NoZWR1bGUodGhpcy5vblVwZGF0ZSx0aGlzKVxuXHRcdFx0Ly8gY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkuc2NoZWR1bGUodGhpcy5vblVwZGF0ZSx0aGlzLDApO1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLnVwZGF0ZVRpbWVyKTtcblx0XHRcdHRoaXMudXBkYXRlVGltZXIgPSBzZXRJbnRlcnZhbChkdD0+dGhpcy5vblVwZGF0ZShkdCksIDEwMDAvNjApO1xuXHRcdFx0dGhpcy5kaXNwYXRjaFNvY2tldCh0eXBlKTtcblx0XHR9ZWxzZSBpZih0eXBlID09IFNvY2tldFRhZy5LU09DS0VUX0NMT1NFKXtcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy51cGRhdGVUaW1lcik7XG5cdFx0XHR0aGlzLmRpc3BhdGNoU29ja2V0KHR5cGUpO1xuXHRcdH1lbHNlIGlmKHR5cGUgPT0gU29ja2V0VGFnLktTT0NLRVRfRVJST1Ipe1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLnVwZGF0ZVRpbWVyKTtcblx0XHRcdHRoaXMuZGlzcGF0Y2hTb2NrZXQodHlwZSk7XG5cdFx0fWVsc2UgaWYodHlwZSA9PSBTb2NrZXRUYWcuS1NPQ0tFVF9NRVNTQUdFKXtcblx0XHRcdGxldCBvYmogPSB7dHlwZTogdHlwZSwgbXNnOiBtc2d9O1xuXHRcdFx0dGhpcy5kaXNwYXRjaE1lc3NhZ2Uob2JqKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgY2xlYXJXcml0ZU1lc3NhZ2UoKXtcblx0XHR0aGlzLl93cml0ZU1lc3NhZ2UgPSBbXTtcblx0fVxuXG5cdHB1YmxpYyBjbGVhck1lc3NhZ2UoKXtcblx0XHR0aGlzLl9tZXNzYWdlcyA9IFtdO1xuXHR9XG5cblx0cHVibGljIHNlbmRNZXNzYWdlKG1zZzogTWVzc2FnZSl7XG5cdFx0dGhpcy5fd3JpdGVNZXNzYWdlLnB1c2gobXNnKTtcblx0fVxufSJdfQ==