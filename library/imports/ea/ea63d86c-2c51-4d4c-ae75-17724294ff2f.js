"use strict";
cc._RF.push(module, 'ea63dhsLFFNTK51F3JClP8v', 'InfiniteBackground');
// framework/plugin_boosts/gamesys/InfiniteBackground.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var InfiniteBackground = /** @class */ (function (_super) {
    __extends(InfiniteBackground, _super);
    function InfiniteBackground() {
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgNode = null;
        _this.camera = null;
        _this.currentNode = null;
        _this.repeatCount = 0;
        return _this;
    }
    InfiniteBackground.prototype.onLoad = function () {
        this.currentNode = this.bgNode;
        this.size = this.currentNode.getContentSize();
        this.nodepool = new cc.NodePool();
    };
    InfiniteBackground.prototype.start = function () {
        if (this.prev == null) {
            this.prev = cc.instantiate(this.bgNode);
            this.node.addChild(this.prev);
            this.prev.y = -this.size.height;
        }
    };
    InfiniteBackground.prototype.reset = function () {
        this.repeatCount = 0;
        //todo :remove all 
        //todo:init all
    };
    InfiniteBackground.prototype.update = function (dt) {
        if (this.currentNode == null)
            return;
        var pos = cc.Vec2.ZERO;
        this.camera.getWorldToCameraPoint(this.currentNode.position, pos);
        var prev = this.prev;
        if (pos.y < 10) {
            // check has next 
            if (this.next == null) {
                this.pre_prev = this.prev;
                this.prev = this.currentNode;
                var road = this.nodepool.get();
                if (road == null)
                    road = cc.instantiate(this.currentNode);
                road.setPosition(0, this.size.height * ++this.repeatCount);
                this.node.addChild(road);
                this.currentNode = road;
                this.camera.getWorldToCameraPoint(road.position, pos);
                this.next = null;
                // console.log("create new road")
            }
        }
        if (pos.y > this.size.height - 10) {
            //remove previous
            if (this.pre_prev) {
                this.nodepool.put(this.pre_prev);
                // console.log("InfiniteBackground : recycle background:" ,this.nodepool.size())
            }
        }
        //todo remove 
    };
    __decorate([
        property(cc.Node)
    ], InfiniteBackground.prototype, "bgNode", void 0);
    __decorate([
        property(cc.Camera)
    ], InfiniteBackground.prototype, "camera", void 0);
    InfiniteBackground = __decorate([
        ccclass
    ], InfiniteBackground);
    return InfiniteBackground;
}(cc.Component));
exports.default = InfiniteBackground;

cc._RF.pop();