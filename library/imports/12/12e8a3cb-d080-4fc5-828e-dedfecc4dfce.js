"use strict";
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