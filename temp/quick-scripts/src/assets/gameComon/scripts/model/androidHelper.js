"use strict";
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