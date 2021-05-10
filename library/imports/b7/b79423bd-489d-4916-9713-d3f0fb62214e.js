"use strict";
cc._RF.push(module, 'b7942O9SJ1JFpcT0/D7YiFO', 'LevelSelector');
// framework/plugin_boosts/ui/game/LevelSelector.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, help = _a.help;
var LevelSelector = /** @class */ (function (_super) {
    __extends(LevelSelector, _super);
    function LevelSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pageview = null;
        _this.template = null;
        _this.onSelectLevel = new cc.Component.EventHandler();
        _this.onRefreshItem = new cc.Component.EventHandler();
        _this.index = 0;
        _this.max = 9;
        _this.itemCountPerPage = 0;
        _this.pages = [];
        _this.currentLevel = 1;
        _this.autoScrollToCurrentLevel = true;
        return _this;
        // update (dt) {}
    }
    LevelSelector.prototype.selectLevel = function (event, msg) {
        if (this.onSelectLevel)
            this.onSelectLevel.emit([event.target, Number(event.target.name)]);
        else
            console.warn("LevelSelector: onSelectLevel callback is nil");
    };
    LevelSelector.prototype.onLoad = function () {
        this.pages.splice(0, this.pages.length);
        this.itemCountPerPage = this.template.childrenCount;
        var pageCount = Math.floor(this.max / this.itemCountPerPage);
        var mod = this.max % this.itemCountPerPage;
        if (mod > 0) {
            pageCount = pageCount + 1;
        }
        for (var i = 0; i < pageCount - 1; i++) {
            var page = cc.instantiate(this.template);
            this.pageview.addPage(page);
            this.pages.push(page);
        }
        this.pages.push(this.template);
        for (var pageIdx = 0; pageIdx < pageCount; pageIdx++) {
            var page = this.pages[pageIdx];
            for (var itemIdx = 0; itemIdx < page.childrenCount; itemIdx++) {
                var item = page.children[itemIdx];
                var label = item.getChildByName("label");
                var level = pageIdx * this.itemCountPerPage + Number(itemIdx) + 1;
                if (level > this.max) {
                    item.active = false;
                }
                item.name = level + "";
                label.getComponent(cc.Label).string = item.name;
            }
        }
    };
    LevelSelector.prototype.refreshItem = function (item, level) {
        var lv = this.currentLevel;
        if (level > lv) {
            item.opacity = 100;
            item.getComponent(cc.Button).enabled = false;
        }
        else {
            item.opacity = 255;
            item.getComponent(cc.Button).enabled = true;
        }
    };
    LevelSelector.prototype.refresh = function () {
        console.log("LevelSelctor: refresh");
        for (var i = 0; i < this.pages.length; i++) {
            var page = this.pages[i];
            for (var itemIdx = 0; itemIdx < page.childrenCount; itemIdx++) {
                var item = page.children[itemIdx];
                var level = i * this.itemCountPerPage + Number(itemIdx) + 1;
                this.refreshItem(item, level);
                this.onRefreshItem.emit([item, level]);
            }
        }
        if (this.autoScrollToCurrentLevel)
            this.scrollToCurrentLevel();
    };
    LevelSelector.prototype.start = function () {
    };
    LevelSelector.prototype.scrollToCurrentLevel = function () {
        var lv = this.currentLevel;
        var curPage = Math.floor(lv / this.itemCountPerPage);
        var mod = lv % this.itemCountPerPage;
        if (mod == 0) {
            curPage = curPage - 1;
        }
        this.pageview.scrollToPage(curPage, 0.3);
    };
    LevelSelector.prototype.nextPage = function () {
        this.pageview.scrollToPage(this.pageview.getCurrentPageIndex() + 1, 0.3);
    };
    LevelSelector.prototype.prevPage = function () {
        this.pageview.scrollToPage(this.pageview.getCurrentPageIndex() - 1, 0.3);
    };
    __decorate([
        property(cc.PageView)
    ], LevelSelector.prototype, "pageview", void 0);
    __decorate([
        property(cc.Node)
    ], LevelSelector.prototype, "template", void 0);
    __decorate([
        property(cc.Component.EventHandler)
    ], LevelSelector.prototype, "onSelectLevel", void 0);
    __decorate([
        property(cc.Component.EventHandler)
    ], LevelSelector.prototype, "onRefreshItem", void 0);
    __decorate([
        property
    ], LevelSelector.prototype, "index", void 0);
    __decorate([
        property
    ], LevelSelector.prototype, "max", void 0);
    LevelSelector = __decorate([
        ccclass
    ], LevelSelector);
    return LevelSelector;
}(cc.Component));
exports.default = LevelSelector;

cc._RF.pop();