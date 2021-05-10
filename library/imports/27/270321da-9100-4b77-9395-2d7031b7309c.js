"use strict";
cc._RF.push(module, '27032HakQBLd5OVLXAxtzCc', 'MessageDispatch');
// framework/network/MessageDispatch.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDispatch = void 0;
var MessageDispatch = /** @class */ (function () {
    function MessageDispatch() {
        this._handler = null;
        this._allMessageBases = {};
    }
    MessageDispatch.getInstance = function () {
        if (this._instace == null) {
            this._instace = new MessageDispatch();
        }
        return this._instace;
    };
    MessageDispatch.prototype.register = function (key, msgPro) {
        if (key == null)
            return null;
        if (msgPro == null)
            return null;
        var allBases = this._allMessageBases[key];
        if (allBases == null)
            this._allMessageBases[key] = [];
        this._allMessageBases[key].push(msgPro);
        return msgPro;
    };
    MessageDispatch.prototype.isNull = function (key) {
        var allBases = this._allMessageBases[key];
        if (allBases != null && allBases.length > 0)
            return true;
        return false;
    };
    MessageDispatch.prototype.registerUnique = function (key, msgPro) {
        if (key == null)
            return null;
        var allBases = this._allMessageBases[key];
        if (allBases != null && allBases.length > 0)
            return this._allMessageBases[key][0];
        else
            return this.register(key, msgPro);
    };
    MessageDispatch.prototype.getBean = function (key) {
        if (key == null)
            return null;
        var allBeans = this._allMessageBases[key];
        if (allBeans != null && allBeans.length > 0) {
            return allBeans[0];
        }
        return null;
    };
    MessageDispatch.prototype.unRegister = function (key) {
        var allBases = this._allMessageBases[key];
        if (allBases == null)
            return;
        for (var i = 0; i < allBases.length; i++)
            allBases[i].onDestory();
        this._allMessageBases[key] = null;
        delete this._allMessageBases[key];
    };
    MessageDispatch.prototype.onMessage = function (msg) {
        for (var key in this._allMessageBases) {
            if (this._allMessageBases[key] == null)
                continue;
            var allBases = this._allMessageBases[key];
            for (var i = 0; i < allBases.length; i++)
                if (allBases[i].onMessage(msg))
                    return true;
        }
        return false;
    };
    MessageDispatch._instace = null;
    return MessageDispatch;
}());
exports.MessageDispatch = MessageDispatch;

cc._RF.pop();