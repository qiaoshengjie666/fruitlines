"use strict";
cc._RF.push(module, 'bc48cBqkERHuJx+iKzOzwOV', 'MessageBoxManager');
// framework/plugin_boosts/ui/MessageBoxManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBox = void 0;
var ViewManager_1 = require("./ViewManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MessageBoxManager = /** @class */ (function (_super) {
    __extends(MessageBoxManager, _super);
    function MessageBoxManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        return _this;
    }
    MessageBoxManager_1 = MessageBoxManager;
    MessageBoxManager.prototype.onLoad = function () {
        MessageBoxManager_1.instance = this;
    };
    var MessageBoxManager_1;
    MessageBoxManager.instance = null;
    __decorate([
        property(cc.Prefab)
    ], MessageBoxManager.prototype, "prefab", void 0);
    MessageBoxManager = MessageBoxManager_1 = __decorate([
        ccclass
    ], MessageBoxManager);
    return MessageBoxManager;
}(cc.Component));
exports.default = MessageBoxManager;
var MessageBox = /** @class */ (function () {
    function MessageBox() {
    }
    MessageBox.prototype.start = function () {
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    // static UIPath:string = "plugin_boosts/ui/MessageBox"
    MessageBox.show = function (content, title, buttons, extra) {
        title = (title == null || title == undefined) ? "提示" : title;
        return new Promise(function (resolve, reject) {
            ViewManager_1.default.instance.showFromPrefab(MessageBoxManager.instance.prefab, "MessageBox", {
                title: title,
                content: content,
                buttons: buttons,
                extra: extra,
                callback: function (code) {
                    resolve(code);
                }
            });
        });
    };
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    MessageBox.OK = 1;
    MessageBox.CANCEL = 0;
    MessageBox.OK_CANCEL = 2;
    return MessageBox;
}());
exports.MessageBox = MessageBox;

cc._RF.pop();