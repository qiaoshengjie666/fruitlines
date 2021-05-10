"use strict";
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