"use strict";
cc._RF.push(module, 'd6d4aCOiTtJz6R1xuSQrtdC', 'Common');
// framework/plugin_boosts/utils/Common.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SpriteFrameCache_1 = require("../misc/SpriteFrameCache");
var Common = /** @class */ (function () {
    function Common() {
    }
    Common.loadJson = function (path) {
        return new Promise(function (resolve, reject) {
            cc.loader.loadRes(path, cc.JsonAsset, function (errorcode, data) {
                resolve(data.json);
            });
        });
    };
    Common.sleep = function (timeout) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, timeout * 1000);
        });
    };
    Common.isGreaterDays = function (before, num) {
        if (num === void 0) { num = 7; }
        var now = new Date();
        var diff = now.getTime() - before;
        if (diff > 86400000 * num) // 24*60*60*1000
         {
            return true;
        }
    };
    Common.setDisplay = function (sp, url) {
        SpriteFrameCache_1.default.instance.getSpriteFrame(url).then(function (sf) { sp.spriteFrame = sf; });
    };
    Common.generate_action = function (params) {
        var scale_action = cc.scaleTo(params.time, params.scale_x, params.scale_y);
        return scale_action;
    };
    //弹性效果 果冻效果 
    Common.jellyJump = function (node) {
        var spawn_action1 = this.generate_action({ time: 0.06, scale_x: 0.7, scale_y: 0.7, scale_z: 1 });
        // let  spawn_action2 = this.generate_action({time : 0.12, scale_x : 1.3, scale_y  :1.3, scale_z :1})
        var spawn_action3 = this.generate_action({ time: 0.07, scale_x: 1, scale_y: 1.4, scale_z: 1 });
        // let  spawn_action4 = this.generate_action({time : 0.07, scale_x : 1.3, scale_y  :1.3, scale_z: 1})
        // let  spawn_action5 = this.generate_action({time : 0.07, scale_x : 1.2, scale_y : 1.2, scale_z : 1})
        var spawn_action5 = cc.scaleTo(0.8, 1.3).easing(cc.easeElasticOut(0.3));
        var seq_actions = cc.sequence(spawn_action1, 
        //  spawn_action2,
        spawn_action3, 
        // spawn_action4,
        spawn_action5);
        node.runAction(seq_actions);
    };
    Common.jellyJump2 = function (node, from, scale) {
        node.scale = from;
        var act = cc.scaleTo(0.8, scale, scale).easing(cc.easeElasticOut(0.3));
        node.runAction(act);
    };
    Common.moveBezier = function (prefab, from, to, callback, dur, delay) {
        if (callback === void 0) { callback = null; }
        if (dur === void 0) { dur = 1; }
        if (delay === void 0) { delay = 0; }
        var sprite = cc.instantiate(prefab);
        sprite.opacity = 255;
        sprite.setPosition(from);
        var bezier = [];
        var x = from.x, y = from.y;
        var ex = to.x, ey = to.y;
        bezier[0] = cc.v2(x, y);
        bezier[1] = cc.v2(x + Math.abs(ex - x + 100) * 0.5, y + Math.abs(ey - y + 100) * 0.5);
        bezier[2] = cc.v2(ex, ey);
        sprite.runAction(cc.sequence(cc.delayTime(delay), cc.bezierTo(dur, bezier), cc.fadeOut(0.3), cc.callFunc(callback)));
        return sprite;
    };
    return Common;
}());
exports.default = Common;

cc._RF.pop();