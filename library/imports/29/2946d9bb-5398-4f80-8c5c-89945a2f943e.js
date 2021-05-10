"use strict";
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