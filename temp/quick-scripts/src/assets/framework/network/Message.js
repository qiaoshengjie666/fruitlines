"use strict";
cc._RF.push(module, 'fb4e0zpbzJB4YN77Kns7y3M', 'Message');
// framework/network/Message.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var Message = /** @class */ (function () {
    function Message(cmd) {
        this._cmd = cmd;
        this._data = null;
    }
    Message.prototype.addBuilder = function (data) {
        this._data = data.asUint8Array();
    };
    Message.prototype.addString = function (data) {
        this._data = data;
    };
    Message.prototype.pack = function () {
        var build = this.toString();
        var buf = build.asUint8Array();
        var newBuf = new Uint8Array(buf);
        console.log("send message: " + newBuf);
        return newBuf.buffer;
    };
    Message.prototype.toString = function () {
        var build = new flatbuffers.Builder();
        var data = null;
        if (this._data != null)
            data = build.createString(this._data);
        game.Package.startPackage(build);
        game.Package.addCmd(build, this._cmd);
        if (this._data != null)
            game.Package.addData(build, data);
        var pack = game.Package.endPackage(build);
        build.finish(pack);
        return build;
    };
    return Message;
}());
exports.Message = Message;

cc._RF.pop();