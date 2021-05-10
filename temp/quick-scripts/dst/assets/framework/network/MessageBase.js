
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/network/MessageBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxuZXR3b3JrXFxNZXNzYWdlQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF1QztBQUN2QyxxQ0FBaUM7QUFDakMsbURBQStDO0FBQy9DO0lBT0M7UUFGQSxRQUFHLEdBQUksRUFBRSxDQUFBO1FBQ1QsVUFBSyxHQUFHLEVBQUUsQ0FBQTtRQUVULElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFDcEI7WUFDSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUN0QjtZQUNJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0I7SUFFRixDQUFDO0lBRU0sa0NBQVksR0FBbkIsVUFBb0IsR0FBVztRQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztJQUN2QixDQUFDO0lBRU0saUNBQVcsR0FBbEIsVUFBbUIsR0FBUSxFQUFFLElBQWM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVNLG9DQUFjLEdBQXJCLFVBQXNCLEdBQVE7UUFDN0IsSUFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBQztZQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNGLENBQUM7SUFF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YSxHQUFiO1FBRUksT0FBTyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUwsa0JBQUM7QUFBRCxDQTdHQSxBQTZHQyxJQUFBO0FBN0dZLGtDQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTb2NrZXRUYWd9IGZyb20gXCIuL01lc3NhZ2VUeXBlXCJcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSBcIi4vTWVzc2FnZVwiXG5pbXBvcnQgeyBjb25uTWFuYWdlciB9IGZyb20gXCIuL0Nvbm5lY3RNYW5hZ2VyXCI7XG5leHBvcnQgY2xhc3MgTWVzc2FnZUJhc2Uge1xuXG5cdHByaXZhdGUgX3NvY2tldEtleTogc3RyaW5nO1xuXHRwcml2YXRlIF9hbGxGdW5jczoge1tjbWQ6IG51bWJlcl06IEZ1bmN0aW9ufTtcblxuXHRDbWQgID0ge31cblx0RXJyb3IgPSB7fVxuXHRwdWJsaWMgY29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fYWxsRnVuY3MgPSB7fTtcblxuXHRcdGZvciAodmFyIGkgaW4gZ2FtZS5Db21tYW5kKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdiA9IGdhbWUuQ29tbWFuZFtpXVxuICAgICAgICAgICAgdGhpcy5DbWRbdl0gPSBpO1xuXHRcdH1cblx0XHRmb3IgKHZhciBpIGluIGdhbWUuRXJyb3JDb2RlKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdiA9IGdhbWUuRXJyb3JDb2RlW2ldXG4gICAgICAgICAgICB0aGlzLkVycm9yW3ZdID0gaTtcblx0XHR9XG5cdFx0XG5cdH1cblxuXHRwdWJsaWMgdXNlU29ja2V0S2V5KGtleTogc3RyaW5nKXtcblx0XHR0aGlzLl9zb2NrZXRLZXkgPSBrZXk7XG5cdH1cblxuXHRwdWJsaWMgYWRkTGlzdGVuZXIoY21kOiBhbnksIGZ1bmM6IEZ1bmN0aW9uKXtcblx0XHR0aGlzLl9hbGxGdW5jc1tjbWRdID0gZnVuYztcblx0fVxuXG5cdHB1YmxpYyByZW1vdmVMaXN0ZW5lcihjbWQ6IGFueSl7XG5cdFx0aWYodGhpcy5fYWxsRnVuY3NbY21kXSAhPSBudWxsKXtcblx0XHRcdHRoaXMuX2FsbEZ1bmNzW2NtZF0gPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBvbk1lc3NhZ2Uob2JqOiBhbnkpe1xuXHRcdGlmKG9iai50eXBlID09IFNvY2tldFRhZy5LU09DS0VUX01FU1NBR0Upe1xuXHRcdFx0bGV0IGludDhhID0gbmV3IFVpbnQ4QXJyYXkob2JqLm1zZyk7XG5cdFx0XHRsZXQgYnVmZmVyID0gbmV3IGZsYXRidWZmZXJzLkJ5dGVCdWZmZXIoaW50OGEpO1xuXHRcdFx0bGV0IG1zZzphbnkgPSBnYW1lLlBhY2thZ2UuZ2V0Um9vdEFzUGFja2FnZShidWZmZXIpO1xuXHRcdFx0aWYodGhpcy5fYWxsRnVuY3NbbXNnLmNtZCgpXSAhPSBudWxsKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2FsbEZ1bmNzW21zZy5jbWQoKV0uY2FsbCh0aGlzLCBtc2cpO1xuXHRcdFx0fWVsc2UgcmV0dXJuIHRoaXMub25IYW5kbGVyKG1zZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub25Tb2NrZXQob2JqLnR5cGUpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIOWkhOeQhnNvY2tldOa2iOaBr1xuXHQgKiBAcGFyYW0gdHlwZSBcblx0ICovXG5cdHB1YmxpYyBvblNvY2tldCh0eXBlOiBTb2NrZXRUYWcpe1xuXG5cdH1cblx0XG5cdC8qKlxuXHQgKiDph43lhpnmtojmga/lpITnkIblh73mlbBcblx0ICogcmV0dXJuIOa2iOaBr+WkhOeQhue7k+aenO+8jOWkhOeQhuWujOaIkOi/lOWbnuecn++8jOWQpuWImei/lOWbnuWBhyjmtojmga/kvJrlhaXmtojmga/pmJ/liJfvvIznrYnlvoXkuIvmrKHlpITnkIYpXG5cdCAqL1xuXHRwdWJsaWMgb25IYW5kbGVyKG1zZzogZ2FtZS5QYWNrYWdlKXtcblx0XHRcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgc2VuZE1lc3NhZ2UobXNnOiBNZXNzYWdlKXtcblx0XHRjb25uTWFuYWdlci5zZW5kTWVzc2FnZShtc2csIHRoaXMuX3NvY2tldEtleSk7XG5cdH1cblxuXHRwdWJsaWMgb25EZXN0b3J5KCl7XG5cdFx0dGhpcy5fYWxsRnVuY3MgPSBudWxsO1xuXHR9XG5cblx0c2VuZChjbWQsY21kc3RyPVwiXCIscHJvY2VkdXJlPW51bGwsYnVpbGQgPSBudWxsKVxuXHR7XG5cdFx0Y29uc29sZS5sb2coXCJTZW5kIE1lc3NhZ2UgOiBbXCIgKyB0aGlzLkNtZFtjbWRdICtcIl1cIilcbiAgICAgICAgbGV0IHNvY2tldCA9IGNvbm5NYW5hZ2VyLmdldERlZmF1bHQoKTtcblx0XHRsZXQgbXNnID0gbmV3IE1lc3NhZ2UoY21kKTtcblx0XHRsZXQgZHMgPSBnYW1lW2NtZHN0cl0gXG4gICAgICAgIGlmKGRzICE9IG51bGwpXG4gICAgICAgIHtcblx0XHRcdGlmKGJ1aWxkID09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdGJ1aWxkID0gdGhpcy5jcmVhdGVCdWlsZGVyKCk7XG5cdFx0XHR9XG4gICAgICAgICAgICBsZXQgc3RhcnRGdW5jID0gZHNbXCJzdGFydFwiICsgY21kc3RyXSBcblx0XHRcdGxldCBlbmRGdW5jID0gZHNbXCJlbmRcIiArIGNtZHN0cl0gXG5cdFx0XHRzdGFydEZ1bmMuY2FsbChkcywgYnVpbGQpO1xuICAgICAgICAgICAgaWYocHJvY2VkdXJlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHByb2NlZHVyZShidWlsZClcbiAgICAgICAgICAgICAgICAvL2dhbWVbY21kXS5hZGRUYXNrSWQoYnVpbGQsdGFza19pZCk7XG4gICAgICAgICAgICB9XG5cdFx0XHRidWlsZC5maW5pc2goZW5kRnVuYy5jYWxsKGRzLGJ1aWxkKSlcblx0XHRcdG1zZy5hZGRCdWlsZGVyKGJ1aWxkKTtcblx0XHR9ZWxzZXtcblx0XHRcdG1zZy5hZGRTdHJpbmcoY21kc3RyKTtcblx0XHR9XG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZShtc2cpO1xuICAgIH1cblxuICAgIGNyZWF0ZUJ1aWxkZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBmbGF0YnVmZmVycy5CdWlsZGVyKCk7XG4gICAgfVxuXHRcbn0iXX0=