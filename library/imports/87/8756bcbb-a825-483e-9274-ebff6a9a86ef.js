"use strict";
cc._RF.push(module, '8756by7qCVIPpJ06/9qmobv', 'SpriteFrameCache');
// framework/plugin_boosts/misc/SpriteFrameCache.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SpriteFrameCache = /** @class */ (function () {
    function SpriteFrameCache() {
        this.frames = {};
    }
    Object.defineProperty(SpriteFrameCache, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new SpriteFrameCache();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    SpriteFrameCache.prototype.getSpriteFrame = function (url) {
        return __awaiter(this, void 0, Promise, function () {
            var frame;
            var _this = this;
            return __generator(this, function (_a) {
                frame = this.frames[url];
                if (frame == null) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            // console.log("[SpriteFrameCache] request image:" + url)
                            if (!url || url == "") {
                                reject("empty-url");
                                return;
                            }
                            if (url.indexOf("http") == -1) {
                                cc.loader.loadRes(url, cc.SpriteFrame, function (error, frame) {
                                    if (error) {
                                        reject();
                                        return;
                                    }
                                    if (frame) {
                                        _this.addSpriteFrame(url, frame);
                                        resolve(frame);
                                    }
                                    else {
                                        reject();
                                    }
                                });
                            }
                            else {
                                cc.loader.load({ url: url, type: 'png' }, function (error, texture) {
                                    if (error) {
                                        reject();
                                        return;
                                    }
                                    if (texture) {
                                        frame = new cc.SpriteFrame(texture);
                                        _this.addSpriteFrame(url, frame);
                                        resolve(frame);
                                    }
                                    else {
                                        reject();
                                    }
                                });
                            }
                        })];
                }
                return [2 /*return*/, new Promise(function (resolve, reject) { return resolve(frame); })];
            });
        });
    };
    SpriteFrameCache.prototype.addSpriteFrame = function (url, frame) {
        this.frames[url] = frame;
        return frame;
    };
    SpriteFrameCache.prototype.clear = function () {
        for (var k in this.frames) {
            var frame = this.frames[k];
            cc.loader.release(frame);
            delete this.frames[k];
        }
    };
    SpriteFrameCache.prototype.remove = function (k) {
        var frame = this.frames[k];
        cc.loader.release(frame);
        delete this.frames[k];
    };
    return SpriteFrameCache;
}());
exports.default = SpriteFrameCache;

cc._RF.pop();