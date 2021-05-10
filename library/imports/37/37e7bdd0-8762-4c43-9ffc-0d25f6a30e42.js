"use strict";
cc._RF.push(module, '37e7b3Qh2JMQ5/8DSX2ow5C', 'item');
// gameComon/scripts/item.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    //cc.log("item onLoad")
    this.node.active = false;
  },
  start: function start() {},
  init: function init(id) {
    cc.log("item init");

    if (appGame.gameServerRoom.commonConfig && appGame.gameServerRoom.commonConfig.item) {
      underscore.each(appGame.gameServerRoom.commonConfig.item, function (key, value) {
        if (key.id == id) {
          util.loadBundleSprite(key.bundle, key.sprite, this.node.getComponent(cc.Sprite), function () {
            this.node.active = true;
          }.bind(this));
        }
      }.bind(this));
    }
  } // update (dt) {},

});

cc._RF.pop();