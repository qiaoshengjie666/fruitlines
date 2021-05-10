"use strict";
cc._RF.push(module, 'dde8btrP25FeqHeKW+G4Pfb', 'MessageBase');
// framework/network/MessageBase.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBase = void 0;
var MessageType_1 = require("./MessageType");
var Message_1 = require("./Message");
var ConnectManager_1 = require("./ConnectManager");
var MessageBase = /** @class */ (function () {
    function MessageBase() {
        this.Cmd = {};
        this.Error = {};
        this._allFuncs = {};
        for (var i in game.Command) {
            var v = game.Command[i];
            this.Cmd[v] = i;
        }
        for (var i in game.ErrorCode) {
            var v = game.ErrorCode[i];
            this.Error[v] = i;
        }
    }
    MessageBase.prototype.useSocketKey = function (key) {
        this._socketKey = key;
    };
    MessageBase.prototype.addListener = function (cmd, func) {
        this._allFuncs[cmd] = func;
    };
    MessageBase.prototype.removeListener = function (cmd) {
        if (this._allFuncs[cmd] != null) {
            this._allFuncs[cmd] = null;
        }
    };
    MessageBase.prototype.onMessage = function (obj) {
        if (obj.type == MessageType_1.SocketTag.KSOCKET_MESSAGE) {
            var int8a = new Uint8Array(obj.msg);
            var buffer = new flatbuffers.ByteBuffer(int8a);
            var msg = game.Package.getRootAsPackage(buffer);
            if (this._allFuncs[msg.cmd()] != null) {
                return this._allFuncs[msg.cmd()].call(this, msg);
            }
            else
                return this.onHandler(msg);
        }
        else {
            this.onSocket(obj.type);
            return true;
        }
    };
    /**
     * 处理socket消息
     * @param type
     */
    MessageBase.prototype.onSocket = function (type) {
    };
    /**
     * 重写消息处理函数
     * return 消息处理结果，处理完成返回真，否则返回假(消息会入消息队列，等待下次处理)
     */
    MessageBase.prototype.onHandler = function (msg) {
        return false;
    };
    MessageBase.prototype.sendMessage = function (msg) {
        ConnectManager_1.connManager.sendMessage(msg, this._socketKey);
    };
    MessageBase.prototype.onDestory = function () {
        this._allFuncs = null;
    };
    MessageBase.prototype.send = function (cmd, cmdstr, procedure, build) {
        if (cmdstr === void 0) { cmdstr = ""; }
        if (procedure === void 0) { procedure = null; }
        if (build === void 0) { build = null; }
        console.log("Send Message : [" + this.Cmd[cmd] + "]");
        var socket = ConnectManager_1.connManager.getDefault();
        var msg = new Message_1.Message(cmd);
        var ds = game[cmdstr];
        if (ds != null) {
            if (build == null) {
                build = this.createBuilder();
            }
            var startFunc = ds["start" + cmdstr];
            var endFunc = ds["end" + cmdstr];
            startFunc.call(ds, build);
            if (procedure) {
                procedure(build);
                //game[cmd].addTaskId(build,task_id);
            }
            build.finish(endFunc.call(ds, build));
            msg.addBuilder(build);
        }
        else {
            msg.addString(cmdstr);
        }
        socket.sendMessage(msg);
    };
    MessageBase.prototype.createBuilder = function () {
        return new flatbuffers.Builder();
    };
    return MessageBase;
}());
exports.MessageBase = MessageBase;

cc._RF.pop();