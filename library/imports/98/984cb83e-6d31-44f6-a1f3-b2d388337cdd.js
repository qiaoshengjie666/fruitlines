"use strict";
cc._RF.push(module, '984cbg+bTFE9qHzstOIM3zd', 'videoBanner');
// gameComon/scripts/ad/videoBanner.js

"use strict";

var videoAdId = '';
var appId = '';
var isPlaySuccess = false;
var countDownTimeOut;
var VideoBanner = cc.Class({
  properties: {},
  ctor: function ctor() {
    this.instance = null;
  },
  statics: {
    create: function create(data) {
      if (!this.instance) {
        this.instance = new VideoBanner();
        this.instance.initWithData(data);
        return this.instance;
      }
    }
  },
  initWithData: function initWithData(data) {
    isPlaySuccess = false;
    this.callback = null;
    this.count = 1;

    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
      //头条平台
      videoAdId = '1gr8f7hvpon3mb2llf';

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.videoId && appGame.gameServerRoom.adConfig.videoId.toutiao) {
        videoAdId = appGame.gameServerRoom.adConfig.videoId.toutiao.adUnitId;
      }

      this.globalData = {
        videoAd: tt.createRewardedVideoAd({
          adUnitId: videoAdId
        })
      };
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '广告位激励视频',
        content: '创建成功',
        desc: videoAdId
      }, function () {});
    } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX') {
      //微信
      videoAdId = 'adunit-168ed0ed4d9f8fad';

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.videoId && appGame.gameServerRoom.adConfig.videoId.WX) {
        videoAdId = appGame.gameServerRoom.adConfig.videoId.WX.adUnitId;
      }

      this.globalData = {
        videoAd: wx.createRewardedVideoAd({
          adUnitId: videoAdId
        })
      };
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '广告位激励视频',
        content: '创建成功',
        desc: videoAdId
      }, function () {});
    } else if (cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ') {
      //qq
      videoAdId = 'adunit-168ed0ed4d9f8fad';

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.videoId && appGame.gameServerRoom.adConfig.videoId.QQ) {
        videoAdId = appGame.gameServerRoom.adConfig.videoId.QQ.adUnitId;
      }

      this.globalData = {
        videoAd: qq.createRewardedVideoAd({
          adUnitId: videoAdId
        })
      };
      httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
        title: '广告位激励视频',
        content: '创建成功',
        desc: videoAdId
      }, function () {});
    } else if (cc.sys.platform == cc.sys.BAIDU_GAME) {
      //百度
      videoAdId = '7433930';

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.videoId && appGame.gameServerRoom.adConfig.videoId.baidu) {
        videoAdId = appGame.gameServerRoom.adConfig.videoId.baidu.adUnitId;
      }

      if (appGame.gameServerRoom.adConfig && appGame.gameServerRoom.adConfig.videoId && appGame.gameServerRoom.adConfig.videoId.baidu) {
        appId = appGame.gameServerRoom.adConfig.videoId.baidu.appSid;
      }

      this.globalData = {
        videoAd: swan.createRewardedVideoAd({
          adUnitId: videoAdId,
          appSid: appId
        })
      };
    }

    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '广告位激励视频',
      content: '创建成功',
      desc: videoAdId
    }, function () {});

    if (cc.sys.platform != cc.sys.WECHAT_GAME) {
      if (this.globalData && this.globalData.videoAd) {
        this.globalData.videoAd.onClose(function (res) {
          if (res.isEnded) {
            console.log("看完视频关闭");
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '广告位激励视频',
              content: '点击关闭',
              desc: videoAdId + "播放成功"
            }, function () {});
            clearTimeout(countDownTimeOut);
            this.callback && this.callback(1);
            appGame.audioMgr.getMusicStatus(function (onOff) {
              if (onOff) {
                appGame.audioMgr.setMusicOnOff(onOff);
              }
            }.bind(this));
          } else {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '广告位激励视频',
              content: '点击关闭',
              desc: videoAdId + "播放失败"
            }, function () {});
            console.log("未看完视频关闭");
            clearTimeout(countDownTimeOut);
            this.callback && this.callback(2);
            appGame.audioMgr.getMusicStatus(function (onOff) {
              if (onOff) {
                appGame.audioMgr.setMusicOnOff(onOff);
              }
            }.bind(this));
          }
        }.bind(this));

        var onErrorFuc = function (listener) {
          console.log("播放视频广告出问题" + listener.errCode + listener.errMsg);
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '广告位激励视频',
            content: videoAdId,
            desc: listener.errCode + listener.errMsg
          }, function () {});
          clearTimeout(countDownTimeOut);
          this.callback && this.callback(3);
          appGame.audioMgr.getMusicStatus(function (onOff) {
            if (onOff) {
              appGame.audioMgr.setMusicOnOff(onOff);
            }
          }.bind(this));
        }.bind(this);

        this.globalData.videoAd.onError(onErrorFuc); //this.globalData.videoAd.offError(onErrorFuc);
      }
    }
  },
  playVideoAd: function playVideoAd(sceneId, cb) {
    isPlaySuccess = false;
    console.log("播放视频广告");
    this.count++;
    httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
      title: '广告位激励视频',
      content: this.count,
      desc: videoAdId
    }, function () {});
    clearTimeout(countDownTimeOut);

    if (this.globalData && this.globalData.videoAd) {
      appGame.audioMgr.getMusicStatus(function (onOff) {
        if (onOff) {
          appGame.audioMgr.setMusicOnOff(onOff);
        }
      }.bind(this));
      countDownTimeOut = setTimeout(function () {
        if (!isPlaySuccess) {
          console.log("倒计时到返回回调");
          clearTimeout(countDownTimeOut);
          appGame.audioMgr.getMusicStatus(function (onOff) {
            if (onOff) {
              appGame.audioMgr.setMusicOnOff(onOff);
            }
          }.bind(this));
          cb(3);
        }
      }.bind(this), 5000);
      var videoAd = this.globalData.videoAd;

      if (cc.sys.platform == cc.sys.WECHAT_GAME && (appGame.platform == 'WX' || appGame.platform == 'QQ')) {
        console.log("播放微信视频");

        if (_videoAd) {
          _videoAd.destroy();
        }

        var _videoAd = null;

        if (appGame.platform == 'WX') {
          _videoAd = wx.createRewardedVideoAd({
            adUnitId: videoAdId
          });
        } else {
          _videoAd = qq.createRewardedVideoAd({
            adUnitId: videoAdId
          });
        }

        httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
          title: '广告位激励视频',
          content: '创建成功',
          desc: videoAdId
        }, function () {});

        _videoAd.onError(function (res) {
          clearTimeout(countDownTimeOut);
          this.callback && this.callback(3);
          appGame.audioMgr.getMusicStatus(function (onOff) {
            if (onOff) {
              appGame.audioMgr.setMusicOnOff(onOff);
            }
          }.bind(this));
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '广告位激励视频',
            content: videoAdId,
            desc: res.errCode + res.errMsg
          }, function () {});
          console.log('videoAd onError', res);
        }.bind(this));

        _videoAd.onLoad(function (res) {
          console.log('videoAd onLoad', res);
        });

        _videoAd.onClose(function (res) {
          console.log("关闭微信视频========" + res.isEnded);

          if (res.isEnded) {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '广告位激励视频',
              content: '点击关闭',
              desc: videoAdId + "播放成功"
            }, function () {});
            clearTimeout(countDownTimeOut);
            this.callback && this.callback(1);
            appGame.audioMgr.getMusicStatus(function (onOff) {
              if (onOff) {
                appGame.audioMgr.setMusicOnOff(onOff);
              }
            }.bind(this));
          } else {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '广告位激励视频',
              content: '点击关闭',
              desc: videoAdId + "播放失败"
            }, function () {});
            clearTimeout(countDownTimeOut);
            this.callback && this.callback(2);
            appGame.audioMgr.getMusicStatus(function (onOff) {
              if (onOff) {
                appGame.audioMgr.setMusicOnOff(onOff);
              }
            }.bind(this));
          }

          _videoAd.offClose();
        }.bind(this));

        _videoAd.load().then(function () {
          console.log('激励视频加载成功');

          _videoAd.show().then(function () {
            isPlaySuccess = true;
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '广告位激励视频',
              content: '展示成功',
              desc: videoAdId + sceneId
            }, function () {});
            console.log('激励视频 广告显示成功');
          })["catch"](function (err) {
            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '广告位激励视频',
              content: '展示失败',
              desc: videoAdId + sceneId
            }, function () {});
            console.log('激励视频 广告显示失败');
          });
        })["catch"](function (err) {
          console.log('激励视频加载失败');
        });

        this.callback = cb;
      } else {
        videoAd.show().then(function () {
          isPlaySuccess = true;
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '广告位激励视频',
            content: '展示成功',
            desc: videoAdId + sceneId
          }, function () {});
          console.log("广告显示成功");
        })["catch"](function (err) {
          httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
            title: '广告位激励视频',
            content: '展示失败',
            desc: videoAdId + sceneId
          }, function () {});
          console.log("广告组件出现问题", err); // 可以手动加载一次

          videoAd.load().then(function () {
            console.log("手动加载成功"); // 加载成功后需要再显示广告

            httpUtils.httpPost(consts.HTTP_RECORD_SERVER, {
              title: '广告位激励视频',
              content: '手动加载成功',
              desc: videoAdId
            }, function () {});
            isPlaySuccess = true;
            return videoAd.show();
          });
        });
        this.callback = cb;
      }
    } else {
      //没有激励视频的直接返回
      appGame.audioMgr.getMusicStatus(function (onOff) {
        if (onOff) {
          appGame.audioMgr.setMusicOnOff(onOff);
        }
      }.bind(this));
      cb(1);
    }
  }
});
module.exports = VideoBanner;

cc._RF.pop();