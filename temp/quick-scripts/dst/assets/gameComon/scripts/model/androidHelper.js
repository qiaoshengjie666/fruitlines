
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/gameComon/scripts/model/androidHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e14abL3OJ9GPoS9lM+R5fsf', 'androidHelper');
// gameComon/scripts/model/androidHelper.js

"use strict";

module.exports = {
  start: function start() {},

  /**
   * 获取平台
   */
  getPhonePlatFrom: function getPhonePlatFrom() {
    var platFrom = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getPhonePlatFrom", "()Ljava/lang/String;");
    return platFrom;
  },

  /**
   * 获取游戏名称（预留下次大版本更新使用接口）
   */
  getGameName: function getGameName() {
    var game = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getGameName", "()Ljava/lang/String;");
    return game;
  },

  /**
   * android曾进入creator中间黑屏，android层展示大图，调用方法删除大图
   */
  clearWelcomeImage: function clearWelcomeImage() {
    console.log("clear welcome image...");

    if (cc.sys.os == cc.sys.OS_ANDROID) {
      jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "removeLaunchImage", "()V");
    }
  },

  /**
   * 换头像
   */
  replacePhoto: function replacePhoto(info, cb) {
    cc.eventManager.removeCustomListeners('updateImag');
    cc.eventManager.addCustomListener('updateImag', function (event) {
      cb(event.getUserData().a);
    });
    jsb.reflection.callStaticMethod("org/cocos2dx/Photo", "getLocalImag", "(Ljava/lang/String;)Ljava/lang/String;", info);
  },

  /**
   * 获取平台id
   */
  getPhonePlatFromType: function getPhonePlatFromType() {
    var platFromType = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getPhoneType", "()Ljava/lang/String;");
    return parseInt(platFromType);
  },

  /**
   * 获取当前版本
   */
  getVersion: function getVersion() {
    var version = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getLocationVersion", "()Ljava/lang/String;");
    return version;
  },

  /**
   * 获取子版本号
   */
  getChildVersion: function getChildVersion() {
    var childVersion = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getChildVersion", "()Ljava/lang/String;");
    return childVersion;
  },

  /**
  * 获取手机型号
  */
  getPhoneModel: function getPhoneModel() {
    var model = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getPhoneModel", "()Ljava/lang/String;");
    return model;
  },

  /**
   * 获取手机设备号
   */
  getPhoneDeviceID: function getPhoneDeviceID() {
    var deviceId = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "deviceID", "()Ljava/lang/String;");
    return deviceId;
  },

  /**
   * 该方法只为获取应用宝登录token是否失效
   */
  getYybIsLogin: function getYybIsLogin() {
    var isLogin = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "isYybLogin", "()Ljava/lang/String;");
    return isLogin;
  },

  /**
   * 获取邀请码
   */
  getInviteCode: function getInviteCode() {
    var inviteCode = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getInviteInformation", "()Ljava/lang/String;");
    return inviteCode;
  },

  /**
   * 获取房间号
   */
  getRoomNum: function getRoomNum() {
    var roomNum = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getHouseInformation", "()Ljava/lang/String;");
    return roomNum;
  },

  /**
   * 四种登录模式,qq登陆
   */
  qqLogin: function qqLogin(cb) {
    cc.eventManager.removeCustomListeners('qqLoginResult');
    cc.eventManager.addCustomListener('qqLoginResult', function (event) {
      cb(event.getUserData().a);
    });
    jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "qqLogin", "()V");
  },

  /**
   * 四种登录模式,微信登陆
   */
  wechatLogin: function wechatLogin(cb) {
    cc.eventManager.removeCustomListeners('wechatLoginResult');
    cc.eventManager.addCustomListener('wechatLoginResult', function (event) {
      cb(event.getUserData().a);
    });
    jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "wechatLogin", "()V");
  },

  /**
   * 四种登录模式,设备登陆
   */
  deviceLogin: function deviceLogin() {
    var version = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "deviceLogin", "(Ljava/lang/String;)Ljava/lang/String;", "");
    return version;
  },

  /**
   * 三种支付，微信支付
   */
  wechatPay: function wechatPay(payment, cb) {
    cc.eventManager.removeCustomListeners('wechatPayResult');
    cc.eventManager.addCustomListener('wechatPayResult', function (event) {
      cb(event.getUserData().a);
    });
    jsb.reflection.callStaticMethod("org/cocos2dx/WechatPay", "wechatPay", "(Ljava/lang/String;)Ljava/lang/String;", payment);
  },

  /**
   * 三种支付，支付宝支付
   */
  alipayPay: function alipayPay(payment, cb) {
    cc.eventManager.removeCustomListeners('alipayPayResult');
    cc.eventManager.addCustomListener('alipayPayResult', function (event) {
      cb(event.getUserData().a);
    });
    jsb.reflection.callStaticMethod("org/cocos2dx/AlipayPay", "alipayPay", "(Ljava/lang/String;)Ljava/lang/String;", payment);
  },

  /**
   * 分享 type :0：好友文字分享，2：朋友圈分享，1:朋友圈图片分享，3好友图片分享
   */
  wechatShare: function wechatShare(payment, cb) {
    cc.eventManager.removeCustomListeners('shareWechatResult');
    cc.eventManager.addCustomListener('shareWechatResult', function (event) {
      cb(Number(event.getUserData().a));
    });
    jsb.reflection.callStaticMethod("org/cocos2dx/WeChat", "useWeiXin", "(Ljava/lang/String;I)V", payment.str, payment.type);
  },

  /**
   * 打开微信
   */
  openWechat: function openWechat() {
    jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "openWechat", "()V");
  },

  /**
   * 打开qq
   */
  openQQ: function openQQ() {
    jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "qqHelp", "(Ljava/lang/String;)V", "2983816547");
  },

  /**
   * 播放网络音乐
   */
  playNetSound: function playNetSound(info, cb) {
    //info:url 地址
    cc.eventManager.removeCustomListeners('playNetSoundOver');
    cc.eventManager.addCustomListener('playNetSoundOver', function (event) {
      //监听播放完毕返回
      cb(event.getUserData().a);
    });
    jsb.reflection.callStaticMethod("org/cocos2dx/SoundInfo", "playNetSound", "(Ljava/lang/String;)V", info);
  },

  /**
   * 开始录音
   */
  playRecorderBegin: function playRecorderBegin() {
    jsb.reflection.callStaticMethod("org/cocos2dx/SoundInfo", "playRecorderBegin", "()V");
  },

  /**
   * 录音结束
   */
  playRecorderEnd: function playRecorderEnd() {
    //传入七牛网盘生成地址需要的url前缀，name文件名，token。
    jsb.reflection.callStaticMethod("org/cocos2dx/SoundInfo", "playRecorderEnd", "()V");
  },

  /**
   * 上传录音
   */
  uploadRecorder: function uploadRecorder() {
    cc.eventManager.removeCustomListeners('playSoundUrl');
    app.playerMgr.getRecordToken(function (data) {
      cc.eventManager.addCustomListener('playSoundUrl', function (event) {
        app.playerMgr.uploadRecord(event.getUserData().a, function (data) {});
      });
      jsb.reflection.callStaticMethod("org/cocos2dx/SoundInfo", "uploadRecorder", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", data.url, data.name, data.token);
    });
  },

  /**
   * 获取地理位置
   */
  getLocationInfo: function getLocationInfo(cb) {
    //经纬度以###分开
    if (app.creatorPlatformType == 1 || app.creatorPlatformType == 2) {
      cc.eventManager.removeCustomListeners('baiDuLocationResult');
      cc.eventManager.addCustomListener('baiDuLocationResult', function (event) {
        var pos = event.getUserData().a.split('###'); // 前面精度，后面纬度

        cb({
          x: pos[0],
          y: pos[1]
        });
      });
      jsb.reflection.callStaticMethod("org/cocos2dx/Map", "getLocationInfo", "(Ljava/lang/String;)V", "cocos");
    } else {
      var pos = '108.883452###34.232702'.split('###'); // 前面精度，后面纬度

      cb({
        x: pos[0],
        y: pos[1]
      });
    }
  },

  /**
   * 打开权限设置
   */
  openSetting: function openSetting() {
    jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "openSetting", "()V");
  },

  /**
  * 获取手机电量
  */
  getPhoneElectric: function getPhoneElectric(cb) {
    cc.eventManager.removeCustomListeners('getElectric');
    cc.eventManager.addCustomListener('getElectric', function (event) {
      cb(event.getUserData().a);
    });
  },

  /**
   * 检测大版本更新 
   */
  checkApkUpdate: function checkApkUpdate(hotVersion, childVersion, cb) {
    cc.eventManager.removeCustomListeners('havingnNewVersion');
    cc.eventManager.addCustomListener('havingnNewVersion', function (event) {
      cb(event.getUserData().a);
    });
    jsb.reflection.callStaticMethod("com/douyer/helper/VersionManager", "checkupVersion", "(Ljava/lang/String;Ljava/lang/String;)V", hotVersion, childVersion);
  },

  /**
     * 四种登录模式,第三方登陆
     */
  thirdLogin: function thirdLogin(info, cb) {
    //info只用在yyb平台
    if (app.phonePlatFrom == "huawei") {
      cc.eventManager.removeCustomListeners('accessToken');
      cc.eventManager.addCustomListener('accessToken', function (event) {
        cb(event.getUserData().a);
      });
      var buo = "MIICcwIBADANBgkqhkiG9w0BAQEFAASCAl0wggJZAgEAAoGBAIyo98FF4bIG0mxNGk2b7so/PBSajxYHYPb2lZQj7ebg6ODIq+6hFO2hdqQ+jOTlQVlVqeAqJncTVBsMPm3s+vrnp42RqzFMYo3b6214VQfjiPjjFXoXUYRU66vfqk5hjaz4TMNJ0BS+PcYB3Yn8dgrhSTrVRYfiYOEbUjy6EKMDAgMBAAECf33Sp807taiKcbBvSBgkZHaGGjhUCaqq7xH7gdICUc01YxuwZhwP+6iVxoslaONYMBy5hDwBeGcL4zBOw4mRcu+flIwNPLS7gZ3UM1XwnlIN6e2IjQSsYbIdXfQ/4Z4Mqhy+v1wv+IjBIR/4t2haxrKJKgVlSEds3tHBQZeko0ECQQD1MzTHtwHZoeP8UtCxUEE8cYoNXRg5lX69hx7y14Y4c//tksSWre2EDkMDzICkyndQrNwY38xrilT1ylO5TEchAkEAktsA4sn50qet+GUBO1T5UvyfhdBcBqZeeAVzpFf2Em1WgWGQGZxQ5ZnY9Uz6uvVMycdYhUfpoAiUZAyNcok5owJAXNfBwWlTIwPAnrcA3FLGEMvw+PRqCsvHTJ5QIqVm5hNOMbekBmXfDGSWDWcuwrcDDKIXSLfc4E9lshelMgFm4QJALwA2vV7lPP17mYdCKKoejefaampwOZSfoYwlIdEhKW6jBA+knf3Aimt926yChrmhlObfNvD4HccBLzAxSRoQPwJALQbPOM6lrHl2qCP+SoJI0xhmIFevkl181YYeXx+3hk1X/fSL/Y9mphaNcbOGc0qAWVhWkcjPeXoE9rzDrjFSmw==";
      jsb.reflection.callStaticMethod("com/helper/huawei/sdk/HuaWeiPay", "huaWeiInit", "(Ljava/lang/String;)V", buo);
    } else if (app.phonePlatFrom == "oppo") {
      cc.eventManager.removeCustomListeners('OloginResult');
      cc.eventManager.addCustomListener('OloginResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("org/cocos2dx/PayOPPO", "Ologin", "()V");
    } else if (app.phonePlatFrom == "telecom") {
      cc.eventManager.removeCustomListeners('dianxinLoginResult');
      cc.eventManager.addCustomListener('dianxinLoginResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/dianxin/sdk/DianXinSdk", "gotoLogin", "()V");
    } else if (app.phonePlatFrom == "xiaomi" || app.phonePlatFrom == "meizu") {
      cc.eventManager.removeCustomListeners('YiSDKLoginCallBack');
      cc.eventManager.addCustomListener('YiSDKLoginCallBack', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/yijie/sdk/Yisdk", "YiSDKInit", "(Ljava/lang/String;)V", 1);
    } else if (app.phonePlatFrom == "yyb") {
      cc.eventManager.removeCustomListeners('yybLoginResult');
      cc.eventManager.addCustomListener('yybLoginResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/yyb/sdk/YYBhelper", "gotoLogin", "(Ljava/lang/String;)V", info);
    } else if (app.phonePlatFrom == "uc") {
      cc.eventManager.removeCustomListeners('loginResult');
      cc.eventManager.addCustomListener('loginResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/uc/sdk/UcSdkCode", "ucInit", "()V");
    } else if (app.phonePlatFrom == "360") {
      cc.eventManager.removeCustomListeners('loginCallBack');
      cc.eventManager.addCustomListener('loginCallBack', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/q360/sdk/Sdk360", "login360", "()V");
    }
  },

  /**
   * 三种支付，第三方支付
   */
  thirdPay: function thirdPay(payment, cb) {
    if (app.phonePlatFrom == "huawei") {
      cc.eventManager.removeCustomListeners('huaWeiPayResult');
      cc.eventManager.addCustomListener('huaWeiPayResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/huawei/sdk/HuaWeiPay", "huaWeiPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.name, payment.price, payment.name, payment.orderNo, payment.key, payment.url);
    } else if (app.phonePlatFrom == "oppo") {
      cc.eventManager.removeCustomListeners('OpayResult');
      cc.eventManager.addCustomListener('OpayResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("org/cocos2dx/PayOPPO", "Opay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.name, payment.url, payment.price, payment.orderNo);
    } else if (app.phonePlatFrom == "vivo") {
      cc.eventManager.removeCustomListeners('VPayResult');
      cc.eventManager.addCustomListener('VPayResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/vivo/sdk/VivoSDK", "VPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.orderNo, payment.url, payment.name, payment.price);
    } else if (app.phonePlatFrom == "xiaomi" || app.phonePlatFrom == "meizu") {
      cc.eventManager.removeCustomListeners('YiSDKPayResult');
      cc.eventManager.addCustomListener('YiSDKPayResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/yijie/sdk/Yisdk", "YiSDKPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.name, payment.price, payment.orderNo, payment.url);
    } else if (app.phonePlatFrom == "yyb") {
      cc.eventManager.removeCustomListeners('yybPayResult');
      cc.eventManager.addCustomListener('yybPayResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/yyb/sdk/YYBhelper", "gotoPay", "(Ljava/lang/String;)V", payment.price);
    } else if (app.phonePlatFrom == "telecom") {
      cc.eventManager.removeCustomListeners('dianxinPayResult');
      cc.eventManager.addCustomListener('dianxinPayResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/dianxin/sdk/DianXinSdk", "DianXinPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.price, payment.orderNo, payment.name);
    } else if (app.phonePlatFrom == "baidu") {
      cc.eventManager.removeCustomListeners('baiduResult');
      cc.eventManager.addCustomListener('baiduResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/baidu/sdk/BaiduSdk", "pay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.baiduPayId, payment.price, payment.name, payment.orderNo);
    } else if (app.phonePlatFrom == "uc" && app.appKey == "wk") {
      cc.eventManager.removeCustomListeners('payResult');
      cc.eventManager.addCustomListener('payResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/uc/sdk/UcSdkCode", "ucSdkPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.price, payment.orderNo, payment.url, payment.accountId, payment.sign);
    } else if (app.phonePlatFrom == "uc" && app.appKey == "sd") {
      cc.eventManager.removeCustomListeners('payResult');
      cc.eventManager.addCustomListener('payResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/uc/sdk/UcSdkCode", "ucSdkPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.name, payment.price, payment.orderNo, payment.url);
    } else if (app.phonePlatFrom == "360") {
      cc.eventManager.removeCustomListeners('sdk360PayResult');
      cc.eventManager.addCustomListener('sdk360PayResult', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/q360/sdk/Sdk360", "pay360", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", payment.price, payment.name, payment.id, payment.orderNo, payment.url);
    }
  },

  /**
    * 切换账号
    */
  loginOut: function loginOut(cb) {
    if (app.phonePlatFrom == "yyb") {
      cc.eventManager.removeCustomListeners('yybSDKLoginOutCallBack');
      cc.eventManager.addCustomListener('yybSDKLoginOutCallBack', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("com/helper/yyb/sdk/YYBhelper", "ChangeAccount", "()V");
    } else {
      cc.eventManager.removeCustomListeners('logOutOk');
      cc.eventManager.addCustomListener('logOutOk', function (event) {
        cb(event.getUserData().a);
      });
      jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "loginOut", "()V");
    }
  },

  /**
   * 退出游戏
   */
  exitGame: function exitGame() {
    if (app.phonePlatFrom == "huawei") {//调用游戏退出
    } else if (app.phonePlatFrom == "oppo") {
      jsb.reflection.callStaticMethod("org/cocos2dx/PayOPPO", "Oexit", "()V");
    } else if (app.phonePlatFrom == "xiaomi" || app.phonePlatFrom == "meizu" || app.phonePlatFrom == "yyb") {
      jsb.reflection.callStaticMethod("com/helper/yijie/sdk/Yisdk", "YiSDKExit", "()V");
    } else if (app.phonePlatFrom == "vivo") {
      jsb.reflection.callStaticMethod("com/helper/vivo/sdk/VivoSDK", "vivoLoginOut", "()V");
    } else if (app.phonePlatFrom == "telecom") {
      jsb.reflection.callStaticMethod("com/helper/dianxin/sdk/DianXinSdk", "dianxinSdkExit", "()V");
    } else if (app.phonePlatFrom == "baidu") {
      jsb.reflection.callStaticMethod("com/helper/baidu/sdk/BaiduSdk", "quitBaiDu", "()V");
    } else if (app.phonePlatFrom == "uc") {
      jsb.reflection.callStaticMethod("com/helper/uc/sdk/UcSdkCode", "ucSdkExit", "()V");
    } else if (app.phonePlatFrom == "360") {
      jsb.reflection.callStaticMethod("com/helper/q360/sdk/Sdk360", "quit360", "()V");
    }
  },

  /**
   * 监听网络
   */
  getNetworkInfo: function getNetworkInfo() {
    var network = jsb.reflection.callStaticMethod("org/cocos2dx/NetUtil", "checkNetworkInfoCreator", "()Ljava/lang/String;");
    return network;
  },

  /**
   * 调用app打开功能
   */
  installApk: function installApk(info) {
    //data
    jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "installApk", "(Ljava/lang/String;)V", info);
  },

  /**
  * 获取打开本地apk路径
  */
  getApkFile: function getApkFile() {
    var apkFile = jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "getApkFile", "()Ljava/lang/String;");
    return apkFile;
  },

  /**调用anroid层下载 */
  uploadApk: function uploadApk(url, name, cb) {
    cc.eventManager.removeCustomListeners('uploadApkProgress');
    cc.eventManager.addCustomListener('uploadApkProgress', function (event) {
      cb(event.getUserData().a);
    });
    jsb.reflection.callStaticMethod("org/cocos2dx/UploadApk", "uploadApkFromCreator", "(Ljava/lang/String;Ljava/lang/String;)V", url, name);
  },

  /**
   * 调用第三方浏览器
   */
  openUrl: function openUrl(url) {
    jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "openUrl", "(Ljava/lang/String;)V", url);
  },

  /**
   * 调用app内置浏览器 传入 url:打开地址，type:横竖牌显示(1:landscape ,2:portrait)，name :标头名
   */
  openInUrl: function openInUrl(url, type, name, isDownload, playerId, adId) {
    jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "openInUrl", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", url, type, name, isDownload, playerId, adId);
  },

  /**
   * 停止下载
   */
  stopApkDownLoad: function stopApkDownLoad() {
    jsb.reflection.callStaticMethod("org/cocos2dx/UploadApk", "stopUpLoad", "()V");
  },
  setScreenChange: function setScreenChange(type) {
    //type:横竖牌显示(1:landscape ,2:portrait)
    jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "setScreenChange", "(Ljava/lang/String;)V", url);
  },

  /**调用anroid层是否安装 */
  judgeIfInstallApk: function judgeIfInstallApk(packgaeName, name) {
    // "true" "false"
    var judge = jsb.reflection.callStaticMethod("org/cocos2dx/UploadApk", "judgeIfInstallApk", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", packgaeName, name);
    return judge;
  },

  /**
   * 备有接口 删除下载的所有文件
   */
  deleAllFiles: function deleAllFiles() {
    jsb.reflection.callStaticMethod("org/cocos2dx/UploadApk", "deleAllFiles", "()V");
  },
  //fuzhi
  copyToClipboard: function copyToClipboard(content) {
    jsb.reflection.callStaticMethod("org/cocos2dx/AndroidHelper", "qpCopy", "(Ljava/lang/String;)V", content);
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZUNvbW9uXFxzY3JpcHRzXFxtb2RlbFxcYW5kcm9pZEhlbHBlci5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic3RhcnQiLCJnZXRQaG9uZVBsYXRGcm9tIiwicGxhdEZyb20iLCJqc2IiLCJyZWZsZWN0aW9uIiwiY2FsbFN0YXRpY01ldGhvZCIsImdldEdhbWVOYW1lIiwiZ2FtZSIsImNsZWFyV2VsY29tZUltYWdlIiwiY29uc29sZSIsImxvZyIsImNjIiwic3lzIiwib3MiLCJPU19BTkRST0lEIiwicmVwbGFjZVBob3RvIiwiaW5mbyIsImNiIiwiZXZlbnRNYW5hZ2VyIiwicmVtb3ZlQ3VzdG9tTGlzdGVuZXJzIiwiYWRkQ3VzdG9tTGlzdGVuZXIiLCJldmVudCIsImdldFVzZXJEYXRhIiwiYSIsImdldFBob25lUGxhdEZyb21UeXBlIiwicGxhdEZyb21UeXBlIiwicGFyc2VJbnQiLCJnZXRWZXJzaW9uIiwidmVyc2lvbiIsImdldENoaWxkVmVyc2lvbiIsImNoaWxkVmVyc2lvbiIsImdldFBob25lTW9kZWwiLCJtb2RlbCIsImdldFBob25lRGV2aWNlSUQiLCJkZXZpY2VJZCIsImdldFl5YklzTG9naW4iLCJpc0xvZ2luIiwiZ2V0SW52aXRlQ29kZSIsImludml0ZUNvZGUiLCJnZXRSb29tTnVtIiwicm9vbU51bSIsInFxTG9naW4iLCJ3ZWNoYXRMb2dpbiIsImRldmljZUxvZ2luIiwid2VjaGF0UGF5IiwicGF5bWVudCIsImFsaXBheVBheSIsIndlY2hhdFNoYXJlIiwiTnVtYmVyIiwic3RyIiwidHlwZSIsIm9wZW5XZWNoYXQiLCJvcGVuUVEiLCJwbGF5TmV0U291bmQiLCJwbGF5UmVjb3JkZXJCZWdpbiIsInBsYXlSZWNvcmRlckVuZCIsInVwbG9hZFJlY29yZGVyIiwiYXBwIiwicGxheWVyTWdyIiwiZ2V0UmVjb3JkVG9rZW4iLCJkYXRhIiwidXBsb2FkUmVjb3JkIiwidXJsIiwibmFtZSIsInRva2VuIiwiZ2V0TG9jYXRpb25JbmZvIiwiY3JlYXRvclBsYXRmb3JtVHlwZSIsInBvcyIsInNwbGl0IiwieCIsInkiLCJvcGVuU2V0dGluZyIsImdldFBob25lRWxlY3RyaWMiLCJjaGVja0Fwa1VwZGF0ZSIsImhvdFZlcnNpb24iLCJ0aGlyZExvZ2luIiwicGhvbmVQbGF0RnJvbSIsImJ1byIsInRoaXJkUGF5IiwicHJpY2UiLCJvcmRlck5vIiwia2V5IiwiYmFpZHVQYXlJZCIsImFwcEtleSIsImFjY291bnRJZCIsInNpZ24iLCJpZCIsImxvZ2luT3V0IiwiZXhpdEdhbWUiLCJnZXROZXR3b3JrSW5mbyIsIm5ldHdvcmsiLCJpbnN0YWxsQXBrIiwiZ2V0QXBrRmlsZSIsImFwa0ZpbGUiLCJ1cGxvYWRBcGsiLCJvcGVuVXJsIiwib3BlbkluVXJsIiwiaXNEb3dubG9hZCIsInBsYXllcklkIiwiYWRJZCIsInN0b3BBcGtEb3duTG9hZCIsInNldFNjcmVlbkNoYW5nZSIsImp1ZGdlSWZJbnN0YWxsQXBrIiwicGFja2dhZU5hbWUiLCJqdWRnZSIsImRlbGVBbGxGaWxlcyIsImNvcHlUb0NsaXBib2FyZCIsImNvbnRlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUViQyxFQUFBQSxLQUZhLG1CQUVKLENBQ1IsQ0FIWTs7QUFJYjtBQUNKO0FBQ0E7QUFDSUMsRUFBQUEsZ0JBQWdCLEVBQUcsNEJBQVc7QUFDMUIsUUFBSUMsUUFBUSxHQUFJQyxHQUFHLENBQUNDLFVBQUosQ0FBZUMsZ0JBQWYsQ0FBZ0MsNEJBQWhDLEVBQTZELGtCQUE3RCxFQUFnRixzQkFBaEYsQ0FBaEI7QUFDQSxXQUFPSCxRQUFQO0FBQ0QsR0FWVTs7QUFZZDtBQUNIO0FBQ0E7QUFDSUksRUFBQUEsV0FBVyxFQUFFLHVCQUFZO0FBQ3JCLFFBQUlDLElBQUksR0FBR0osR0FBRyxDQUFDQyxVQUFKLENBQWVDLGdCQUFmLENBQWdDLDRCQUFoQyxFQUE2RCxhQUE3RCxFQUEyRSxzQkFBM0Us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QUFwSixDQUFaO0FBQ0EsV0FBT3lDLEtBQVA7QUFDSCxHQXBkWTs7QUFxZGI7QUFDSjtBQUNBO0FBQ0lDLEVBQUFBLFlBQVksRUFBRSx3QkFBVTtBQUNwQnRHLElBQUFBLEdBQUcsQ0FBQ0MsVUFBSixDQUFlQyxnQkFBZixDQUFnQyx3QkFBaEMsRUFBeUQsY0FBekQsRUFBd0UsS0FBeEU7QUFDSCxHQTFkWTtBQTJkYjtBQUNBcUcsRUFBQUEsZUFBZSxFQUFFLHlCQUFTQyxPQUFULEVBQWtCO0FBQy9CeEcsSUFBQUEsR0FBRyxDQUFDQyxVQUFKLENBQWVDLGdCQUFmLENBQWdDLDRCQUFoQyxFQUE2RCxRQUE3RCxFQUFzRSx1QkFBdEUsRUFBOEZzRyxPQUE5RjtBQUNIO0FBOWRZLENBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFxuICAgIHN0YXJ0ICgpIHtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOiOt+WPluW5s+WPsFxuICAgICAqL1xuICAgIGdldFBob25lUGxhdEZyb20gOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgbGV0IHBsYXRGcm9tID0gIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvQW5kcm9pZEhlbHBlclwiLFwiZ2V0UGhvbmVQbGF0RnJvbVwiLFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XG4gICAgICAgIHJldHVybiBwbGF0RnJvbTtcbiAgICAgIH0sXG5cbiAgIC8qKlxuICAgICog6I635Y+W5ri45oiP5ZCN56ew77yI6aKE55WZ5LiL5qyh5aSn54mI5pys5pu05paw5L2/55So5o6l5Y+j77yJXG4gICAgKi9cbiAgICBnZXRHYW1lTmFtZTogZnVuY3Rpb24gKCkgeyAgXG4gICAgICAgIHZhciBnYW1lID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9BbmRyb2lkSGVscGVyXCIsXCJnZXRHYW1lTmFtZVwiLFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XG4gICAgICAgIHJldHVybiBnYW1lO1xuICAgIH0sICBcbiAgICAvKipcbiAgICAgKiBhbmRyb2lk5pu+6L+b5YWlY3JlYXRvcuS4remXtOm7keWxj++8jGFuZHJvaWTlsYLlsZXnpLrlpKflm77vvIzosIPnlKjmlrnms5XliKDpmaTlpKflm75cbiAgICAgKi9cbiAgICBjbGVhcldlbGNvbWVJbWFnZSA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2xlYXIgd2VsY29tZSBpbWFnZS4uLlwiKTtcbiAgICAgICAgaWYoY2Muc3lzLm9zID09Y2Muc3lzLk9TX0FORFJPSUQpe1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsXCJyZW1vdmVMYXVuY2hJbWFnZVwiLFwiKClWXCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgIC8qKlxuICAgICog5o2i5aS05YOPXG4gICAgKi9cbiAgICByZXBsYWNlUGhvdG86IGZ1bmN0aW9uIChpbmZvLGNiKSB7ICBcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLnJlbW92ZUN1c3RvbUxpc3RlbmVycygndXBkYXRlSW1hZycpO1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ3VwZGF0ZUltYWcnLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGNiKGV2ZW50LmdldFVzZXJEYXRhKCkuYSk7XG4gICAgICAgIH0pO1xuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L1Bob3RvXCIsXCJnZXRMb2NhbEltYWdcIixcIihMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmc7XCIsaW5mbyk7XG4gICAgfSwgXG4gICAgLyoqXG4gICAgICog6I635Y+W5bmz5Y+waWRcbiAgICAgKi9cbiAgICBnZXRQaG9uZVBsYXRGcm9tVHlwZSA6IGZ1bmN0aW9uICgpe1xuICAgICAgICB2YXIgcGxhdEZyb21UeXBlPSAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9BbmRyb2lkSGVscGVyXCIsXCJnZXRQaG9uZVR5cGVcIixcIigpTGphdmEvbGFuZy9TdHJpbmc7XCIpO1xuICAgICAgICByZXR1cm4gIHBhcnNlSW50KHBsYXRGcm9tVHlwZSk7XG4gICAgICB9LFxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeeJiOacrFxuICAgICAqL1xuICAgIGdldFZlcnNpb24gOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgdmFyIHZlcnNpb249anNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9BbmRyb2lkSGVscGVyXCIsXCJnZXRMb2NhdGlvblZlcnNpb25cIixcIigpTGphdmEvbGFuZy9TdHJpbmc7XCIpO1xuICAgICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOiOt+WPluWtkOeJiOacrOWPt1xuICAgICAqL1xuICAgIGdldENoaWxkVmVyc2lvbiA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBjaGlsZFZlcnNpb249anNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9BbmRyb2lkSGVscGVyXCIsXCJnZXRDaGlsZFZlcnNpb25cIixcIigpTGphdmEvbGFuZy9TdHJpbmc7XCIpO1xuICAgICAgICByZXR1cm4gY2hpbGRWZXJzaW9uO1xuICAgIH0sXG4gICAgIC8qKlxuICAgICAqIOiOt+WPluaJi+acuuWei+WPt1xuICAgICAqL1xuICAgIGdldFBob25lTW9kZWwgOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgdmFyIG1vZGVsPWpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvQW5kcm9pZEhlbHBlclwiLFwiZ2V0UGhvbmVNb2RlbFwiLFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XG4gICAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOiOt+WPluaJi+acuuiuvuWkh+WPt1xuICAgICAqL1xuICAgIGdldFBob25lRGV2aWNlSUQgOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZGV2aWNlSWQ9anNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9BbmRyb2lkSGVscGVyXCIsXCJkZXZpY2VJRFwiLFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XG4gICAgICAgIHJldHVybiBkZXZpY2VJZDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOivpeaWueazleWPquS4uuiOt+WPluW6lOeUqOWuneeZu+W9lXRva2Vu5piv5ZCm5aSx5pWIXG4gICAgICovXG4gICAgZ2V0WXliSXNMb2dpbiA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBpc0xvZ2luPWpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvQW5kcm9pZEhlbHBlclwiLFwiaXNZeWJMb2dpblwiLFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XG4gICAgICAgIHJldHVybiBpc0xvZ2luO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICog6I635Y+W6YKA6K+356CBXG4gICAgICovXG4gICAgZ2V0SW52aXRlQ29kZSA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBpbnZpdGVDb2RlID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9BbmRyb2lkSGVscGVyXCIsXCJnZXRJbnZpdGVJbmZvcm1hdGlvblwiLFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XG4gICAgICAgIHJldHVybiBpbnZpdGVDb2RlO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICog6I635Y+W5oi/6Ze05Y+3XG4gICAgICovXG4gICAgZ2V0Um9vbU51bSA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciByb29tTnVtID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9BbmRyb2lkSGVscGVyXCIsXCJnZXRIb3VzZUluZm9ybWF0aW9uXCIsXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKTtcbiAgICAgICAgcmV0dXJuIHJvb21OdW07XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDlm5vnp43nmbvlvZXmqKHlvI8scXHnmbvpmYZcbiAgICAgKi9cbiAgICBxcUxvZ2luIDogZnVuY3Rpb24gKGNiKSB7ICBcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLnJlbW92ZUN1c3RvbUxpc3RlbmVycygncXFMb2dpblJlc3VsdCcpO1xuICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZEN1c3RvbUxpc3RlbmVyKCdxcUxvZ2luUmVzdWx0JyxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBjYihldmVudC5nZXRVc2VyRGF0YSgpLmEpO1xuICAgICAgICB9KTtcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9BbmRyb2lkSGVscGVyXCIsXCJxcUxvZ2luXCIsXCIoKVZcIik7XG4gICAgfSwgIFxuXG4gICAgLyoqXG4gICAgICog5Zub56eN55m75b2V5qih5byPLOW+ruS/oeeZu+mZhlxuICAgICAqL1xuICAgIHdlY2hhdExvZ2luIDogZnVuY3Rpb24oY2IpeyAgICAgXG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ3dlY2hhdExvZ2luUmVzdWx0Jyk7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcignd2VjaGF0TG9naW5SZXN1bHQnLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGNiKGV2ZW50LmdldFVzZXJEYXRhKCkuYSk7XG4gICAgICAgIH0pO1xuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L0FuZHJvaWRIZWxwZXJcIixcIndlY2hhdExvZ2luXCIsXCIoKVZcIik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOWbm+enjeeZu+W9leaooeW8jyzorr7lpIfnmbvpmYZcbiAgICAgKi9cbiAgICBkZXZpY2VMb2dpbiA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2ZXJzaW9uPWpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvQW5kcm9pZEhlbHBlclwiLFwiZGV2aWNlTG9naW5cIixcIihMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmc7XCIsXCJcIik7XG4gICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDkuInnp43mlK/ku5jvvIzlvq7kv6HmlK/ku5hcbiAgICAgKi9cbiAgICAgd2VjaGF0UGF5IDogZnVuY3Rpb24ocGF5bWVudCxjYil7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ3dlY2hhdFBheVJlc3VsdCcpO1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ3dlY2hhdFBheVJlc3VsdCcsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgY2IoZXZlbnQuZ2V0VXNlckRhdGEoKS5hKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvV2VjaGF0UGF5XCIsXCJ3ZWNoYXRQYXlcIixcIihMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmc7XCIscGF5bWVudCk7XG4gICAgIH0sXG4gICAgLyoqXG4gICAgICog5LiJ56eN5pSv5LuY77yM5pSv5LuY5a6d5pSv5LuYXG4gICAgICovXG4gICAgIGFsaXBheVBheSA6IGZ1bmN0aW9uKHBheW1lbnQsY2Ipe1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlQ3VzdG9tTGlzdGVuZXJzKCdhbGlwYXlQYXlSZXN1bHQnKTtcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZEN1c3RvbUxpc3RlbmVyKCdhbGlwYXlQYXlSZXN1bHQnLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGNiKGV2ZW50LmdldFVzZXJEYXRhKCkuYSk7XG4gICAgICAgIH0pO1xuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L0FsaXBheVBheVwiLFwiYWxpcGF5UGF5XCIsXCIoTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvU3RyaW5nO1wiLHBheW1lbnQpO1xuICAgIH0sXG5cbiAgICBcblxuICAgIC8qKlxuICAgICAqIOWIhuS6qyB0eXBlIDow77ya5aW95Y+L5paH5a2X5YiG5Lqr77yMMu+8muaci+WPi+WciOWIhuS6q++8jDE65pyL5Y+L5ZyI5Zu+54mH5YiG5Lqr77yMM+WlveWPi+WbvueJh+WIhuS6q1xuICAgICAqL1xuICAgICB3ZWNoYXRTaGFyZSA6IGZ1bmN0aW9uKHBheW1lbnQsY2IpeyAgXG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ3NoYXJlV2VjaGF0UmVzdWx0Jyk7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcignc2hhcmVXZWNoYXRSZXN1bHQnLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGNiKE51bWJlcihldmVudC5nZXRVc2VyRGF0YSgpLmEpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvV2VDaGF0XCIsXCJ1c2VXZWlYaW5cIixcIihMamF2YS9sYW5nL1N0cmluZztJKVZcIixwYXltZW50LnN0cixwYXltZW50LnR5cGUpO1xuICAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5omT5byA5b6u5L+hXG4gICAgICovXG4gICAgIG9wZW5XZWNoYXQgOiBmdW5jdGlvbigpe1xuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L0FuZHJvaWRIZWxwZXJcIixcIm9wZW5XZWNoYXRcIixcIigpVlwiKTtcbiAgICAgfSxcblxuICAgIC8qKlxuICAgICAqIOaJk+W8gHFxXG4gICAgICovXG4gICAgIG9wZW5RUSA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvQW5kcm9pZEhlbHBlclwiLFwicXFIZWxwXCIsXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIixcIjI5ODM4MTY1NDdcIik7XG4gICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDmkq3mlL7nvZHnu5zpn7PkuZBcbiAgICAgKi8gXG4gICAgcGxheU5ldFNvdW5kIDogZnVuY3Rpb24oaW5mbyxjYil7Ly9pbmZvOnVybCDlnLDlnYBcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLnJlbW92ZUN1c3RvbUxpc3RlbmVycygncGxheU5ldFNvdW5kT3ZlcicpO1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ3BsYXlOZXRTb3VuZE92ZXInLGZ1bmN0aW9uKGV2ZW50KXsvL+ebkeWQrOaSreaUvuWujOavlei/lOWbnlxuICAgICAgICAgICAgY2IoZXZlbnQuZ2V0VXNlckRhdGEoKS5hKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvU291bmRJbmZvXCIsXCJwbGF5TmV0U291bmRcIixcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLGluZm8pO1xuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICog5byA5aeL5b2V6Z+zXG4gICAgICovIFxuICAgIHBsYXlSZWNvcmRlckJlZ2luIDogZnVuY3Rpb24oKXtcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9Tb3VuZEluZm9cIixcInBsYXlSZWNvcmRlckJlZ2luXCIsXCIoKVZcIik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOW9lemfs+e7k+adn1xuICAgICAqLyBcbiAgICBwbGF5UmVjb3JkZXJFbmQgOiBmdW5jdGlvbigpey8v5Lyg5YWl5LiD54mb572R55uY55Sf5oiQ5Zyw5Z2A6ZyA6KaB55qEdXJs5YmN57yA77yMbmFtZeaWh+S7tuWQje+8jHRva2Vu44CCXG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvU291bmRJbmZvXCIsXCJwbGF5UmVjb3JkZXJFbmRcIiwgXCIoKVZcIik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOS4iuS8oOW9lemfs1xuICAgICAqLyBcbiAgICB1cGxvYWRSZWNvcmRlciA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ3BsYXlTb3VuZFVybCcpO1xuICAgICAgICBhcHAucGxheWVyTWdyLmdldFJlY29yZFRva2VuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ3BsYXlTb3VuZFVybCcsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgICAgIGFwcC5wbGF5ZXJNZ3IudXBsb2FkUmVjb3JkKGV2ZW50LmdldFVzZXJEYXRhKCkuYSxmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L1NvdW5kSW5mb1wiLFwidXBsb2FkUmVjb3JkZXJcIixcbiAgICAgICAgICAgIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsZGF0YS51cmwsZGF0YS5uYW1lLGRhdGEudG9rZW4pO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5Zyw55CG5L2N572uXG4gICAgICovIFxuICAgIGdldExvY2F0aW9uSW5mbyA6IGZ1bmN0aW9uKGNiKXsvL+e7j+e6rOW6puS7pSMjI+WIhuW8gFxuICAgICAgICBpZiAoYXBwLmNyZWF0b3JQbGF0Zm9ybVR5cGUgPT0xIHx8YXBwLmNyZWF0b3JQbGF0Zm9ybVR5cGUgPT0yKSB7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlQ3VzdG9tTGlzdGVuZXJzKCdiYWlEdUxvY2F0aW9uUmVzdWx0Jyk7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ2JhaUR1TG9jYXRpb25SZXN1bHQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gZXZlbnQuZ2V0VXNlckRhdGEoKS5hLnNwbGl0KCcjIyMnKTsgLy8g5YmN6Z2i57K+5bqm77yM5ZCO6Z2i57qs5bqmXG4gICAgICAgICAgICAgICAgY2IoeyB4OiBwb3NbMF0sIHk6IHBvc1sxXSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9NYXBcIiwgXCJnZXRMb2NhdGlvbkluZm9cIixcbiAgICAgICAgICAgICAgICBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBcImNvY29zXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBvcyA9ICcxMDguODgzNDUyIyMjMzQuMjMyNzAyJy5zcGxpdCgnIyMjJyk7IC8vIOWJjemdoueyvuW6pu+8jOWQjumdoue6rOW6plxuICAgICAgICAgICAgY2IoeyB4OiBwb3NbMF0sIHk6IHBvc1sxXSB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICog5omT5byA5p2D6ZmQ6K6+572uXG4gICAgICovIFxuICAgIG9wZW5TZXR0aW5nIDogZnVuY3Rpb24oKXtcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9BbmRyb2lkSGVscGVyXCIsXCJvcGVuU2V0dGluZ1wiLFxuICAgICAgICAgICAgXCIoKVZcIik7XG4gICAgfSxcbiAgICAgLyoqXG4gICAgICog6I635Y+W5omL5py655S16YePXG4gICAgICovIFxuICAgIGdldFBob25lRWxlY3RyaWMgOiBmdW5jdGlvbihjYil7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ2dldEVsZWN0cmljJyk7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcignZ2V0RWxlY3RyaWMnLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGNiKGV2ZW50LmdldFVzZXJEYXRhKCkuYSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICog5qOA5rWL5aSn54mI5pys5pu05pawIFxuICAgICAqL1xuICAgIGNoZWNrQXBrVXBkYXRlIDogZnVuY3Rpb24oaG90VmVyc2lvbixjaGlsZFZlcnNpb24sY2Ipe1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlQ3VzdG9tTGlzdGVuZXJzKCdoYXZpbmduTmV3VmVyc2lvbicpO1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ2hhdmluZ25OZXdWZXJzaW9uJyxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBjYihldmVudC5nZXRVc2VyRGF0YSgpLmEpO1xuICAgICAgICB9KTtcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9kb3V5ZXIvaGVscGVyL1ZlcnNpb25NYW5hZ2VyXCIsXCJjaGVja3VwVmVyc2lvblwiLFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIsaG90VmVyc2lvbixjaGlsZFZlcnNpb24pO1xuICAgIH0sXG4gIC8qKlxuICAgICAqIOWbm+enjeeZu+W9leaooeW8jyznrKzkuInmlrnnmbvpmYZcbiAgICAgKi9cbiAgICB0aGlyZExvZ2luIDogZnVuY3Rpb24oaW5mbyxjYil7Ly9pbmZv5Y+q55So5ZyoeXli5bmz5Y+wXG4gICAgICAgIGlmKGFwcC5waG9uZVBsYXRGcm9tID09XCJodWF3ZWlcIil7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlQ3VzdG9tTGlzdGVuZXJzKCdhY2Nlc3NUb2tlbicpO1xuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZEN1c3RvbUxpc3RlbmVyKCdhY2Nlc3NUb2tlbicsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgICAgIGNiKGV2ZW50LmdldFVzZXJEYXRhKCkuYSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBidW8gPSBcIk1JSUNjd0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQWwwd2dnSlpBZ0VBQW9HQkFJeW85OEZGNGJJRzBteE5HazJiN3NvL1BCU2FqeFlIWVBiMmxaUWo3ZWJnNk9ESXErNmhGTzJoZHFRK2pPVGxRVmxWcWVBcUpuY1RWQnNNUG0zcyt2cm5wNDJScXpGTVlvM2I2MjE0VlFmamlQampGWG9YVVlSVTY2dmZxazVoamF6NFRNTkowQlMrUGNZQjNZbjhkZ3JoU1RyVlJZZmlZT0ViVWp5NkVLTURBZ01CQUFFQ2YzM1NwODA3dGFpS2NiQnZTQmdrWkhhR0dqaFVDYXFxN3hIN2dkSUNVYzAxWXh1d1pod1ArNmlWeG9zbGFPTllNQnk1aER3QmVHY0w0ekJPdzRtUmN1K2ZsSXdOUExTN2daM1VNMVh3bmxJTjZlMklqUVNzWWJJZFhmUS80WjRNcWh5K3Yxd3YrSWpCSVIvNHQyaGF4cktKS2dWbFNFZHMzdEhCUVpla28wRUNRUUQxTXpUSHR3SFpvZVA4VXRDeFVFRThjWW9OWFJnNWxYNjloeDd5MTRZNGMvL3Rrc1NXcmUyRURrTUR6SUNreW5kUXJOd1kzOHhyaWxUMXlsTzVURWNoQWtFQWt0c0E0c241MHFldCtHVUJPMVQ1VXZ5ZmhkQmNCcVplZUFWenBGZjJFbTFXZ1dHUUdaeFE1Wm5ZOVV6NnV2Vk15Y2RZaFVmcG9BaVVaQXlOY29rNW93SkFYTmZCd1dsVEl3UEFucmNBM0ZMR0VNdncrUFJxQ3N2SFRKNVFJcVZtNWhOT01iZWtCbVhmREdTV0RXY3V3cmNEREtJWFNMZmM0RTlsc2hlbE1nRm00UUpBTHdBMnZWN2xQUDE3bVlkQ0tLb2VqZWZhYW1wd09aU2ZvWXdsSWRFaEtXNmpCQStrbmYzQWltdDkyNnlDaHJtaGxPYmZOdkQ0SGNjQkx6QXhTUm9RUHdKQUxRYlBPTTZsckhsMnFDUCtTb0pJMHhobUlGZXZrbDE4MVlZZVh4KzNoazFYL2ZTTC9ZOW1waGFOY2JPR2MwcUFXVmhXa2NqUGVYb0U5cnpEcmpGU213PT1cIjtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20vaGVscGVyL2h1YXdlaS9zZGsvSHVhV2VpUGF5XCIsXCJodWFXZWlJbml0XCIsXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIixidW8pO1xuICAgICAgICB9ZWxzZSBpZihhcHAucGhvbmVQbGF0RnJvbSA9PVwib3Bwb1wiKXtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ09sb2dpblJlc3VsdCcpO1xuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZEN1c3RvbUxpc3RlbmVyKCdPbG9naW5SZXN1bHQnLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICBjYihldmVudC5nZXRVc2VyRGF0YSgpLmEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L1BheU9QUE9cIixcIk9sb2dpblwiLFwiKClWXCIpO1xuICAgICAgICB9ZWxzZSBpZihhcHAucGhvbmVQbGF0RnJvbSA9PVwidGVsZWNvbVwiKXtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ2RpYW54aW5Mb2dpblJlc3VsdCcpO1xuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZEN1c3RvbUxpc3RlbmVyKCdkaWFueGluTG9naW5SZXN1bHQnLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICBjYihldmVudC5nZXRVc2VyRGF0YSgpLmEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2hlbHBlci9kaWFueGluL3Nkay9EaWFuWGluU2RrXCIsXCJnb3RvTG9naW5cIixcIigpVlwiKTtcbiAgICAgICAgICAgXG4gICAgICAgIH1lbHNlIGlmKGFwcC5waG9uZVBsYXRGcm9tID09XCJ4aWFvbWlcInx8YXBwLnBob25lUGxhdEZyb20gPT1cIm1laXp1XCIpe1xuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLnJlbW92ZUN1c3RvbUxpc3RlbmVycygnWWlTREtMb2dpbkNhbGxCYWNrJyk7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ1lpU0RLTG9naW5DYWxsQmFjaycsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgICAgIGNiKGV2ZW50LmdldFVzZXJEYXRhKCkuYSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20vaGVscGVyL3lpamllL3Nkay9ZaXNka1wiLFwiWWlTREtJbml0XCIsXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwxKTtcbiAgICAgICAgfWVsc2UgaWYoYXBwLnBob25lUGxhdEZyb20gPT1cInl5YlwiKXtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ3l5YkxvZ2luUmVzdWx0Jyk7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ3l5YkxvZ2luUmVzdWx0JyxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgY2IoZXZlbnQuZ2V0VXNlckRhdGEoKS5hKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9oZWxwZXIveXliL3Nkay9ZWUJoZWxwZXJcIixcImdvdG9Mb2dpblwiLFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsaW5mbyk7XG4gICAgICAgIH1lbHNlIGlmKGFwcC5waG9uZVBsYXRGcm9tID09XCJ1Y1wiKXtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ2xvZ2luUmVzdWx0Jyk7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ2xvZ2luUmVzdWx0JyxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgY2IoZXZlbnQuZ2V0VXNlckRhdGEoKS5hKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9oZWxwZXIvdWMvc2RrL1VjU2RrQ29kZVwiLFwidWNJbml0XCIsXCIoKVZcIik7XG4gICAgICAgIH1lbHNlIGlmKGFwcC5waG9uZVBsYXRGcm9tID09XCIzNjBcIil7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlQ3VzdG9tTGlzdGVuZXJzKCdsb2dpbkNhbGxCYWNrJyk7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ2xvZ2luQ2FsbEJhY2snLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICBjYihldmVudC5nZXRVc2VyRGF0YSgpLmEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2hlbHBlci9xMzYwL3Nkay9TZGszNjBcIixcImxvZ2luMzYwXCIsXCIoKVZcIik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5LiJ56eN5pSv5LuY77yM56ys5LiJ5pa55pSv5LuYXG4gICAgICovXG4gICAgdGhpcmRQYXkgOiBmdW5jdGlvbihwYXltZW50LGNiKXtcbiAgICAgICAgaWYoYXBwLnBob25lUGxhdEZyb20gPT1cImh1YXdlaVwiKXtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ2h1YVdlaVBheVJlc3VsdCcpO1xuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZEN1c3RvbUxpc3RlbmVyKCdodWFXZWlQYXlSZXN1bHQnLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICBjYihldmVudC5nZXRVc2VyRGF0YSgpLmEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2hlbHBlci9odWF3ZWkvc2RrL0h1YVdlaVBheVwiLFwiaHVhV2VpUGF5XCIsXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIixwYXltZW50Lm5hbWUscGF5bWVudC5wcmljZSxwYXltZW50Lm5hbWUscGF5bWVudC5vcmRlck5vLHBheW1lbnQua2V5LHBheW1lbnQudXJsKTtcbiAgICAgICAgfWVsc2UgaWYoYXBwLnBob25lUGxhdEZyb20gPT1cIm9wcG9cIil7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlQ3VzdG9tTGlzdGVuZXJzKCdPcGF5UmVzdWx0Jyk7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ09wYXlSZXN1bHQnLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICBjYihldmVudC5nZXRVc2VyRGF0YSgpLmEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L1BheU9QUE9cIixcIk9wYXlcIixcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLHBheW1lbnQubmFtZSxwYXltZW50LnVybCxwYXltZW50LnByaWNlLHBheW1lbnQub3JkZXJObyk7XG4gICAgICAgIH1lbHNlIGlmKGFwcC5waG9uZVBsYXRGcm9tID09XCJ2aXZvXCIpe1xuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLnJlbW92ZUN1c3RvbUxpc3RlbmVycygnVlBheVJlc3VsdCcpO1xuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZEN1c3RvbUxpc3RlbmVyKCdWUGF5UmVzdWx0JyxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgY2IoZXZlbnQuZ2V0VXNlckRhdGEoKS5hKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9oZWxwZXIvdml2by9zZGsvVml2b1NES1wiLFwiVlBheVwiLFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIscGF5bWVudC5vcmRlck5vLHBheW1lbnQudXJsLHBheW1lbnQubmFtZSxwYXltZW50LnByaWNlKTtcbiAgICAgICAgfWVsc2UgaWYoYXBwLnBob25lUGxhdEZyb20gPT1cInhpYW9taVwifHxhcHAucGhvbmVQbGF0RnJvbSA9PVwibWVpenVcIil7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlQ3VzdG9tTGlzdGVuZXJzKCdZaVNES1BheVJlc3VsdCcpO1xuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZEN1c3RvbUxpc3RlbmVyKCdZaVNES1BheVJlc3VsdCcsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgICAgIGNiKGV2ZW50LmdldFVzZXJEYXRhKCkuYSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20vaGVscGVyL3lpamllL3Nkay9ZaXNka1wiLFwiWWlTREtQYXlcIixcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLHBheW1lbnQubmFtZSxwYXltZW50LnByaWNlLHBheW1lbnQub3JkZXJObyxwYXltZW50LnVybCk7XG4gICAgICAgIH1lbHNlIGlmKGFwcC5waG9uZVBsYXRGcm9tID09XCJ5eWJcIil7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlQ3VzdG9tTGlzdGVuZXJzKCd5eWJQYXlSZXN1bHQnKTtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcigneXliUGF5UmVzdWx0JyxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgY2IoZXZlbnQuZ2V0VXNlckRhdGEoKS5hKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9oZWxwZXIveXliL3Nkay9ZWUJoZWxwZXJcIixcImdvdG9QYXlcIixcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLHBheW1lbnQucHJpY2UpO1xuICAgICAgICB9ZWxzZSBpZihhcHAucGhvbmVQbGF0RnJvbSA9PVwidGVsZWNvbVwiKXtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ2RpYW54aW5QYXlSZXN1bHQnKTtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcignZGlhbnhpblBheVJlc3VsdCcsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgICAgIGNiKGV2ZW50LmdldFVzZXJEYXRhKCkuYSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20vaGVscGVyL2RpYW54aW4vc2RrL0RpYW5YaW5TZGtcIixcIkRpYW5YaW5QYXlcIixcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLHBheW1lbnQucHJpY2UscGF5bWVudC5vcmRlck5vLHBheW1lbnQubmFtZSk7XG4gICAgICAgIH1lbHNlIGlmKGFwcC5waG9uZVBsYXRGcm9tID09XCJiYWlkdVwiKXtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ2JhaWR1UmVzdWx0Jyk7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ2JhaWR1UmVzdWx0JyxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgY2IoZXZlbnQuZ2V0VXNlckRhdGEoKS5hKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9oZWxwZXIvYmFpZHUvc2RrL0JhaWR1U2RrXCIsXCJwYXlcIixcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLHBheW1lbnQuYmFpZHVQYXlJZCxwYXltZW50LnByaWNlLHBheW1lbnQubmFtZSxwYXltZW50Lm9yZGVyTm8pO1xuICAgICAgICB9ZWxzZSBpZihhcHAucGhvbmVQbGF0RnJvbSA9PVwidWNcIiYmYXBwLmFwcEtleT09XCJ3a1wiKXtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ3BheVJlc3VsdCcpO1xuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZEN1c3RvbUxpc3RlbmVyKCdwYXlSZXN1bHQnLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICBjYihldmVudC5nZXRVc2VyRGF0YSgpLmEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2hlbHBlci91Yy9zZGsvVWNTZGtDb2RlXCIsXCJ1Y1Nka1BheVwiLFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCIscGF5bWVudC5wcmljZSxwYXltZW50Lm9yZGVyTm8scGF5bWVudC51cmwscGF5bWVudC5hY2NvdW50SWQscGF5bWVudC5zaWduKTtcbiAgICAgICAgfWVsc2UgaWYoYXBwLnBob25lUGxhdEZyb20gPT1cInVjXCImJmFwcC5hcHBLZXk9PVwic2RcIil7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlQ3VzdG9tTGlzdGVuZXJzKCdwYXlSZXN1bHQnKTtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcigncGF5UmVzdWx0JyxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgY2IoZXZlbnQuZ2V0VXNlckRhdGEoKS5hKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9oZWxwZXIvdWMvc2RrL1VjU2RrQ29kZVwiLFwidWNTZGtQYXlcIixcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLHBheW1lbnQubmFtZSxwYXltZW50LnByaWNlLHBheW1lbnQub3JkZXJObyxwYXltZW50LnVybCk7XG4gICAgICAgIH1lbHNlIGlmKGFwcC5waG9uZVBsYXRGcm9tID09XCIzNjBcIil7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlQ3VzdG9tTGlzdGVuZXJzKCdzZGszNjBQYXlSZXN1bHQnKTtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcignc2RrMzYwUGF5UmVzdWx0JyxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgY2IoZXZlbnQuZ2V0VXNlckRhdGEoKS5hKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9oZWxwZXIvcTM2MC9zZGsvU2RrMzYwXCIsXCJwYXkzNjBcIixcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLHBheW1lbnQucHJpY2UscGF5bWVudC5uYW1lLHBheW1lbnQuaWQscGF5bWVudC5vcmRlck5vLHBheW1lbnQudXJsKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAvKipcbiAgICAgKiDliIfmjaLotKblj7dcbiAgICAgKi9cbiAgICBsb2dpbk91dCA6IGZ1bmN0aW9uKGNiKXtcbiAgICAgICAgaWYoYXBwLnBob25lUGxhdEZyb20gPT1cInl5YlwiKXtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ3l5YlNES0xvZ2luT3V0Q2FsbEJhY2snKTtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcigneXliU0RLTG9naW5PdXRDYWxsQmFjaycsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgICAgICAgICBjYihldmVudC5nZXRVc2VyRGF0YSgpLmEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2hlbHBlci95eWIvc2RrL1lZQmhlbHBlclwiLFwiQ2hhbmdlQWNjb3VudFwiLFwiKClWXCIpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5yZW1vdmVDdXN0b21MaXN0ZW5lcnMoJ2xvZ091dE9rJyk7XG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ2xvZ091dE9rJyxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgICAgIGNiKGV2ZW50LmdldFVzZXJEYXRhKCkuYSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvQW5kcm9pZEhlbHBlclwiLFwibG9naW5PdXRcIixcIigpVlwiKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICog6YCA5Ye65ri45oiPXG4gICAgICovXG4gICAgZXhpdEdhbWUgOiBmdW5jdGlvbigpe1xuICAgICAgICBpZihhcHAucGhvbmVQbGF0RnJvbSA9PVwiaHVhd2VpXCIpey8v6LCD55So5ri45oiP6YCA5Ye6XG4gICAgICAgIH1lbHNlIGlmKGFwcC5waG9uZVBsYXRGcm9tID09XCJvcHBvXCIpe1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9QYXlPUFBPXCIsXCJPZXhpdFwiLFwiKClWXCIpO1xuICAgICAgICB9ZWxzZSBpZihhcHAucGhvbmVQbGF0RnJvbSA9PSBcInhpYW9taVwifHxhcHAucGhvbmVQbGF0RnJvbSA9PSBcIm1laXp1XCJ8fGFwcC5waG9uZVBsYXRGcm9tID09IFwieXliXCIpe1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9oZWxwZXIveWlqaWUvc2RrL1lpc2RrXCIsXCJZaVNES0V4aXRcIixcIigpVlwiKTtcbiAgICAgICAgfWVsc2UgaWYoYXBwLnBob25lUGxhdEZyb20gPT0gXCJ2aXZvXCIpe1xuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9oZWxwZXIvdml2by9zZGsvVml2b1NES1wiLFwidml2b0xvZ2luT3V0XCIsXCIoKVZcIik7XG4gICAgICAgIH1lbHNlIGlmKGFwcC5waG9uZVBsYXRGcm9tID09IFwidGVsZWNvbVwiKXtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20vaGVscGVyL2RpYW54aW4vc2RrL0RpYW5YaW5TZGtcIixcImRpYW54aW5TZGtFeGl0XCIsXCIoKVZcIik7XG4gICAgICAgIH1lbHNlIGlmKGFwcC5waG9uZVBsYXRGcm9tID09IFwiYmFpZHVcIil7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2hlbHBlci9iYWlkdS9zZGsvQmFpZHVTZGtcIixcInF1aXRCYWlEdVwiLFwiKClWXCIpO1xuICAgICAgICB9ZWxzZSBpZihhcHAucGhvbmVQbGF0RnJvbSA9PVwidWNcIil7XG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2hlbHBlci91Yy9zZGsvVWNTZGtDb2RlXCIsXCJ1Y1Nka0V4aXRcIixcIigpVlwiKTtcbiAgICAgICAgfWVsc2UgaWYoYXBwLnBob25lUGxhdEZyb20gPT1cIjM2MFwiKXtcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20vaGVscGVyL3EzNjAvc2RrL1NkazM2MFwiLFwicXVpdDM2MFwiLFwiKClWXCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDnm5HlkKznvZHnu5xcbiAgICAgKi9cbiAgICBnZXROZXR3b3JrSW5mbyA6IGZ1bmN0aW9uICgpe1xuICAgICAgICB2YXIgbmV0d29yayA9ICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L05ldFV0aWxcIixcImNoZWNrTmV0d29ya0luZm9DcmVhdG9yXCIsXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKTtcbiAgICAgICAgcmV0dXJuIG5ldHdvcms7XG4gICAgICB9LFxuXG4gICAgLyoqXG4gICAgICog6LCD55SoYXBw5omT5byA5Yqf6IO9XG4gICAgICovXG4gICAgaW5zdGFsbEFwayA6IGZ1bmN0aW9uKGluZm8pey8vZGF0YVxuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L0FuZHJvaWRIZWxwZXJcIixcImluc3RhbGxBcGtcIixcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLGluZm8pO1xuICAgICB9LFxuXG4gICAgIC8qKlxuICAgICAqIOiOt+WPluaJk+W8gOacrOWcsGFwa+i3r+W+hFxuICAgICAqL1xuICAgIGdldEFwa0ZpbGUgOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgYXBrRmlsZT1qc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L0FuZHJvaWRIZWxwZXJcIixcImdldEFwa0ZpbGVcIixcIigpTGphdmEvbGFuZy9TdHJpbmc7XCIpO1xuICAgICAgICByZXR1cm4gYXBrRmlsZTtcbiAgICB9LFxuXG4gICAgLyoq6LCD55SoYW5yb2lk5bGC5LiL6L29ICovXG4gICAgdXBsb2FkQXBrIDogZnVuY3Rpb24odXJsLG5hbWUsY2Ipe1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIucmVtb3ZlQ3VzdG9tTGlzdGVuZXJzKCd1cGxvYWRBcGtQcm9ncmVzcycpO1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoJ3VwbG9hZEFwa1Byb2dyZXNzJyxmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBjYihldmVudC5nZXRVc2VyRGF0YSgpLmEpO1xuICAgICAgICB9KTtcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9VcGxvYWRBcGtcIixcInVwbG9hZEFwa0Zyb21DcmVhdG9yXCIsXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIix1cmwsbmFtZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOiwg+eUqOesrOS4ieaWuea1j+iniOWZqFxuICAgICAqL1xuICAgIG9wZW5VcmwgOiBmdW5jdGlvbih1cmwpe1xuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L0FuZHJvaWRIZWxwZXJcIixcIm9wZW5VcmxcIixcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLHVybCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDosIPnlKhhcHDlhoXnva7mtY/op4jlmagg5Lyg5YWlIHVybDrmiZPlvIDlnLDlnYDvvIx0eXBlOuaoquerlueJjOaYvuekuigxOmxhbmRzY2FwZSAsMjpwb3J0cmFpdCnvvIxuYW1lIDrmoIflpLTlkI1cbiAgICAgKi9cbiAgICBvcGVuSW5VcmwgOiBmdW5jdGlvbih1cmwsdHlwZSxuYW1lLGlzRG93bmxvYWQscGxheWVySWQsYWRJZCl7XG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvQW5kcm9pZEhlbHBlclwiLFwib3BlbkluVXJsXCIsXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIix1cmwsdHlwZSxuYW1lLGlzRG93bmxvYWQscGxheWVySWQsYWRJZCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDlgZzmraLkuIvovb1cbiAgICAgKi9cbiAgICBzdG9wQXBrRG93bkxvYWQgOiBmdW5jdGlvbigpe1xuICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L1VwbG9hZEFwa1wiLFwic3RvcFVwTG9hZFwiLFwiKClWXCIpO1xuICAgIH0sXG4gICAgc2V0U2NyZWVuQ2hhbmdlIDogZnVuY3Rpb24odHlwZSl7Ly90eXBlOuaoquerlueJjOaYvuekuigxOmxhbmRzY2FwZSAsMjpwb3J0cmFpdClcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9BbmRyb2lkSGVscGVyXCIsXCJzZXRTY3JlZW5DaGFuZ2VcIixcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLHVybCk7XG4gICAgfSxcbiAgICAvKirosIPnlKhhbnJvaWTlsYLmmK/lkKblronoo4UgKi9cbiAgICBqdWRnZUlmSW5zdGFsbEFwayA6IGZ1bmN0aW9uKHBhY2tnYWVOYW1lLG5hbWUpey8vIFwidHJ1ZVwiIFwiZmFsc2VcIlxuICAgICAgICB2YXIganVkZ2UgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L1VwbG9hZEFwa1wiLFwianVkZ2VJZkluc3RhbGxBcGtcIixcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmc7XCIscGFja2dhZU5hbWUsbmFtZSk7XG4gICAgICAgIHJldHVybiBqdWRnZTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOWkh+acieaOpeWPoyDliKDpmaTkuIvovb3nmoTmiYDmnInmlofku7ZcbiAgICAgKi9cbiAgICBkZWxlQWxsRmlsZXMgOmZ1bmN0aW9uKCl7XG4gICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvVXBsb2FkQXBrXCIsXCJkZWxlQWxsRmlsZXNcIixcIigpVlwiKTtcbiAgICB9LFxuICAgIC8vZnV6aGlcbiAgICBjb3B5VG9DbGlwYm9hcmQ6IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9BbmRyb2lkSGVscGVyXCIsXCJxcENvcHlcIixcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLGNvbnRlbnQpO1xuICAgIH0sXG59XG5cblxuIl19