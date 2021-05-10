
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/utils/EventManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1dGlsc1xcRXZlbnRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0VBRUU7QUFDRDtJQUlDO1FBQ0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVNLHlCQUFFLEdBQVQsVUFBVSxHQUFVLEVBQUUsTUFBZ0IsRUFBRSxNQUFXO1FBQ2xELElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUM7WUFDL0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUM1QzthQUFJO1lBQ0osSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUM3QjtJQUNGLENBQUM7SUFFTSwwQkFBRyxHQUFWLFVBQVcsR0FBVyxFQUFFLFFBQWEsRUFBRSxNQUFXO1FBQ2pELElBQUcsUUFBUSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsUUFBUSxZQUFZLFFBQVEsQ0FBQyxFQUFDO1lBQzFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDbEIsUUFBUSxHQUFHLElBQUksQ0FBQztTQUNuQjtRQUNWLElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUM7WUFDL0IsSUFBRyxRQUFRLElBQUksSUFBSSxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUM7Z0JBQ3JDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1QjtpQkFBSTtnQkFDSixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxLQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3pDLElBQUcsUUFBUSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxFQUFDO3dCQUNyQyxJQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksUUFBUSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFDOzRCQUMzRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDbkI7cUJBQ0Q7eUJBQUssSUFBRyxRQUFRLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksUUFBUSxFQUFDO3dCQUN4RCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDbkI7eUJBQUssSUFBRyxNQUFNLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFDO3dCQUNwRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDbkI7aUJBQ0Q7YUFDRDtTQUNEO0lBQ0YsQ0FBQztJQUVNLDJCQUFJLEdBQVgsVUFBWSxHQUFXO1FBQUUsZ0JBQWdCO2FBQWhCLFVBQWdCLEVBQWhCLHFCQUFnQixFQUFoQixJQUFnQjtZQUFoQiwrQkFBZ0I7O1FBQ3hDLElBQUksTUFBTSxHQUFXLEtBQUssQ0FBQztRQUMzQixJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFDO1lBQy9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNwQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUM7b0JBQ3JCLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7d0JBQ3RDLE1BQU0sR0FBRyxJQUFJLENBQUE7aUJBQ2Q7cUJBQ0c7b0JBQ0gsSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO3dCQUNoQyxNQUFNLEdBQUcsSUFBSSxDQUFBO2lCQUNkO2FBQ0Q7U0FDRDtRQUNELE9BQU8sTUFBTSxDQUFBO0lBQ2QsQ0FBQztJQUVGLG1CQUFDO0FBQUQsQ0FoRUEsQUFnRUMsSUFBQTtBQUVVLFFBQUEsS0FBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogbmFtZSBcbiovXG5cdGNsYXNzIEV2ZW50TWFuYWdlciB7XG5cblx0XHRwcml2YXRlIF9ldmVudExpc3Q6IHtba2V5OnN0cmluZ106QXJyYXk8e2xpc3RlbjpGdW5jdGlvbiwgdGFyZ2V0OiBhbnl9Pn07XG5cblx0XHRwdWJsaWMgY29uc3RydWN0b3IoKSB7XG5cdFx0XHR0aGlzLl9ldmVudExpc3QgPSB7fTtcblx0XHR9XG5cblx0XHRwdWJsaWMgb24oa2V5OnN0cmluZywgbGlzdGVuOiBGdW5jdGlvbiwgdGFyZ2V0Pzphbnkpe1xuXHRcdFx0aWYodGhpcy5fZXZlbnRMaXN0W2tleV0gIT0gbnVsbCl7XG5cdFx0XHRcdGxldCBhcnJheSA9IHRoaXMuX2V2ZW50TGlzdFtrZXldO1xuXHRcdFx0XHRhcnJheS5wdXNoKHtsaXN0ZW46IGxpc3RlbiwgdGFyZ2V0OnRhcmdldH0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGxldCBhcnJheSA9IG5ldyBBcnJheTxhbnk+KCk7XG5cdFx0XHRcdGFycmF5LnB1c2goe2xpc3RlbjpsaXN0ZW4sIHRhcmdldDp0YXJnZXR9KTtcblx0XHRcdFx0dGhpcy5fZXZlbnRMaXN0W2tleV0gPSBhcnJheTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRwdWJsaWMgb2ZmKGtleTogc3RyaW5nLCBsaXN0ZW5lcj86YW55LCB0YXJnZXQ/OmFueSl7XG5cdFx0XHRpZihsaXN0ZW5lciAhPSBudWxsICYmICEobGlzdGVuZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikpe1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IGxpc3RlbmVyO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblx0XHRcdGlmKHRoaXMuX2V2ZW50TGlzdFtrZXldICE9IG51bGwpe1xuXHRcdFx0XHRpZihsaXN0ZW5lciA9PSBudWxsICYmIHRhcmdldCA9PSBudWxsKXtcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5fZXZlbnRMaXN0W2tleV07XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGxldCBhcnJheSA9IHRoaXMuX2V2ZW50TGlzdFtrZXldO1xuXHRcdFx0XHRcdGZvcihsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKXtcblx0XHRcdFx0XHRcdGlmKGxpc3RlbmVyICE9IG51bGwgJiYgdGFyZ2V0ICE9IG51bGwpe1xuXHRcdFx0XHRcdFx0XHRpZihhcnJheVtpXS5saXN0ZW4gPT0gbGlzdGVuZXIgJiYgYXJyYXlbaV0udGFyZ2V0ID09IHRhcmdldCl7XG5cdFx0XHRcdFx0XHRcdFx0YXJyYXkuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9ZWxzZSBpZihsaXN0ZW5lciAhPSBudWxsICYmIGFycmF5W2ldLmxpc3RlbiA9PSBsaXN0ZW5lcil7XG5cdFx0XHRcdFx0XHRcdGFycmF5LnNwbGljZShpLCAxKTtcblx0XHRcdFx0XHRcdH1lbHNlIGlmKHRhcmdldCAhPSBudWxsICYmIGFycmF5W2ldLnRhcmdldCA9PSB0YXJnZXQpe1xuXHRcdFx0XHRcdFx0XHRhcnJheS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cHVibGljIGVtaXQodGFnOiBzdHJpbmcsIC4uLnBhcmFtczogYW55W10pe1xuXHRcdFx0bGV0IHNlbmRPazpib29sZWFuID0gZmFsc2U7XG5cdFx0XHRpZih0aGlzLl9ldmVudExpc3RbdGFnXSAhPSBudWxsKXtcblx0XHRcdFx0bGV0IGFycmF5ID0gdGhpcy5fZXZlbnRMaXN0W3RhZ107XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiZW1pdCBtZXNzYWdlOiBcIiAsdGFnLCBhcnJheS5sZW5ndGgpO1xuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdGxldCBvYmogPSBhcnJheVtpXTtcblx0XHRcdFx0XHRpZihvYmoudGFyZ2V0ICE9IG51bGwpe1xuXHRcdFx0XHRcdFx0aWYob2JqLmxpc3Rlbi5hcHBseShvYmoudGFyZ2V0LCBwYXJhbXMpKVxuXHRcdFx0XHRcdFx0XHRzZW5kT2sgPSB0cnVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRpZihvYmoubGlzdGVuLmFwcGx5KHRoaXMsIHBhcmFtcykpXG5cdFx0XHRcdFx0XHRcdHNlbmRPayA9IHRydWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBzZW5kT2sgXG5cdFx0fVxuXG5cdH1cblxuXHRleHBvcnQgdmFyIGV2ZW50ID0gbmV3IEV2ZW50TWFuYWdlcigpOyJdfQ==