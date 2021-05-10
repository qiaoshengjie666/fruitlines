"use strict";
cc._RF.push(module, 'eec36KS2hZPVbBk7XsJ2C2d', 'loadTip');
// gameComon/scripts/loadTip.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
    contentLabel: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.contentLabel.string = '';
  },
  show: function show(opts) {
    opts = opts || {};

    if (opts.content) {
      this.node.active = true;
      this.contentLabel.string = opts.content;

      this.contentLabel._forceUpdateRenderData(true);

      var spaceWidth = this.contentLabel.node.getContentSize().width;
      var labelWidth = cc.view.getVisibleSize().width - 200;

      if (spaceWidth < labelWidth) {
        this.contentLabel.overflow = cc.Label.Overflow.NONE;
        this.contentLabel.node.width = spaceWidth;
        this.contentLabel.node.height = this.contentLabel.node.getContentSize().height;
        this.node.width = spaceWidth + 30;
        this.node.height = 80;
      } else {
        this.contentLabel.overflow = cc.Label.Overflow.CLAMP;
        this.contentLabel.enableWrapText = true;
        this.contentLabel.node.width = labelWidth;
        this.contentLabel.node.height = this.contentLabel.node.getContentSize().height + Math.floor(spaceWidth / labelWidth) * 40;
        this.node.width = labelWidth + 30;
        this.node.height = 80 + Math.floor(spaceWidth / labelWidth) * 50;
      }
    }

    this.node.opacity = 0;
    this.node.stopAllActions();
    this.node.runAction(cc.sequence(cc.fadeIn(0.5), cc.delayTime(1), cc.callFunc(function () {
      this.node.active = false;
    }.bind(this))));
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();