
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/misc/DataCenter.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2946dm7U5hPgIxciZRaL5Q+', 'DataCenter');
// framework/plugin_boosts/misc/DataCenter.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.field = exports.dc = void 0;
var EventManager_1 = require("../utils/EventManager");
var all_class_properties = {};
var all_registed_class = {};
function dc(name, serializable) {
    if (serializable === void 0) { serializable = true; }
    return function (target) {
        // target.endRegister(name);
        var proto = target['prototype'].constructor;
        // let cls = all_class_properties[proto]
        all_registed_class[target] = { name: name, serializable: serializable };
    };
}
exports.dc = dc;
function field(obj) {
    return function (target, propertyName) {
        if (obj && obj.default)
            target[propertyName] = obj.default;
        // target.register(propertyName,target[propertyName])
        var constructor = target.constructor;
        var cls = all_class_properties[constructor];
        if (cls == null) {
            cls = [];
            all_class_properties[constructor] = cls;
        }
        cls.push(propertyName);
    };
}
exports.field = field;
var DataCenter = /** @class */ (function () {
    function DataCenter() {
        this.__namespace = "DataCenter";
        this.kvs = {};
        this.kts = {};
        this.kvs = {};
        this.kts = {};
    }
    DataCenter.prototype.registerFields = function (namespace) {
        console.log(this);
        var target = this["__proto__"].constructor;
        var cls = all_class_properties[target];
        var cfg = all_registed_class[target];
        // let proto:any = target['prototype'];
        for (var i in cls) {
            var k = cls[i];
            if (typeof (k) == "function")
                continue;
            this.register(k, this[k]);
            delete this[k]; //删除默认属性 ,否则设置 setter getter 会失效
        }
        namespace = namespace || cfg.name;
        this.endRegister(namespace, cfg.serializable);
    };
    DataCenter.prototype.register = function (k, defaultValue) {
        var proto = this.constructor["prototype"];
        var self = this;
        proto.__defineGetter__(k, function () {
            return self.getData(k);
        });
        proto.__defineSetter__(k, function (s) {
            self.setData(k, s);
        });
        this.kvs[k] = defaultValue;
        var type = typeof (defaultValue);
        this.kts[k] = type;
        console.log("[DataCenter] register :" + k + ":" + defaultValue + "(" + type + ")");
    };
    DataCenter.prototype.setData = function (k, nv) {
        var v = this.kvs[k];
        if (v == nv)
            return;
        var type = this.kts[k];
        var kk = this._field_(k);
        if (type != typeof (nv)) {
            console.warn("[DataCenter] wrong type <" + typeof (nv) + "> for :" + kk + "<" + type + "> ,converting...");
            if (type == "number")
                nv = Number(nv);
            else if (type == "boolean") {
                nv = (nv == "true") ? true : false;
            }
        }
        this.kvs[k] = nv;
        console.log("[DataCenter] onValueChanged", kk, nv);
        EventManager_1.event.emit(kk, nv, v);
    };
    DataCenter.prototype._field_ = function (k) {
        return this.__namespace + "." + k;
    };
    DataCenter.prototype.getData = function (k) {
        return this.kvs[k];
    };
    DataCenter.prototype.limit = function (v, min, max) {
        if (v > max) {
            return max;
        }
        else if (v < min) {
            return 0;
        }
        else {
            return v;
        }
    };
    DataCenter.prototype.addData = function (k, c) {
        c = Number(c);
        if (c == null)
            return;
        var v = this.kvs[k];
        var nv = Number(v) + c;
        this.kvs[k] = nv;
        EventManager_1.event.emit(this._field_(k), nv, v);
    };
    DataCenter.prototype.load = function () {
        for (var k in this.kvs) {
            var fromstroage = localStorage.getItem(this._field_(k));
            var v = fromstroage;
            if (fromstroage) {
                var type = this.kts[k];
                if (type == "number") {
                    v = Number(fromstroage);
                }
                else if (type == "boolean") {
                    v = fromstroage == "true" ? true : false;
                }
            }
            else {
                v = this.getData(k);
            }
            this.kvs[k] = v;
        }
    };
    DataCenter.prototype.save = function () {
        console.log("[DataCenter] save :==================================");
        for (var k in this.kvs) {
            var v = this.kvs[k];
            var kk = this._field_(k);
            localStorage.setItem(kk, v.toString());
            console.log(cc.js.formatStr("%s:%s", kk, v));
        }
        console.log("[DataCenter] save succ :==================================");
        // localStorage.setItem("#1_coin",this.getData("coin"));
    };
    DataCenter.prototype.endRegister = function (s, serializable) {
        if (serializable === void 0) { serializable = true; }
        this.__namespace = s;
        DataCenter.alldata[s] = this;
        if (serializable) {
            this.load();
            this.save();
        }
    };
    DataCenter.off = function (k, callback, target) {
        EventManager_1.event.off(k, callback, target);
    };
    DataCenter.on = function (k, callback, target) {
        EventManager_1.event.on(k, callback, target);
        this.set(k, this.get(k));
    };
    DataCenter.get = function (k) {
        var strs = k.split(".");
        var namespace = strs[0];
        var name = strs[1];
        var target = DataCenter.alldata[namespace];
        if (target)
            return target[name];
        else
            return null;
    };
    DataCenter.set = function (k, v) {
        var strs = k.split(".");
        var namespace = strs[0];
        var name = strs[1];
        var target = DataCenter.alldata[namespace];
        if (target) {
            target[name] = v;
        }
    };
    DataCenter.register = function (cls) {
        var v = new cls();
        v.registerFields();
        return v;
    };
    DataCenter.alldata = {};
    return DataCenter;
}());
exports.default = DataCenter;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxtaXNjXFxEYXRhQ2VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQThDO0FBRzlDLElBQU0sb0JBQW9CLEdBQUcsRUFBRSxDQUFBO0FBRS9CLElBQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFBO0FBQzdCLFNBQWdCLEVBQUUsQ0FBQyxJQUFJLEVBQUMsWUFBbUI7SUFBbkIsNkJBQUEsRUFBQSxtQkFBbUI7SUFFdkMsT0FBTyxVQUFVLE1BQVU7UUFFdkIsNEJBQTRCO1FBQzVCLElBQUksS0FBSyxHQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDaEQsd0NBQXdDO1FBQ3hDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUMsSUFBSSxNQUFBLEVBQUMsWUFBWSxjQUFBLEVBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUE7QUFDTCxDQUFDO0FBVEQsZ0JBU0M7QUFDRCxTQUFnQixLQUFLLENBQUMsR0FBbUI7SUFDckMsT0FBTyxVQUFVLE1BQVcsRUFBRSxZQUFvQjtRQUM5QyxJQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTztZQUNqQixNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUN2QyxxREFBcUQ7UUFDckQsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQTtRQUNwQyxJQUFJLEdBQUcsR0FBRyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUMzQyxJQUFHLEdBQUcsSUFBSSxJQUFJLEVBQ2Q7WUFDSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1lBQ1Isb0JBQW9CLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQzNDO1FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUE7QUFDTCxDQUFDO0FBZEQsc0JB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TSxjQUFHLEdBQVYsVUFBVyxDQUFDO1FBRVIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDMUMsSUFBRyxNQUFNO1lBQ0wsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7O1lBRW5CLE9BQU8sSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxjQUFHLEdBQVYsVUFBVyxDQUFDLEVBQUMsQ0FBQztRQUVWLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzFDLElBQUcsTUFBTSxFQUNUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFTSxtQkFBUSxHQUFmLFVBQWdCLEdBQUc7UUFFZixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUNsQixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUExTE0sa0JBQU8sR0FBRyxFQUFFLENBQUE7SUEyTHZCLGlCQUFDO0NBOUxELEFBOExDLElBQUE7a0JBOUxvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXZlbnQgfSBmcm9tIFwiLi4vdXRpbHMvRXZlbnRNYW5hZ2VyXCI7XG5cblxuY29uc3QgYWxsX2NsYXNzX3Byb3BlcnRpZXMgPSB7fVxuXG5jb25zdCBhbGxfcmVnaXN0ZWRfY2xhc3MgPSB7fVxuZXhwb3J0IGZ1bmN0aW9uIGRjKG5hbWUsc2VyaWFsaXphYmxlID0gdHJ1ZSk6RnVuY3Rpb25cbntcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldDphbnkpXG4gICAge1xuICAgICAgICAvLyB0YXJnZXQuZW5kUmVnaXN0ZXIobmFtZSk7XG4gICAgICAgIGxldCBwcm90bzphbnkgPSB0YXJnZXRbJ3Byb3RvdHlwZSddLmNvbnN0cnVjdG9yO1xuICAgICAgICAvLyBsZXQgY2xzID0gYWxsX2NsYXNzX3Byb3BlcnRpZXNbcHJvdG9dXG4gICAgICAgIGFsbF9yZWdpc3RlZF9jbGFzc1t0YXJnZXRdID0ge25hbWUsc2VyaWFsaXphYmxlfTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZmllbGQob2JqPzp7ZGVmYXVsdD86YW55fSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmKG9iaiAmJiBvYmouZGVmYXVsdClcbiAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eU5hbWVdID0gb2JqLmRlZmF1bHQ7XG4gICAgICAgIC8vIHRhcmdldC5yZWdpc3Rlcihwcm9wZXJ0eU5hbWUsdGFyZ2V0W3Byb3BlcnR5TmFtZV0pXG4gICAgICAgIGxldCBjb25zdHJ1Y3RvciA9IHRhcmdldC5jb25zdHJ1Y3RvclxuICAgICAgICBsZXQgY2xzID0gYWxsX2NsYXNzX3Byb3BlcnRpZXNbY29uc3RydWN0b3JdXG4gICAgICAgIGlmKGNscyA9PSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBjbHMgPSBbXVxuICAgICAgICAgICAgYWxsX2NsYXNzX3Byb3BlcnRpZXNbY29uc3RydWN0b3JdID0gY2xzO1xuICAgICAgICB9XG4gICAgICAgIGNscy5wdXNoKHByb3BlcnR5TmFtZSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFDZW50ZXJcbntcbiAgICBwcml2YXRlIF9fbmFtZXNwYWNlOnN0cmluZyA9IFwiRGF0YUNlbnRlclwiXG4gICAgc3RhdGljIGFsbGRhdGEgPSB7fVxuICAgIHByaXZhdGUga3ZzID0ge31cbiAgICBwcml2YXRlIGt0cyA9IHt9XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5rdnMgPSB7fVxuICAgICAgICB0aGlzLmt0cyA9IHt9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlckZpZWxkcyhuYW1lc3BhY2U/KVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzW1wiX19wcm90b19fXCJdLmNvbnN0cnVjdG9yIFxuICAgICAgICBsZXQgY2xzID0gYWxsX2NsYXNzX3Byb3BlcnRpZXNbdGFyZ2V0XVxuICAgICAgICBsZXQgY2ZnID0gYWxsX3JlZ2lzdGVkX2NsYXNzW3RhcmdldF1cbiAgICAgICAgLy8gbGV0IHByb3RvOmFueSA9IHRhcmdldFsncHJvdG90eXBlJ107XG4gICAgICAgIGZvcih2YXIgaSBpbiBjbHMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBrID0gY2xzW2ldO1xuICAgICAgICAgICAgaWYodHlwZW9mKGspID09IFwiZnVuY3Rpb25cIikgY29udGludWU7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyKGssdGhpc1trXSlcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzW2tdOyAvL+WIoOmZpOm7mOiupOWxnuaApyAs5ZCm5YiZ6K6+572uIHNldHRlciBnZXR0ZXIg5Lya5aSx5pWIXG4gICAgICAgIH1cbiAgICAgICAgbmFtZXNwYWNlID0gbmFtZXNwYWNlIHx8ICBjZmcubmFtZTtcbiAgICAgICAgdGhpcy5lbmRSZWdpc3RlcihuYW1lc3BhY2UsY2ZnLnNlcmlhbGl6YWJsZSlcbiAgICB9XG5cbiAgICByZWdpc3RlcihrLGRlZmF1bHRWYWx1ZSlcbiAgICB7XG4gICAgICAgIGxldCBwcm90bzphbnkgPSB0aGlzLmNvbnN0cnVjdG9yW1wicHJvdG90eXBlXCJdXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgcHJvdG8uX19kZWZpbmVHZXR0ZXJfXyhrLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5nZXREYXRhKGspO1xuICAgICAgICB9KVxuICAgICAgICBwcm90by5fX2RlZmluZVNldHRlcl9fKGssZnVuY3Rpb24ocyl7XG4gICAgICAgICAgICBzZWxmLnNldERhdGEoayxzKVxuICAgICAgICB9KSBcbiAgICAgICAgXG4gICAgICAgIHRoaXMua3ZzW2tdID0gZGVmYXVsdFZhbHVlO1xuICAgICAgICBsZXQgdHlwZSA9IHR5cGVvZihkZWZhdWx0VmFsdWUpO1xuICAgICAgICB0aGlzLmt0c1trXSA9ICB0eXBlO1xuICAgICAgICBjb25zb2xlLmxvZyhcIltEYXRhQ2VudGVyXSByZWdpc3RlciA6XCIgKyBrICsgXCI6XCIgKyBkZWZhdWx0VmFsdWUgK1wiKFwiK3R5cGUrXCIpXCIpXG4gICAgfVxuIFxuICAgIHNldERhdGEoayxudilcbiAgICB7XG4gICAgICAgIGxldCB2ID0gdGhpcy5rdnNba11cbiAgICAgICAgaWYodiA9PSBudiApIHJldHVybjtcbiAgICAgICAgbGV0IHR5cGUgPSB0aGlzLmt0c1trXVxuICAgICAgICBsZXQga2sgPXRoaXMuX2ZpZWxkXyhrKVxuICAgICAgICBpZih0eXBlICE9IHR5cGVvZihudikpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIltEYXRhQ2VudGVyXSB3cm9uZyB0eXBlIDxcIit0eXBlb2YobnYpK1wiPiBmb3IgOlwiICsga2sgK1wiPFwiK3R5cGUrXCI+ICxjb252ZXJ0aW5nLi4uXCIpXG4gICAgICAgICAgICBpZih0eXBlID09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICAgICAgbnYgPSBOdW1iZXIobnYpXG4gICAgICAgICAgICBlbHNlIGlmKHR5cGUgPT0gXCJib29sZWFuXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbnYgPSAobnYgPT0gXCJ0cnVlXCIpID8gdHJ1ZSA6ZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmt2c1trXSA9IG52O1xuICAgICAgICBjb25zb2xlLmxvZyhcIltEYXRhQ2VudGVyXSBvblZhbHVlQ2hhbmdlZFwiICwga2ssbnYpO1xuICAgICAgICBldmVudC5lbWl0KGtrLG52LHYpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmllbGRfKGspXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fX25hbWVzcGFjZSArXCIuXCIgKyBrXG4gICAgfVxuXG4gICAgZ2V0RGF0YShrKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua3ZzW2tdO1xuICAgIH1cblxuICAgIGxpbWl0KHYsbWluLG1heClcbiAgICB7XG4gICAgICAgIGlmKHYgPiBtYXgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBtYXg7XG4gICAgICAgIH1lbHNlIGlmKHYgPCBtaW4pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkRGF0YShrLGMpXG4gICAge1xuICAgICAgICBjID0gTnVtYmVyKGMpXG4gICAgICAgIGlmKGMgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICBsZXQgdiA9IHRoaXMua3ZzW2tdXG4gICAgICAgIGxldCBudiA9ICBOdW1iZXIodikgKyBjXG4gICAgICAgIHRoaXMua3ZzW2tdID0gbnZcbiAgICAgICAgZXZlbnQuZW1pdCh0aGlzLl9maWVsZF8oayksbnYsdilcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWQoKVxuICAgIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiB0aGlzLmt2cylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGZyb21zdHJvYWdlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fZmllbGRfKGspKVxuICAgICAgICAgICAgbGV0IHY6YW55ID0gZnJvbXN0cm9hZ2VcbiAgICAgICAgICAgIGlmKGZyb21zdHJvYWdlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gdGhpcy5rdHNba11cbiAgICAgICAgICAgICAgICBpZih0eXBlID09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB2ID0gTnVtYmVyKGZyb21zdHJvYWdlKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0eXBlID09IFwiYm9vbGVhblwiKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdiA9IGZyb21zdHJvYWdlID09IFwidHJ1ZVwiP3RydWU6ZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuZ2V0RGF0YShrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMua3ZzW2tdID0gdjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmUoKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbRGF0YUNlbnRlcl0gc2F2ZSA6PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKVxuICAgICAgICBmb3IgKHZhciBrIGluIHRoaXMua3ZzKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdiA9IHRoaXMua3ZzW2tdXG4gICAgICAgICAgICBsZXQga2sgPSB0aGlzLl9maWVsZF8oaylcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtrLHYudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjYy5qcy5mb3JtYXRTdHIoXCIlczolc1wiICxrayx2KSlcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIltEYXRhQ2VudGVyXSBzYXZlIHN1Y2MgOj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIilcbiAgICAgICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCIjMV9jb2luXCIsdGhpcy5nZXREYXRhKFwiY29pblwiKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbmRSZWdpc3RlcihzICxzZXJpYWxpemFibGUgPSB0cnVlKVxuICAgIHtcbiAgICAgICAgdGhpcy5fX25hbWVzcGFjZSA9IHM7XG4gICAgICAgIERhdGFDZW50ZXIuYWxsZGF0YVtzXSA9IHRoaXM7XG4gICAgICAgIGlmKHNlcmlhbGl6YWJsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2FkKClcbiAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIG9mZihrLGNhbGxiYWNrLHRhcmdldD8pXG4gICAge1xuICAgICAgICBldmVudC5vZmYoayxjYWxsYmFjayx0YXJnZXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBvbihrLGNhbGxiYWNrLHRhcmdldD8pXG4gICAge1xuICAgICAgIGV2ZW50Lm9uKGsgLGNhbGxiYWNrLHRhcmdldClcbiAgICAgICB0aGlzLnNldChrLHRoaXMuZ2V0KGspKSBcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0KGspXG4gICAge1xuICAgICAgICBsZXQgc3RycyA9IGsuc3BsaXQoXCIuXCIpXG4gICAgICAgIGxldCBuYW1lc3BhY2UgPSBzdHJzWzBdO1xuICAgICAgICBsZXQgbmFtZSA9IHN0cnNbMV07XG4gICAgICAgIGxldCB0YXJnZXQgPSBEYXRhQ2VudGVyLmFsbGRhdGFbbmFtZXNwYWNlXVxuICAgICAgICBpZih0YXJnZXQpXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0W25hbWVdXG4gICAgICAgIGVsc2UgXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0KGssdilcbiAgICB7XG4gICAgICAgIGxldCBzdHJzID0gay5zcGxpdChcIi5cIilcbiAgICAgICAgbGV0IG5hbWVzcGFjZSA9IHN0cnNbMF07XG4gICAgICAgIGxldCBuYW1lID0gc3Ryc1sxXTtcbiAgICAgICAgbGV0IHRhcmdldCA9IERhdGFDZW50ZXIuYWxsZGF0YVtuYW1lc3BhY2VdXG4gICAgICAgIGlmKHRhcmdldClcbiAgICAgICAge1xuICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gdjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyByZWdpc3RlcihjbHMpXG4gICAge1xuICAgICAgICBsZXQgdiA9IG5ldyBjbHMoKTtcbiAgICAgICAgdi5yZWdpc3RlckZpZWxkcygpXG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbn0iXX0=