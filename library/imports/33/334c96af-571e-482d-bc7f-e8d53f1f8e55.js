"use strict";
cc._RF.push(module, '334c9avVx5ILbx/6NU/H45V', 'EventManager');
// framework/plugin_boosts/utils/EventManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
/**
* name
*/
var EventManager = /** @class */ (function () {
    function EventManager() {
        this._eventList = {};
    }
    EventManager.prototype.on = function (key, listen, target) {
        if (this._eventList[key] != null) {
            var array = this._eventList[key];
            array.push({ listen: listen, target: target });
        }
        else {
            var array = new Array();
            array.push({ listen: listen, target: target });
            this._eventList[key] = array;
        }
    };
    EventManager.prototype.off = function (key, listener, target) {
        if (listener != null && !(listener instanceof Function)) {
            target = listener;
            listener = null;
        }
        if (this._eventList[key] != null) {
            if (listener == null && target == null) {
                delete this._eventList[key];
            }
            else {
                var array = this._eventList[key];
                for (var i = array.length - 1; i >= 0; i--) {
                    if (listener != null && target != null) {
                        if (array[i].listen == listener && array[i].target == target) {
                            array.splice(i, 1);
                        }
                    }
                    else if (listener != null && array[i].listen == listener) {
                        array.splice(i, 1);
                    }
                    else if (target != null && array[i].target == target) {
                        array.splice(i, 1);
                    }
                }
            }
        }
    };
    EventManager.prototype.emit = function (tag) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var sendOk = false;
        if (this._eventList[tag] != null) {
            var array = this._eventList[tag];
            console.log("emit message: ", tag, array.length);
            for (var i = 0; i < array.length; i++) {
                var obj = array[i];
                if (obj.target != null) {
                    if (obj.listen.apply(obj.target, params))
                        sendOk = true;
                }
                else {
                    if (obj.listen.apply(this, params))
                        sendOk = true;
                }
            }
        }
        return sendOk;
    };
    return EventManager;
}());
exports.event = new EventManager();

cc._RF.pop();