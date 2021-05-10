"use strict";
cc._RF.push(module, '84833vJXhNMwZQ8web99yS6', 'platformFun');
// gameComon/scripts/platformFun.js

"use strict";

module.exports = {
  subscribeService: function subscribeService() {
    if (cc.sys.platform == cc.sys.BAIDU_GAME) {
      swan.subscribeService({
        templateId: '7519c8966fdd442d93cec1e0a30c3521',
        subscribeId: '1234',
        type: 'query',
        success: function success(res) {
          swan.showModal({
            title: 'success',
            content: JSON.stringify(res)
          });
        },
        fail: function fail(err) {
          swan.showModal({
            title: 'fail',
            content: JSON.stringify(err)
          });
        }
      });
    }
  }
};

cc._RF.pop();