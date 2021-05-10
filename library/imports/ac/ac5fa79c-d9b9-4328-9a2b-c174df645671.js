"use strict";
cc._RF.push(module, 'ac5faec2blDKJorwXTfZFZx', 'ConnectManager');
// framework/network/ConnectManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.connManager = void 0;
var Socket_1 = require("./Socket");
var ConnectManager = /** @class */ (function () {
    function ConnectManager() {
        this._allConns = null;
        this._allConns = {};
    }
    ConnectManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ConnectManager();
        }
        return this._instance;
    };
    ConnectManager.prototype.create = function (name, conf) {
        if (this._allConns[name] == null) {
            var socket = new Socket_1.Socket(conf);
            this._allConns[name] = socket;
            if (this._defaultKey == null)
                this._defaultKey = name;
        }
    };
    ConnectManager.prototype.setDefaultKey = function (key) {
        if (key != null && this._allConns[key]) {
            this._defaultKey = key;
        }
    };
    ConnectManager.prototype.getDefault = function () {
        return this.getConn(this._defaultKey);
    };
    ConnectManager.prototype.getConn = function (name) {
        if (name == null)
            return null;
        if (this._allConns[name] != null) {
            return this._allConns[name];
        }
        return null;
    };
    ConnectManager.prototype.sendMessage = function (msg, name) {
        if (name == null)
            name = this._defaultKey;
        var conn = this.getConn(name);
        if (conn != null) {
            conn.sendMessage(msg);
        }
    };
    ConnectManager.prototype.enableHeartbeat = function (name) {
        var conn = this.getConn(name);
        conn.enableHeartbeat(true);
    };
    ConnectManager.prototype.sendCustomMessage = function (msg) {
        var conn = this.getConn(this._defaultKey);
        if (conn != null)
            conn.sendCustomMessage(msg);
    };
    ConnectManager.prototype.remove = function (name) {
        var conn = this.getConn(name);
        if (conn != null) {
            delete this._allConns[name];
            conn.close();
        }
    };
    ConnectManager._instance = null;
    return ConnectManager;
}());
exports.connManager = ConnectManager.getInstance();

cc._RF.pop();