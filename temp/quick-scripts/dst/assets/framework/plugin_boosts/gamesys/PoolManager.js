
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/gamesys/PoolManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '69495bpMX5Av5pbrNxnGI8/', 'PoolManager');
// framework/plugin_boosts/gamesys/PoolManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PoolManager = /** @class */ (function () {
    function PoolManager(root, onCreateObject, target) {
        this.nodePool = {};
        this.nodes = {};
        this.managed = false;
        this.aliveObjects = [];
        this.onCreateObject = onCreateObject;
        this.target = target;
        this.root = root;
        if (root) {
            root.on(cc.Node.EventType.CHILD_REMOVED, this.onNodeRemove, this);
        }
    }
    PoolManager.prototype.onNodeRemove = function (node) {
        this.put(node);
    };
    PoolManager.prototype.objects = function () {
        return this.aliveObjects;
    };
    PoolManager.prototype.clearAlives = function () {
        for (var i = 0; i < this.aliveObjects.length;) {
            var obj = this.aliveObjects[i];
            obj.removeFromParent();
        }
    };
    PoolManager.prototype.getPool = function (type) {
        if (typeof (type) != "string" || typeof (type) != "number") {
            type = type._uuid || type.name;
        }
        var pool = this.nodePool[type];
        if (pool == null) {
            pool = new cc.NodePool();
            this.nodePool[type] = pool;
        }
        return pool;
    };
    PoolManager.prototype.get = function (type) {
        var node = this.getPool(type).get();
        if (this.onCreateObject) {
            if (node == null) {
                node = this.onCreateObject.call(this.target, type);
                if (this.root)
                    node.setParent(this.root);
                if (!node)
                    console.warn(node, "onCreateObject must return an object");
                if (this.managed)
                    this.aliveObjects.push(node);
                this.nodes[node.uuid] = type;
                return node;
            }
        }
        if (this.root)
            node.setParent(this.root);
        if (this.managed)
            this.aliveObjects.push(node);
        return node;
    };
    PoolManager.prototype.tag = function (node, type) {
        this.nodes[node.uuid] = type;
    };
    PoolManager.prototype.put = function (node, type) {
        if (type === void 0) { type = null; }
        if (type == null)
            type = this.nodes[node.uuid];
        this.getPool(type).put(node);
        if (this.managed)
            this.aliveObjects.splice(this.aliveObjects.indexOf(node), 1);
    };
    PoolManager.prototype.clear = function (type) {
        if (this.managed)
            this.aliveObjects.splice(0, this.aliveObjects.length);
        if (type)
            this.getPool(type).clear();
        else {
            for (var t in this.nodePool) {
                var pool = this.nodePool[t];
                pool.clear();
            }
        }
    };
    PoolManager.prototype.size = function (type) {
        return this.getPool(type).size();
    };
    return PoolManager;
}());
exports.default = PoolManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxnYW1lc3lzXFxQb29sTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7SUFhSSxxQkFBWSxJQUFhLEVBQUMsY0FBZSxFQUFDLE1BQU87UUFYakQsYUFBUSxHQUFPLEVBQUUsQ0FBQTtRQUVqQixVQUFLLEdBQUcsRUFBRSxDQUFBO1FBTVYsWUFBTyxHQUFXLEtBQUssQ0FBQztRQUN4QixpQkFBWSxHQUFhLEVBQUUsQ0FBQTtRQUl2QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFHLElBQUksRUFDUDtZQUNJLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDcEU7SUFDTCxDQUFDO0lBRUQsa0NBQVksR0FBWixVQUFhLElBQUk7UUFFYixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCw2QkFBTyxHQUFQO1FBRUksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxpQ0FBVyxHQUFYO1FBRUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUMzQztZQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDOUIsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUE7U0FDekI7SUFDTCxDQUFDO0lBRUQsNkJBQU8sR0FBUCxVQUFRLElBQUk7UUFFUixJQUFHLE9BQU0sQ0FBQyxJQUFJLENBQUMs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LElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQjtTQUNKO0lBQ0wsQ0FBQztJQUVELDBCQUFJLEdBQUosVUFBSyxJQUFJO1FBRUwsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFDTCxrQkFBQztBQUFELENBckhBLEFBcUhDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvb2xNYW5hZ2VyXG57XG4gICAgbm9kZVBvb2w6YW55ID0ge31cbiAgICBcbiAgICBub2RlcyA9IHt9XG5cbiAgICBvbkNyZWF0ZU9iamVjdDpGdW5jdGlvbjtcbiAgICB0YXJnZXQ6YW55O1xuICAgIHJvb3Q6Y2MuTm9kZTtcblxuICAgIG1hbmFnZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIGFsaXZlT2JqZWN0czpjYy5Ob2RlW10gPSBbXVxuXG4gICAgY29uc3RydWN0b3Iocm9vdD86Y2MuTm9kZSxvbkNyZWF0ZU9iamVjdD8sdGFyZ2V0PylcbiAgICB7XG4gICAgICAgIHRoaXMub25DcmVhdGVPYmplY3QgPSBvbkNyZWF0ZU9iamVjdDtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgIGlmKHJvb3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJvb3Qub24oY2MuTm9kZS5FdmVudFR5cGUuQ0hJTERfUkVNT1ZFRCwgdGhpcy5vbk5vZGVSZW1vdmUsIHRoaXMpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk5vZGVSZW1vdmUobm9kZSlcbiAgICB7XG4gICAgICAgIHRoaXMucHV0KG5vZGUpO1xuICAgIH1cblxuICAgIG9iamVjdHMoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxpdmVPYmplY3RzO1xuICAgIH1cblxuICAgIGNsZWFyQWxpdmVzKClcbiAgICB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPCB0aGlzLmFsaXZlT2JqZWN0cy5sZW5ndGg7KVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgb2JqID0gdGhpcy5hbGl2ZU9iamVjdHNbaV1cbiAgICAgICAgICAgIG9iai5yZW1vdmVGcm9tUGFyZW50KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBvb2wodHlwZSk6Y2MuTm9kZVBvb2xcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZih0eXBlKSAhPSBcInN0cmluZ1wiIHx8IHR5cGVvZih0eXBlKSE9IFwibnVtYmVyXCIgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlID0gdHlwZS5fdXVpZCB8fCB0eXBlLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBvb2wgPSB0aGlzLm5vZGVQb29sW3R5cGVdO1xuICAgICAgICBpZihwb29sID09IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHBvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgICAgIHRoaXMubm9kZVBvb2xbdHlwZV0gPSBwb29sO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb29sO1xuICAgIH1cblxuICAgIGdldCh0eXBlKTpjYy5Ob2RlXG4gICAge1xuICAgICAgICBsZXQgbm9kZSA9ICB0aGlzLmdldFBvb2wodHlwZSkuZ2V0KCk7XG4gICAgICAgIGlmKHRoaXMub25DcmVhdGVPYmplY3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKG5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5vbkNyZWF0ZU9iamVjdC5jYWxsKHRoaXMudGFyZ2V0LHR5cGUpXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yb290KVxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLnJvb3QpO1xuICAgICAgICAgICAgICAgIGlmKCFub2RlIClcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKG5vZGUsXCJvbkNyZWF0ZU9iamVjdCBtdXN0IHJldHVybiBhbiBvYmplY3RcIilcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1hbmFnZWQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpdmVPYmplY3RzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2Rlc1tub2RlLnV1aWRdID0gdHlwZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnJvb3QpXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLnJvb3QpO1xuICAgICAgICBpZih0aGlzLm1hbmFnZWQpXG4gICAgICAgICAgICB0aGlzLmFsaXZlT2JqZWN0cy5wdXNoKG5vZGUpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICB0YWcobm9kZSx0eXBlKVxuICAgIHtcbiAgICAgICAgdGhpcy5ub2Rlc1tub2RlLnV1aWRdID0gdHlwZTtcbiAgICB9XG5cbiAgICBwdXQobm9kZTpjYy5Ob2RlLHR5cGUgPSBudWxsKVxuICAgIHtcbiAgICAgICAgaWYodHlwZSA9PSBudWxsKVxuICAgICAgICAgICAgdHlwZSA9IHRoaXMubm9kZXNbbm9kZS51dWlkXTtcbiAgICAgICAgdGhpcy5nZXRQb29sKHR5cGUpLnB1dChub2RlKTtcbiAgICAgICAgaWYodGhpcy5tYW5hZ2VkKVxuICAgICAgICAgICAgdGhpcy5hbGl2ZU9iamVjdHMuc3BsaWNlKHRoaXMuYWxpdmVPYmplY3RzLmluZGV4T2Yobm9kZSksMSk7XG4gICAgfVxuXG4gICAgY2xlYXIodHlwZT8pXG4gICAge1xuICAgICAgICBpZih0aGlzLm1hbmFnZWQpXG4gICAgICAgICAgICB0aGlzLmFsaXZlT2JqZWN0cy5zcGxpY2UoMCx0aGlzLmFsaXZlT2JqZWN0cy5sZW5ndGgpO1xuICAgICAgICBpZih0eXBlKVxuICAgICAgICAgICAgdGhpcy5nZXRQb29sKHR5cGUpLmNsZWFyKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yICh2YXIgdCBpbiB0aGlzLm5vZGVQb29sKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBwb29sID0gdGhpcy5ub2RlUG9vbFt0XVxuICAgICAgICAgICAgICAgIHBvb2wuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNpemUodHlwZSlcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBvb2wodHlwZSkuc2l6ZSgpO1xuICAgIH1cbn0iXX0=