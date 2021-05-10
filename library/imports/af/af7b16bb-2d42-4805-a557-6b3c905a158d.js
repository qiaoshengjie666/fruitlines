"use strict";
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