"use strict";
cc._RF.push(module, '40fbfZFpRVEpo0R8nzzeIHb', 'horn');
// gameComon/scripts/horn.js

"use strict";

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
    sprite: [cc.SpriteFrame],
    bg: cc.Sprite
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_END, this.onClickTouchEnd, this);
    appGame.audioMgr.getMusicStatus(function (onOff) {
      if (onOff) {
        this.bg.spriteFrame = this.sprite[0];
      } else {
        this.bg.spriteFrame = this.sprite[1];
      }
    }.bind(this));
  },
  start: function start() {},
  onClickTouchEnd: function onClickTouchEnd(event) {
    appGame.audioMgr.getMusicStatus(function (onOff) {
      appGame.audioMgr.setMusicOnOff(!onOff);

      if (!onOff) {
        this.bg.spriteFrame = this.sprite[0];
      } else {
        this.bg.spriteFrame = this.sprite[1];
      }
    }.bind(this));
  } // update (dt) {},

});

cc._RF.pop();