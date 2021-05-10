"use strict";
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