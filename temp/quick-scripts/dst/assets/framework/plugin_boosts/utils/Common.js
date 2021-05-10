
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/utils/Common.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1dGlsc1xcQ29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBd0Q7QUFFeEQ7SUFBQTtJQWtGQSxDQUFDO0lBaEZVLGVBQVEsR0FBZixVQUFnQixJQUFJO1FBRWhCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUMsTUFBTTtZQUM5QixFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBQyxVQUFDLFNBQVMsRUFBQyxJQUFJO2dCQUNoRCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sWUFBSyxHQUFaLFVBQWEsT0FBTztRQUVoQixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFDLE1BQU07WUFDOUIsVUFBVSxDQUFDO2dCQUNQLE9BQU8sRUFBRSxDQUFBO1lBQ2IsQ0FBQyxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFTSxvQkFBYSxHQUFwQixVQUFxQixNQUFNLEVBQUUsR0FBTztRQUFQLG9CQUFBLEVBQUEsT0FBTztRQUVoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDakMsSUFBRyxJQUFJLEdBQUcsUUFBUSxHQUFHLEdBQUcsRUFBRSxnQkFBZ0I7U0FDMUM7WUFDSSxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVNLGlCQUFVLEdBQWpCLFVBQWtCLEVBQUUsRUFBQyxHQUFHO1FBRXBCLDBCQUFnQixDQUFDLFFBQVEsQ0FBQyxjQUFjLENB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Q0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQTtRQUNsRixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFFekIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuSCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUwsYUFBQztBQUFELENBbEZBLEFBa0ZDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3ByaXRlRnJhbWVDYWNoZSBmcm9tIFwiLi4vbWlzYy9TcHJpdGVGcmFtZUNhY2hlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1vblxue1xuICAgIHN0YXRpYyBsb2FkSnNvbihwYXRoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHBhdGggLGNjLkpzb25Bc3NldCwoZXJyb3Jjb2RlLGRhdGEpPT57XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhLmpzb24pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBzbGVlcCh0aW1lb3V0KVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgfSwgdGltZW91dCAqIDEwMDApXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cblxuICAgIHN0YXRpYyBpc0dyZWF0ZXJEYXlzKGJlZm9yZSwgbnVtID0gNylcbiAgICB7XG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgZGlmZiA9IG5vdy5nZXRUaW1lKCkgLSBiZWZvcmVcbiAgICAgICAgaWYoZGlmZiA+IDg2NDAwMDAwICogbnVtKSAvLyAyNCo2MCo2MCoxMDAwXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNldERpc3BsYXkoc3AsdXJsKVxuICAgIHtcbiAgICAgICAgU3ByaXRlRnJhbWVDYWNoZS5pbnN0YW5jZS5nZXRTcHJpdGVGcmFtZSh1cmwpLnRoZW4oc2Y9PntzcC5zcHJpdGVGcmFtZSA9IHNmfSlcbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZW5lcmF0ZV9hY3Rpb24ocGFyYW1zKXtcbiAgICAgICAgbGV0IHNjYWxlX2FjdGlvbiA9IGNjLnNjYWxlVG8ocGFyYW1zLnRpbWUsIHBhcmFtcy5zY2FsZV94LCBwYXJhbXMuc2NhbGVfeSlcbiAgICAgICAgcmV0dXJuIHNjYWxlX2FjdGlvblxuICAgIH1cblxuICAgIC8v5by55oCn5pWI5p6cIOaenOWGu+aViOaenCBcbiAgICBzdGF0aWMgIGplbGx5SnVtcChub2RlKVxuICAgIHtcbiAgICAgICAgbGV0ICBzcGF3bl9hY3Rpb24xID0gdGhpcy5nZW5lcmF0ZV9hY3Rpb24oe3RpbWUgOiAwLjA2LCBzY2FsZV94IDogMC43LCBzY2FsZV95IDogMC43LCBzY2FsZV96OiAxfSlcbiAgICAgICAgLy8gbGV0ICBzcGF3bl9hY3Rpb24yID0gdGhpcy5nZW5lcmF0ZV9hY3Rpb24oe3RpbWUgOiAwLjEyLCBzY2FsZV94IDogMS4zLCBzY2FsZV95ICA6MS4zLCBzY2FsZV96IDoxfSlcbiAgICAgICAgbGV0ICBzcGF3bl9hY3Rpb24zID0gdGhpcy5nZW5lcmF0ZV9hY3Rpb24oe3RpbWUgOiAwLjA3LCBzY2FsZV94IDogMSwgc2NhbGVfeSAgOjEuNCwgc2NhbGVfeiA6MX0pXG4gICAgICAgIC8vIGxldCAgc3Bhd25fYWN0aW9uNCA9IHRoaXMuZ2VuZXJhdGVfYWN0aW9uKHt0aW1lIDogMC4wNywgc2NhbGVfeCA6IDEuMywgc2NhbGVfeSAgOjEuMywgc2NhbGVfejogMX0pXG4gICAgICAgIC8vIGxldCAgc3Bhd25fYWN0aW9uNSA9IHRoaXMuZ2VuZXJhdGVfYWN0aW9uKHt0aW1lIDogMC4wNywgc2NhbGVfeCA6IDEuMiwgc2NhbGVfeSA6IDEuMiwgc2NhbGVfeiA6IDF9KVxuICAgICAgICBsZXQgc3Bhd25fYWN0aW9uNSA9IGNjLnNjYWxlVG8oMC44LCAxLjMpLmVhc2luZyhjYy5lYXNlRWxhc3RpY091dCgwLjMpKTtcbiAgICAgICAgbGV0ICBzZXFfYWN0aW9ucyA9IGNjLnNlcXVlbmNlKHNwYXduX2FjdGlvbjEsXG4gICAgICAgICAgICAvLyAgc3Bhd25fYWN0aW9uMixcbiAgICAgICAgICAgICAgICBzcGF3bl9hY3Rpb24zLFxuICAgICAgICAgICAgICAgIC8vIHNwYXduX2FjdGlvbjQsXG4gICAgICAgICAgICAgICAgc3Bhd25fYWN0aW9uNSlcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oc2VxX2FjdGlvbnMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBqZWxseUp1bXAyKG5vZGUsZnJvbSxzY2FsZSlcbiAgICB7XG4gICAgICAgIG5vZGUuc2NhbGUgPSBmcm9tO1xuICAgICAgICBsZXQgYWN0ID0gY2Muc2NhbGVUbygwLjgsIHNjYWxlLHNjYWxlKS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNPdXQoMC4zKSk7XG4gICAgICAgIG5vZGUucnVuQWN0aW9uKGFjdClcbiAgICB9XG5cbiAgICBzdGF0aWMgbW92ZUJlemllcihwcmVmYWIsZnJvbSx0byxjYWxsYmFjayA9IG51bGwsZHVyID0gMSxkZWxheSA9IDApe1xuICAgICAgICBsZXQgc3ByaXRlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKVxuICAgICAgICBzcHJpdGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgc3ByaXRlLnNldFBvc2l0aW9uKGZyb20pXG5cbiAgICAgICAgbGV0IGJlemllciA9IFtdXG4gICAgICAgIGxldCB4ID0gZnJvbS54LCB5ID0gZnJvbS55XG4gICAgICAgIGxldCBleCA9IHRvLngsIGV5ID0gdG8ueTtcbiAgICAgICAgYmV6aWVyWzBdID0gY2MudjIoeCwgeSlcbiAgICAgICAgYmV6aWVyWzFdID0gY2MudjIoeCArIE1hdGguYWJzKGV4IC0geCsgMTAwKSAqIDAuNSwgeSArIE1hdGguYWJzKGV5IC0geSsxMDApICogMC41KVxuICAgICAgICBiZXppZXJbMl0gPSBjYy52MihleCwgZXkpXG5cbiAgICAgICAgc3ByaXRlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoZGVsYXkpLGNjLmJlemllclRvKGR1ciwgYmV6aWVyKSAsIGNjLmZhZGVPdXQoMC4zKSxjYy5jYWxsRnVuYyhjYWxsYmFjaykpKVxuICAgICAgICByZXR1cm4gc3ByaXRlO1xuICAgIH1cblxufSJdfQ==