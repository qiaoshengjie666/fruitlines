
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/gamesys/PsSpawner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '12e8aPL0IBPxYKO3t/sxN/O', 'PsSpawner');
// framework/plugin_boosts/gamesys/PsSpawner.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PsFx_1 = require("./PsFx");
var PoolManager_1 = require("./PoolManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PsSpawner = /** @class */ (function (_super) {
    __extends(PsSpawner, _super);
    function PsSpawner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PsSpawner.prototype.onLoad = function () {
        this.poolmgr = new PoolManager_1.default();
    };
    PsSpawner.prototype.start = function () {
    };
    PsSpawner.prototype.clear = function () {
        if (this.poolmgr)
            this.poolmgr.clear();
    };
    PsSpawner.prototype.getFx = function (prefabPath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var node = _this.poolmgr.get(prefabPath);
            if (node == null) {
                if (prefabPath instanceof cc.Prefab) {
                    node = cc.instantiate(prefabPath);
                    _this.poolmgr.tag(node, prefabPath);
                }
                else {
                    cc.loader.loadRes(prefabPath, cc.Prefab, function (e, prefab) {
                        node = cc.instantiate(prefab);
                        node.setParent(_this.node);
                        var psfx = node.getComponent(PsFx_1.default);
                        psfx.name = prefabPath;
                        resolve(psfx);
                    });
                    return;
                }
            }
            node.setParent(_this.node);
            node.active = false;
            var psfx = node.getComponent(PsFx_1.default);
            psfx.reset();
            resolve(psfx);
        });
    };
    PsSpawner.prototype.onFxFinshPlay = function (fx) {
        this.poolmgr.put(fx.node);
    };
    PsSpawner.prototype.play = function (prefabPath, pos, rotation, audio, spriteframe) {
        if (pos === void 0) { pos = cc.Vec2.ZERO; }
        if (rotation === void 0) { rotation = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var fx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFx(prefabPath)];
                    case 1:
                        fx = _a.sent();
                        fx.node.position = pos;
                        fx.node.rotation = rotation;
                        return [4 /*yield*/, fx.play(audio, spriteframe)];
                    case 2:
                        _a.sent();
                        this.onFxFinshPlay(fx);
                        return [2 /*return*/];
                }
            });
        });
    };
    PsSpawner.prototype.play2 = function (prefabPath, pos, rotation, scale) {
        if (pos === void 0) { pos = cc.Vec2.ZERO; }
        if (rotation === void 0) { rotation = 0; }
        if (scale === void 0) { scale = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var fx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFx(prefabPath)];
                    case 1:
                        fx = _a.sent();
                        fx.node.position = pos;
                        fx.node.scale = scale;
                        fx.node.rotation = rotation;
                        return [4 /*yield*/, fx.play()];
                    case 2:
                        _a.sent();
                        this.onFxFinshPlay(fx);
                        return [2 /*return*/];
                }
            });
        });
    };
    PsSpawner.prototype.play3 = function (prefabPath, pos) {
        return __awaiter(this, void 0, void 0, function () {
            var fx;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFx(prefabPath)];
                    case 1:
                        fx = _a.sent();
                        fx.node.position = pos;
                        fx.play().then(function (_) { return _this.onFxFinshPlay(fx); });
                        return [2 /*return*/, fx.node];
                }
            });
        });
    };
    PsSpawner = __decorate([
        ccclass
    ], PsSpawner);
    return PsSpawner;
}(cc.Component));
exports.default = PsSpawner;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxnYW1lc3lzXFxQc1NwYXduZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUEwQjtBQUMxQiw2Q0FBd0M7QUFFbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7O0lBbUZBLENBQUM7SUE5RUcsMEJBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxxQkFBVyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELHlCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQseUJBQUssR0FBTDtRQUVJLElBQUcsSUFBSSxDQUFDLE9BQU87WUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCx5QkFBSyxHQUFMLFVBQU0sVUFBVTtRQUFoQixpQkEyQkM7UUF6QkcsT0FBTyxJQUFJLE9BQU8sQ0FBTyxVQUFDLE9BQU8sRUFBQyxNQUFNO1lBQ3BDLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3ZDLElBQUcsSUFBSSxJQUFJLElBQUksRUFDZjtnQkFDSSxJQUFHLFVBQVUsWUFBWSxFQUFFLENBQUMsTUFBTSxFQUNsQztvQkFDSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDbEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFBO2lCQUNwQztxQkFBSTtvQkFDRCxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxVQUFDLENBQUMsRUFBQyxNQUFnQjt3QkFDdEQsSUFBSSxHQUFHLEVB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QUNsQjtJQS9FZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQW1GN0I7SUFBRCxnQkFBQztDQW5GRCxBQW1GQyxDQW5Gc0MsRUFBRSxDQUFDLFNBQVMsR0FtRmxEO2tCQW5Gb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQc0Z4IGZyb20gXCIuL1BzRnhcIjtcbmltcG9ydCBQb29sTWFuYWdlciBmcm9tIFwiLi9Qb29sTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBzU3Bhd25lciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgaW5zdGFuY2U6UHNTcGF3bmVyO1xuICAgIFxuICAgIHBvb2xtZ3I6UG9vbE1hbmFnZXI7XG4gICAgb25Mb2FkKClcbiAgICB7XG4gICAgICAgIHRoaXMucG9vbG1nciA9IG5ldyBQb29sTWFuYWdlcigpO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIGNsZWFyKClcbiAgICB7XG4gICAgICAgIGlmKHRoaXMucG9vbG1ncilcbiAgICAgICAgICAgIHRoaXMucG9vbG1nci5jbGVhcigpO1xuICAgIH1cblxuICAgIGdldEZ4KHByZWZhYlBhdGgpOlByb21pc2U8UHNGeD5cbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxQc0Z4PigocmVzb2x2ZSxyZWplY3QpPT57XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMucG9vbG1nci5nZXQocHJlZmFiUGF0aClcbiAgICAgICAgICAgIGlmKG5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihwcmVmYWJQYXRoIGluc3RhbmNlb2YgY2MuUHJlZmFiIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWJQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb29sbWdyLnRhZyhub2RlLHByZWZhYlBhdGgpXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHByZWZhYlBhdGgsY2MuUHJlZmFiLChlLHByZWZhYjpjYy5QcmVmYWIpID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLm5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBzZnggPSBub2RlLmdldENvbXBvbmVudChQc0Z4KVxuICAgICAgICAgICAgICAgICAgICAgICAgcHNmeC5uYW1lID0gcHJlZmFiUGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocHNmeCk7XG4gICAgICAgICAgICAgICAgICAgIH0pIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgcHNmeCA9IG5vZGUuZ2V0Q29tcG9uZW50KFBzRngpXG4gICAgICAgICAgICBwc2Z4LnJlc2V0KCk7XG4gICAgICAgICAgICByZXNvbHZlKHBzZngpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uRnhGaW5zaFBsYXkoZng6UHNGeClcbiAgICB7XG4gICAgICAgIHRoaXMucG9vbG1nci5wdXQoZngubm9kZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgcGxheShwcmVmYWJQYXRoLHBvcyA9IGNjLlZlYzIuWkVSTyxyb3RhdGlvbiA9IDAsYXVkaW8/LHNwcml0ZWZyYW1lPylcbiAgICB7XG4gICAgICAgIGxldCBmeCA9IGF3YWl0IHRoaXMuZ2V0RngocHJlZmFiUGF0aCk7XG4gICAgICAgIGZ4Lm5vZGUucG9zaXRpb24gPSBwb3M7XG4gICAgICAgIGZ4Lm5vZGUucm90YXRpb24gPSByb3RhdGlvbjtcbiAgICAgICAgYXdhaXQgZngucGxheShhdWRpbyxzcHJpdGVmcmFtZSlcbiAgICAgICAgdGhpcy5vbkZ4Rmluc2hQbGF5KGZ4KTtcbiAgICB9XG5cbiAgICBhc3luYyBwbGF5MihwcmVmYWJQYXRoLHBvcyA9IGNjLlZlYzIuWkVSTyxyb3RhdGlvbiA9IDAsc2NhbGU9MClcbiAgICB7XG4gICAgICAgIGxldCBmeCA9IGF3YWl0IHRoaXMuZ2V0RngocHJlZmFiUGF0aCk7XG4gICAgICAgIGZ4Lm5vZGUucG9zaXRpb24gPSBwb3M7XG4gICAgICAgIGZ4Lm5vZGUuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgZngubm9kZS5yb3RhdGlvbiA9IHJvdGF0aW9uO1xuICAgICAgICBhd2FpdCBmeC5wbGF5KClcbiAgICAgICAgdGhpcy5vbkZ4Rmluc2hQbGF5KGZ4KTtcbiAgICB9XG5cbiAgICBhc3luYyBwbGF5MyhwcmVmYWJQYXRoLHBvcylcbiAgICB7XG4gICAgICAgIGxldCBmeCA9IGF3YWl0IHRoaXMuZ2V0RngocHJlZmFiUGF0aCk7XG4gICAgICAgIGZ4Lm5vZGUucG9zaXRpb24gPSBwb3M7XG4gICAgICAgIGZ4LnBsYXkoKS50aGVuKF89PnRoaXMub25GeEZpbnNoUGxheShmeCkpO1xuICAgICAgICByZXR1cm4gZngubm9kZTtcbiAgICB9XG5cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=