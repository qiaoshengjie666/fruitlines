
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/gamesys/InfiniteBackground.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxnYW1lc3lzXFxJbmZpbml0ZUJhY2tncm91bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGlGQUFpRjtBQUNqRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDJGQUEyRjtBQUMzRixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDJGQUEyRjtBQUMzRixtR0FBbUc7O0FBRTdGLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWdELHNDQUFZO0lBQTVEO1FBRUksd0JBQXdCO1FBQ3hCLGVBQWU7UUFIbkIscUVBOEVDO1FBeEVHLFlBQU0sR0FBVyxJQUFJLENBQUM7UUFHdEIsWUFBTSxHQUFZLElBQUksQ0FBQztRQUt2QixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixpQkFBVyxHQUFHLENBQUMsQ0FBQzs7SUErRHBCLENBQUM7SUExREcsbUNBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsa0NBQUssR0FBTDtRQUNJLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQ3BCO1lBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUksQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCxrQ0FBSyxHQUFMO1FBRUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsbUJBQW1CO1FBQ25CLGVBQWU7SUFDbkIsQ0FBQztJQUVELG1DQUFNLEdBQU4sVUFBUSxFQUFFO1FBRU4sSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUk7WUFBQyxPQUFNO1FBQ2xDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUMsR0FBRyxDQUFDLENBQUE7UUFDaEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUNkO1lBQ0ksa0JBQWtCO1lBQ2xCLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQ3BCO2dCQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUM3QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFBO2dCQUM5QixJQUFHLElBQUksSUFBSSxJQUFJO29CQUNYLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNwRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDakIsaUNBQWlDO2FBQ3BDO1NBQ0o7UUFDRCxJQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUNoQztZQUNJLGlCQUFpQjtZQUNqQixJQUFHLElBQUksQ0FBQyxRQUFRLEVBQ2hCO2dCQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakMsZ0ZBQWdGO2FBQ25GO1NBQ0o7UUFDRCxjQUFjO0lBQ2xCLENBQUM7SUF2RUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDSTtJQUd0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NEQUNHO0lBVE4sa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0E4RXRDO0lBQUQseUJBQUM7Q0E5RUQsQUE4RUMsQ0E5RStDLEVBQUUsQ0FBQyxTQUFTLEdBOEUzRDtrQkE5RW9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5maW5pdGVCYWNrZ3JvdW5kIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIC8vIG9uTG9hZCAoKSB7fVxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYmdOb2RlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkNhbWVyYSlcbiAgICBjYW1lcmE6Y2MuQ2FtZXJhPSBudWxsO1xuXG4gICAgbmV4dDpjYy5Ob2RlO1xuICAgIHByZXY6Y2MuTm9kZTtcbiAgICBwcmVfcHJldiA6Y2MuTm9kZTtcbiAgICBjdXJyZW50Tm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICByZXBlYXRDb3VudCA9IDA7XG5cbiAgICBzaXplIDogY2MuU2l6ZTtcblxuICAgIG5vZGVwb29sOmNjLk5vZGVQb29sO1xuICAgIG9uTG9hZCgpXG4gICAge1xuICAgICAgICB0aGlzLmN1cnJlbnROb2RlID0gdGhpcy5iZ05vZGU7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuY3VycmVudE5vZGUuZ2V0Q29udGVudFNpemUoKTtcbiAgICAgICAgdGhpcy5ub2RlcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgaWYodGhpcy5wcmV2ID09IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucHJldiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmdOb2RlKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0aGlzLnByZXYpO1xuICAgICAgICAgICAgdGhpcy5wcmV2LnkgPSAgLSB0aGlzLnNpemUuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5yZXBlYXRDb3VudCA9IDA7XG4gICAgICAgIC8vdG9kbyA6cmVtb3ZlIGFsbCBcbiAgICAgICAgLy90b2RvOmluaXQgYWxsXG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZSAoZHQpIHtcblxuICAgICAgICBpZih0aGlzLmN1cnJlbnROb2RlID09IG51bGwpcmV0dXJuXG4gICAgICAgIGxldCBwb3MgPSBjYy5WZWMyLlpFUk87XG4gICAgICAgIHRoaXMuY2FtZXJhLmdldFdvcmxkVG9DYW1lcmFQb2ludCh0aGlzLmN1cnJlbnROb2RlLnBvc2l0aW9uLHBvcylcbiAgICAgICAgbGV0IHByZXYgPSB0aGlzLnByZXY7XG4gICAgICAgIGlmIChwb3MueSA8IDEwKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBjaGVjayBoYXMgbmV4dCBcbiAgICAgICAgICAgIGlmKHRoaXMubmV4dCA9PSBudWxsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlX3ByZXYgPSB0aGlzLnByZXY7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ID0gdGhpcy5jdXJyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICBsZXQgcm9hZCA9IHRoaXMubm9kZXBvb2wuZ2V0KClcbiAgICAgICAgICAgICAgICBpZihyb2FkID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJvYWQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmN1cnJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICByb2FkLnNldFBvc2l0aW9uKDAsdGhpcy5zaXplLmhlaWdodCAqICsrdGhpcy5yZXBlYXRDb3VudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHJvYWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE5vZGUgPSByb2FkO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FtZXJhLmdldFdvcmxkVG9DYW1lcmFQb2ludChyb2FkLnBvc2l0aW9uLHBvcylcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY3JlYXRlIG5ldyByb2FkXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYocG9zLnkgPiB0aGlzLnNpemUuaGVpZ2h0IC0gMTApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vcmVtb3ZlIHByZXZpb3VzXG4gICAgICAgICAgICBpZih0aGlzLnByZV9wcmV2KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZXBvb2wucHV0KHRoaXMucHJlX3ByZXYpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSW5maW5pdGVCYWNrZ3JvdW5kIDogcmVjeWNsZSBiYWNrZ3JvdW5kOlwiICx0aGlzLm5vZGVwb29sLnNpemUoKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL3RvZG8gcmVtb3ZlIFxuICAgIH1cbn1cbiJdfQ==