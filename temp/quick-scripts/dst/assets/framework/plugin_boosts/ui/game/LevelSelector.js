
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/ui/game/LevelSelector.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1aVxcZ2FtZVxcTGV2ZWxTZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUEyQixFQUFFLENBQUMsVUFBVSxFQUF2QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBQyxJQUFJLFVBQWlCLENBQUM7QUFHL0M7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUFxSUM7UUFsSUcsY0FBUSxHQUFnQixJQUFJLENBQUE7UUFHNUIsY0FBUSxHQUFXLElBQUksQ0FBQztRQUd4QixtQkFBYSxHQUE2QixJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFHMUUsbUJBQWEsR0FBNkIsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRzFFLFdBQUssR0FBVyxDQUFDLENBQUM7UUFHbEIsU0FBRyxHQUFXLENBQUMsQ0FBQztRQUVoQixzQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFFN0IsV0FBSyxHQUFhLEVBQUUsQ0FBQztRQUVyQixrQkFBWSxHQUFVLENBQUMsQ0FBQztRQVV4Qiw4QkFBd0IsR0FBVyxJQUFJLENBQUM7O1FBa0d4QyxpQkFBaUI7SUFDckIsQ0FBQztJQTNHRyxtQ0FBVyxHQUFYLFVBQVksS0FBSyxFQUFDLEdBQUc7UUFFakIsSUFBRyxJQUFJLENBQUMsYUFBYTtZQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBOztZQUVqRSxPQUFPLENBQUMsSUFBSSxDQUFDLDhDQUE4QyxDQUFDLENBQUE7SUFDcEUsQ0FBQztJQUlELDhCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsSUFB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LEdBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBRUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0lBN0hEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7bURBQ007SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQzt3REFDc0M7SUFHMUU7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7d0RBQ3NDO0lBRzFFO1FBREMsUUFBUTtnREFDUztJQUdsQjtRQURDLFFBQVE7OENBQ087SUFsQkMsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXFJakM7SUFBRCxvQkFBQztDQXJJRCxBQXFJQyxDQXJJMEMsRUFBRSxDQUFDLFNBQVMsR0FxSXREO2tCQXJJb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5LGhlbHB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsU2VsZWN0b3IgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlBhZ2VWaWV3KVxuICAgIHBhZ2V2aWV3IDpjYy5QYWdlVmlldyA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRlbXBsYXRlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIpXG4gICAgb25TZWxlY3RMZXZlbDpjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgIEBwcm9wZXJ0eShjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKVxuICAgIG9uUmVmcmVzaEl0ZW06Y2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG5cbiAgICBAcHJvcGVydHlcbiAgICBpbmRleCA6bnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIG1heDogbnVtYmVyID0gOTtcblxuICAgIGl0ZW1Db3VudFBlclBhZ2U6IG51bWJlciA9IDA7XG5cbiAgICBwYWdlczpjYy5Ob2RlW10gPSBbXTtcblxuICAgIGN1cnJlbnRMZXZlbDpudW1iZXIgPSAxO1xuXG4gICAgc2VsZWN0TGV2ZWwoZXZlbnQsbXNnKVxuICAgIHtcbiAgICAgICAgaWYodGhpcy5vblNlbGVjdExldmVsKVxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdExldmVsLmVtaXQoW2V2ZW50LnRhcmdldCxOdW1iZXIoZXZlbnQudGFyZ2V0Lm5hbWUpXSlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiTGV2ZWxTZWxlY3Rvcjogb25TZWxlY3RMZXZlbCBjYWxsYmFjayBpcyBuaWxcIilcbiAgICB9XG5cbiAgICBhdXRvU2Nyb2xsVG9DdXJyZW50TGV2ZWw6Ym9vbGVhbiA9IHRydWU7XG5cbiAgICBvbkxvYWQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5wYWdlcy5zcGxpY2UoMCx0aGlzLnBhZ2VzLmxlbmd0aCk7XG4gICAgICAgIHRoaXMuaXRlbUNvdW50UGVyUGFnZSA9IHRoaXMudGVtcGxhdGUuY2hpbGRyZW5Db3VudDtcbiAgICAgICAgbGV0IHBhZ2VDb3VudCA9IE1hdGguZmxvb3IodGhpcy5tYXgvdGhpcy5pdGVtQ291bnRQZXJQYWdlKTtcbiAgICAgICAgbGV0IG1vZCA9IHRoaXMubWF4JXRoaXMuaXRlbUNvdW50UGVyUGFnZSBcbiAgICAgICAgaWYgKG1vZCA+IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHBhZ2VDb3VudCA9IHBhZ2VDb3VudCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDAgO2kgPCBwYWdlQ291bnQgLTEgO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHBhZ2UgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRlbXBsYXRlKVxuICAgICAgICAgICAgdGhpcy5wYWdldmlldy5hZGRQYWdlKHBhZ2UpOyBcbiAgICAgICAgICAgIHRoaXMucGFnZXMucHVzaChwYWdlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhZ2VzLnB1c2godGhpcy50ZW1wbGF0ZSk7XG4gICAgICAgIGZvciAodmFyIHBhZ2VJZHggPSAwIDtwYWdlSWR4IDwgcGFnZUNvdW50OyBwYWdlSWR4KysgKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgcGFnZSA9IHRoaXMucGFnZXNbcGFnZUlkeF07XG4gICAgICAgICAgICBmb3IgKHZhciBpdGVtSWR4ID0gMDsgaXRlbUlkeCA8IHBhZ2UuY2hpbGRyZW5Db3VudDtpdGVtSWR4ICsrIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHBhZ2UuY2hpbGRyZW5baXRlbUlkeF07XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpO1xuICAgICAgICAgICAgICAgIGxldCBsZXZlbCA9IHBhZ2VJZHggKiB0aGlzLml0ZW1Db3VudFBlclBhZ2UgKyBOdW1iZXIoaXRlbUlkeCkgKyAxIDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPiB0aGlzLm1heClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGxldmVsICtcIlwiO1xuICAgICAgICAgICAgICAgIGxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaXRlbS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHJlZnJlc2hJdGVtKGl0ZW0sbGV2ZWwpXG4gICAge1xuICAgICAgICBsZXQgbHYgPSB0aGlzLmN1cnJlbnRMZXZlbDtcbiAgICAgICAgaWYgKGxldmVsID4gbHYpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGl0ZW0ub3BhY2l0eSA9IDEwMDtcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGl0ZW0ub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoKClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGV2ZWxTZWxjdG9yOiByZWZyZXNoXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPCB0aGlzLnBhZ2VzLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBwYWdlID0gdGhpcy5wYWdlc1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIGl0ZW1JZHggPSAwOyBpdGVtSWR4IDwgcGFnZS5jaGlsZHJlbkNvdW50O2l0ZW1JZHggKysgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gcGFnZS5jaGlsZHJlbltpdGVtSWR4XTtcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWwgPSBpICogdGhpcy5pdGVtQ291bnRQZXJQYWdlICsgTnVtYmVyKGl0ZW1JZHgpICsgMSA7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoSXRlbShpdGVtLGxldmVsKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmVmcmVzaEl0ZW0uZW1pdChbaXRlbSxsZXZlbF0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5hdXRvU2Nyb2xsVG9DdXJyZW50TGV2ZWwpXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvQ3VycmVudExldmVsKClcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHNjcm9sbFRvQ3VycmVudExldmVsKClcbiAgICB7XG4gICAgICAgIGxldCBsdiA9IHRoaXMuY3VycmVudExldmVsO1xuICAgICAgICBsZXQgY3VyUGFnZSA9IE1hdGguZmxvb3IobHYvdGhpcy5pdGVtQ291bnRQZXJQYWdlKTtcbiAgICAgICAgbGV0IG1vZCA9IGx2JXRoaXMuaXRlbUNvdW50UGVyUGFnZSBcbiAgICAgICAgaWYgKG1vZCA9PSAgMClcbiAgICAgICAge1xuICAgICAgICAgICAgY3VyUGFnZSA9IGN1clBhZ2UgLSAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFnZXZpZXcuc2Nyb2xsVG9QYWdlKGN1clBhZ2UsMC4zKTtcbiAgICB9XG5cbiAgICBuZXh0UGFnZSgpXG4gICAge1xuICAgICAgICB0aGlzLnBhZ2V2aWV3LnNjcm9sbFRvUGFnZSh0aGlzLnBhZ2V2aWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKSsxLDAuMylcbiAgICB9XG5cbiAgICBwcmV2UGFnZSgpXG4gICAge1xuICAgICAgICB0aGlzLnBhZ2V2aWV3LnNjcm9sbFRvUGFnZSh0aGlzLnBhZ2V2aWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKS0xLDAuMylcbiAgICB9XG5cblxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==