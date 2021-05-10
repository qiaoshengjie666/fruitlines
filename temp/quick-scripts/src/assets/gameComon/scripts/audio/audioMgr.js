"use strict";
cc._RF.push(module, 'cc057iIkENNC6PSrpbMmYVg', 'audioMgr');
// gameComon/scripts/audio/audioMgr.js

"use strict";

var AudioMgr = cc.Class({
  properties: {
    bgmAudioID: -1,
    audioId: 1,
    gameMusicAudio: true,
    bgUrl: '',
    bgLoop: false
  },
  // use this for initialization
  ctor: function ctor() {
    cc.sys.localStorage.setItem("gameMusic", 1);
    var gMusic = cc.sys.localStorage.getItem("gameMusic");

    if (gMusic == null || gMusic == '') {
      this.gameMusicAudio = false;
    } else {
      this.gameMusicAudio = true;
    }

    cc.game.on(cc.game.EVENT_HIDE, function () {
      cc.audioEngine.pauseAll();
    });
    cc.game.on(cc.game.EVENT_SHOW, function () {
      cc.audioEngine.resumeAll();
    });
  },
  getUrl: function getUrl(url, cb) {
    if (!this.gameMusicAudio) {
      return;
    }

    cc.assetManager.loadBundle('comSound', function (err, bundle) {
      bundle.load(url, cc.AudioClip, function (err, clip) {
        if (err) {
          return;
        }

        cb(clip);
      }.bind(this));
    }.bind(this));
  },
  getMusicStatus: function getMusicStatus(cb) {
    var gMusic = cc.sys.localStorage.getItem("gameMusic");

    if (gMusic == null || gMusic == '') {
      cb(false);
    } else {
      cb(true);
    }
  },
  setMusicOnOff: function setMusicOnOff(isOpen) {
    if (isOpen) {
      //开
      this.gameMusicAudio = true;
      cc.sys.localStorage.setItem("gameMusic", 1);

      if (this.bgUrl) {
        this.playBGM(this.bgUrl, this.bgLoop);
      }
    } else {
      this.stopAll();
      this.gameMusicAudio = false;
      cc.sys.localStorage.removeItem("gameMusic");
    }
  },
  playBGM: function playBGM(url, isLoop) {
    this.bgUrl = url;
    this.bgLoop = isLoop;
    this.getUrl(url, function (audioUrl) {
      if (audioUrl) {
        cc.audioEngine.stop(this.bgmAudioID);
        this.bgmAudioID = cc.audioEngine.playMusic(audioUrl, isLoop);
      }

      cc.log("this.bgmAudioID=====" + this.bgmAudioID);
    }.bind(this));
  },
  playSFX: function playSFX(url) {
    this.getUrl(url, function (audioUrl) {
      this.audioId = cc.audioEngine.play(audioUrl, false, 1);
    }.bind(this));
  },
  pauseBGM: function pauseBGM() {
    cc.log("pauseBGM");
    cc.audioEngine.pause(this.bgmAudioID);
  },
  resumeBGM: function resumeBGM() {
    if (this.gameMusicAudio) {
      cc.log("resumeBGM");
      cc.audioEngine.resume(this.bgmAudioID);
    }
  },
  pauseAll: function pauseAll() {
    cc.audioEngine.pauseAll();
  },
  resumeAll: function resumeAll() {
    cc.audioEngine.resumeAll();
  },
  stopAll: function stopAll() {
    cc.audioEngine.stopAll();
  }
});
module.exports = AudioMgr;

cc._RF.pop();