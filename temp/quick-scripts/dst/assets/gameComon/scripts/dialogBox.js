
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/dialogBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b7b24I8RWhMxIogfhVLnP+c', 'dialogBox');
// gameComon/scripts/dialogBox.js

"use strict";

/**
 * 弹出对话框。为了避免逻辑相互影响，对话框消失即remove，不持续存在于scene。
 */
var DialogBox = cc.Class({
  "extends": cc.Component,
  properties: {
    titleLabel: cc.Label,
    contentLabel: cc.Label,
    confirmButton: cc.Button,
    cancelButton: cc.Button,
    okButton: cc.Button,
    confirmLabel: cc.Label,
    cancelLabel: cc.Label,
    okLabel: cc.Label,
    confirmCallback: null,
    cancelCallback: null
  },
  onLoad: function onLoad() {
    this.confirmButton.node.active = false;
    this.okButton.node.active = false;
    this.cancelButton.node.active = false;
    this.confirmButton.node.on(cc.Node.EventType.TOUCH_END, this.onConfirmBtnClicked, this);
    this.cancelButton.node.on(cc.Node.EventType.TOUCH_END, this.onCancelBtnClicked, this);
    this.okButton.node.on(cc.Node.EventType.TOUCH_END, this.onOkBtnClicked, this);
  },
  onConfirmBtnClicked: function onConfirmBtnClicked() {
    this.confirmCallback && this.confirmCallback();
    this.hide();
  },
  onCancelBtnClicked: function onCancelBtnClicked() {
    this.cancelCallback && this.cancelCallback();
    this.hide();
  },
  onOkBtnClicked: function onOkBtnClicked() {
    this.onConfirmBtnClicked();
    this.hide();
  },

  /**
   * @param opts
   * title(可选):标题
   * content:内容
   * confirmCB(可选):确定回调，和cancelCB必并存
   * cancelCB(可选):取消回调，和confirmCB必并存
   * okCB(可选):确定回调，和confirmCB及cancelCB不并存。根据是否传入okCB隐藏或显示三个按钮
   */
  show: function show(opts) {
    opts = opts || {}; //if (opts.title) {
    //    this.titleLabel.string = opts.title;
    //}

    if (opts.content) {
      this.contentLabel.string = opts.content;
    }

    this.confirmLabel.string = opts.confirmLabel || '';
    this.cancelLabel.string = opts.cancelLabel || '';
    this.okLabel.string = opts.okLabel || '';
    this.confirmCallback = opts.confirmCB || opts.okCB;
    this.cancelCallback = opts.cancelCB;
    this.okButton.node.active = !!opts.okCB;
    this.confirmButton.node.active = !opts.okCB;
    this.cancelButton.node.active = !opts.okCB;
  },
  hide: function hide() {
    this.node.removeFromParent();
  }
});
module.exports = DialogBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxkaWFsb2dCb3guanMiXSwibmFtZXMiOlsiRGlhbG9nQm94IiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ0aXRsZUxhYmVsIiwiTGFiZWwiLCJjb250ZW50TGFiZWwiLCJjb25maXJtQnV0dG9uIiwiQnV0dG9uIiwiY2FuY2VsQnV0dG9uIiwib2tCdXR0b24iLCJjb25maXJtTGFiZWwiLCJjYW5jZWxMYWJlbCIsIm9rTGFiZWwiLCJjb25maXJtQ2FsbGJhY2siLCJjYW5jZWxDYWxsYmFjayIsIm9uTG9hZCIsIm5vZGUiLCJhY3RpdmUiLCJvbiIsIk5vZGUiLCJFdmVudFR5cGUiLCJUT1VDSF9FTkQiLCJvbkNvbmZpcm1CdG5DbGlja2VkIiwib25DYW5jZWxCdG5DbGlja2VkIiwib25Pa0J0bkNsaWNrZWQiLCJoaWRlIiwic2hvdyIsIm9wdHMiLCJjb250ZW50Iiwic3RyaW5nIiwiY29uZmlybUNCIiwib2tDQiIsImNhbmNlbENCIiwicmVtb3ZlRnJvbVBhcmVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsU0FBUyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNyQixhQUFTRCxFQUFFLENBQUNFLFNBRFM7QUFHckJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVKLEVBQUUsQ0FBQ0ssS0FEUDtBQUVSQyxJQUFBQSxZQUFZLEVBQUVOLEVBQUUsQ0FBQ0ssS0FGVDtBQUdSRSxJQUFBQSxhQUFhLEVBQUVQLEVBQUUsQ0FBQ1EsTUFIVjtBQUlSQyxJQUFBQSxZQUFZLEVBQUVULEVBQUUsQ0FBQ1EsTUFKVDtBQUtSRSxJQUFBQSxRQUFRLEVBQUVWLEVBQUUsQ0FBQ1EsTUFMTDtBQU1SRyxJQUFBQSxZQUFZLEVBQUNYLEVBQUUsQ0FBQ0ssS0FOUjtBQU9STyxJQUFB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ckVvQixDQUFULENBQWhCO0FBd0VBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJyQyxTQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDlvLnlh7rlr7nor53moYbjgILkuLrkuobpgb/lhY3pgLvovpHnm7jkupLlvbHlk43vvIzlr7nor53moYbmtojlpLHljbNyZW1vdmXvvIzkuI3mjIHnu63lrZjlnKjkuo5zY2VuZeOAglxuICovXG52YXIgRGlhbG9nQm94ID0gY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGl0bGVMYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGNvbnRlbnRMYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGNvbmZpcm1CdXR0b246IGNjLkJ1dHRvbixcbiAgICAgICAgY2FuY2VsQnV0dG9uOiBjYy5CdXR0b24sXG4gICAgICAgIG9rQnV0dG9uOiBjYy5CdXR0b24sXG4gICAgICAgIGNvbmZpcm1MYWJlbDpjYy5MYWJlbCxcbiAgICAgICAgY2FuY2VsTGFiZWw6Y2MuTGFiZWwsXG4gICAgICAgIG9rTGFiZWw6Y2MuTGFiZWwsXG4gICAgICAgIGNvbmZpcm1DYWxsYmFjazogbnVsbCxcbiAgICAgICAgY2FuY2VsQ2FsbGJhY2s6IG51bGxcbiAgICB9LFxuXG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9rQnV0dG9uLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FuY2VsQnV0dG9uLm5vZGUuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMub25Db25maXJtQnRuQ2xpY2tlZCx0aGlzKTtcbiAgICAgICAgdGhpcy5jYW5jZWxCdXR0b24ubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5vbkNhbmNlbEJ0bkNsaWNrZWQsdGhpcyk7XG4gICAgICAgIHRoaXMub2tCdXR0b24ubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5vbk9rQnRuQ2xpY2tlZCx0aGlzKTtcbiAgICB9LFxuXG4gICAgb25Db25maXJtQnRuQ2xpY2tlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbmZpcm1DYWxsYmFjayAmJiB0aGlzLmNvbmZpcm1DYWxsYmFjaygpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9LFxuXG4gICAgb25DYW5jZWxCdG5DbGlja2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsQ2FsbGJhY2sgJiYgdGhpcy5jYW5jZWxDYWxsYmFjaygpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9LFxuXG4gICAgb25Pa0J0bkNsaWNrZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5vbkNvbmZpcm1CdG5DbGlja2VkKCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0c1xuICAgICAqIHRpdGxlKOWPr+mAiSk65qCH6aKYXG4gICAgICogY29udGVudDrlhoXlrrlcbiAgICAgKiBjb25maXJtQ0Io5Y+v6YCJKTrnoa7lrprlm57osIPvvIzlkoxjYW5jZWxDQuW/heW5tuWtmFxuICAgICAqIGNhbmNlbENCKOWPr+mAiSk65Y+W5raI5Zue6LCD77yM5ZKMY29uZmlybUNC5b+F5bm25a2YXG4gICAgICogb2tDQijlj6/pgIkpOuehruWumuWbnuiwg++8jOWSjGNvbmZpcm1DQuWPimNhbmNlbENC5LiN5bm25a2Y44CC5qC55o2u5piv5ZCm5Lyg5YWlb2tDQumakOiXj+aIluaYvuekuuS4ieS4quaMiemSrlxuICAgICAqL1xuICAgIHNob3c6IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICAvL2lmIChvcHRzLnRpdGxlKSB7XG4gICAgICAgIC8vICAgIHRoaXMudGl0bGVMYWJlbC5zdHJpbmcgPSBvcHRzLnRpdGxlO1xuICAgICAgICAvL31cbiAgICAgICAgaWYgKG9wdHMuY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50TGFiZWwuc3RyaW5nID0gb3B0cy5jb250ZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmlybUxhYmVsLnN0cmluZyA9IG9wdHMuY29uZmlybUxhYmVsfHwnJztcbiAgICAgICAgdGhpcy5jYW5jZWxMYWJlbC5zdHJpbmcgPSBvcHRzLmNhbmNlbExhYmVsfHwnJztcbiAgICAgICAgdGhpcy5va0xhYmVsLnN0cmluZyA9IG9wdHMub2tMYWJlbHx8Jyc7XG4gICAgICAgIHRoaXMuY29uZmlybUNhbGxiYWNrID0gb3B0cy5jb25maXJtQ0IgfHwgb3B0cy5va0NCO1xuICAgICAgICB0aGlzLmNhbmNlbENhbGxiYWNrID0gb3B0cy5jYW5jZWxDQjtcbiAgICAgICAgdGhpcy5va0J1dHRvbi5ub2RlLmFjdGl2ZSA9ICEhb3B0cy5va0NCO1xuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24ubm9kZS5hY3RpdmUgPSAhb3B0cy5va0NCO1xuICAgICAgICB0aGlzLmNhbmNlbEJ1dHRvbi5ub2RlLmFjdGl2ZSA9ICFvcHRzLm9rQ0I7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaWFsb2dCb3g7Il19