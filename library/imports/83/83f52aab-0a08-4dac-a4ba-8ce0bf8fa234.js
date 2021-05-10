"use strict";
cc._RF.push(module, '83f52qrCghNrKS6jOC/j6I0', 'FSM');
// framework/plugin_boosts/gamesys/FSM.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var State = /** @class */ (function () {
    function State(id, name) {
        this.__interval_callbacks = [];
        this.interval_id = 0;
        this.id = id;
        this.name = name;
    }
    State.prototype.onEnter = function (params) { };
    State.prototype.onExit = function () { };
    State.prototype.onUpdate = function (dt) { };
    //messages 
    State.prototype.on = function () { };
    State.prototype.off = function () { };
    State.prototype.clearIntervals = function () {
        this.__interval_callbacks.splice(0, this.__interval_callbacks.length);
    };
    State.prototype.setInterval = function (interval, callback, target) {
        var id = ++this.interval_id;
        var timer = 0;
        this.__interval_callbacks.push({ id: id, callback: callback, target: target, interval: interval, timer: timer });
        return id;
    };
    State.prototype.clearInterval = function (id) {
        this.__interval_callbacks.splice(this.__interval_callbacks.indexOf(id));
    };
    State.prototype.setTimeout = function (delay, callback, target) {
        var id = ++this.interval_id;
        var timer = 0;
        this.__interval_callbacks.push({ id: id, callback: callback, target: target, delay: delay, timer: timer });
        return id;
    };
    State.prototype.clearTimeout = function (id) {
        this.clearInterval(id);
    };
    State.prototype.invokeIntervals = function (dt) {
        for (var i = 0; i < this.__interval_callbacks.length; i++) {
            var element = this.__interval_callbacks[i];
            element.timer = element.timer + dt;
            if (element.interval) {
                if (element.timer >= element.interval) {
                    element.timer = 0;
                    // call
                    element.callback.call(element.target);
                }
            }
            else if (element.delay) {
                if (element.timer >= element.delay) {
                    // call
                    element.callback.call(element.target);
                    this.__interval_callbacks.splice(i);
                    i--;
                }
            }
        }
    };
    return State;
}());
exports.State = State;
var CustomState = /** @class */ (function (_super) {
    __extends(CustomState, _super);
    function CustomState(target, id, name, pattern) {
        var _this = _super.call(this, id, name) || this;
        var enterName = cc.js.formatStr(pattern, "onEnter", _this.name);
        var updateName = cc.js.formatStr(pattern, "onUpdate", _this.name);
        var exitName = cc.js.formatStr(pattern, "onExit", _this.name);
        _this.__target = target;
        _this.__enterFunc = _this.__target[enterName];
        _this.__updateFunc = _this.__target[updateName];
        _this.__exitFunc = _this.__target[exitName];
        return _this;
    }
    CustomState.prototype.onEnter = function (params) {
        this.clearIntervals();
        if (this.__enterFunc) {
            this.__enterFunc.call(this.__target, this, params);
        }
    };
    CustomState.prototype.onExit = function () {
        if (this.__exitFunc) {
            this.__exitFunc.call(this.__target, this);
        }
    };
    CustomState.prototype.onUpdate = function (dt) {
        this.invokeIntervals(dt);
        if (this.__updateFunc) {
            this.__updateFunc.call(this.__target, this, dt);
        }
    };
    return CustomState;
}(State));
var FSM = /** @class */ (function (_super) {
    __extends(FSM, _super);
    function FSM() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeElapsed = 0;
        _this._states = {};
        _this._isPaused = false;
        _this.log = false;
        return _this;
    }
    Object.defineProperty(FSM.prototype, "target", {
        get: function () {
            return this._target;
        },
        enumerable: false,
        configurable: true
    });
    FSM.prototype.init = function (target) {
        this._target = target;
        this.timeElapsed = 0;
    };
    FSM.prototype.getState = function (stateId) {
        return this._states[stateId];
    };
    FSM.prototype.getCurrentState = function () {
        return this.c;
    };
    FSM.prototype.getPreviousState = function () {
        return this.p;
    };
    FSM.prototype.addStates = function (states, callbackNamePattern) {
        if (callbackNamePattern === void 0) { callbackNamePattern = "%s_%sState"; }
        var keys = Object.keys(states);
        var enumLen = (keys.length / 2);
        this.namePattern = callbackNamePattern;
        for (var i = 0; i < enumLen; i++) {
            var key = keys[i];
            var value = states[key];
            this.addState(key, value);
        }
    };
    FSM.prototype.addState = function (id, name, enterCallback, exitCallback, updateCallback, target) {
        if (this.log)
            console.log("[FSM]" + this.target.__classname__ + "(" + this.target.name + ")" + " Add State :", id, name);
        var state = new CustomState(this.target, id, name, this.namePattern);
        this._states[id] = state;
        if (enterCallback)
            state.__enterFunc = enterCallback;
        if (exitCallback)
            state.__exitFunc = exitCallback;
        if (updateCallback)
            state.__updateFunc = updateCallback;
        if (target)
            state.__target = target;
    };
    /**
     * first state
     * @param: state index or State
     */
    FSM.prototype.enterState = function (stateId, params) {
        this.timeElapsed = 0;
        var state = this._states[stateId];
        this.c = state;
        state.onEnter(params);
        if (this.log)
            console.log("[FSM]" + this.target.__classname__ + " First State:", state.name);
    };
    FSM.prototype.revertState = function () {
        this.changeState(this.p.id);
    };
    FSM.prototype.pause = function () {
        this._isPaused = true;
    };
    FSM.prototype.resume = function () {
        this._isPaused = false;
    };
    FSM.prototype.resetCurrentState = function () {
        this.timeElapsed = 0;
        console.log(cc.js.formatStr("[FSM] %s reset currentState", this.target.__classname__));
        this.c.onExit();
        this.c.onEnter();
    };
    FSM.prototype.changeState = function (stateId, params) {
        var state = this._states[stateId];
        if (state == null) {
            console.warn("[FSM] invalid state for stateId " + stateId + " of : " + this.target.__classname__);
            return;
        }
        if (this._isPaused) {
            console.warn("[FSM] fsm is paused ! " + this.target.__classname__ + " changeState to <" + state.name + "> failed!");
            return;
        }
        if (stateId == this.c.id)
            return;
        this.timeElapsed = 0;
        this.c.onExit();
        this.p = this.c;
        this.c = state;
        if (this.log)
            console.log(cc.js.formatStr("[FSM] %s (%s): %s -> %s", this.target.__classname__, this.name, this.p.name, state.name));
        this.c.onEnter(params);
    };
    FSM.prototype.isInState = function (stateId) {
        return this.c == this._states[stateId];
    };
    FSM.prototype.update = function (dt) {
        if (this._isPaused)
            return;
        if (FSM.debug)
            dt = 0.016; // use real deta
        this.timeElapsed += dt;
        if (this.c)
            this.c.onUpdate(dt);
    };
    FSM.debug = false;
    return FSM;
}(cc.Component));
exports.default = FSM;

cc._RF.pop();