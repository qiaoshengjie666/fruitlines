module.exports = {
    format: function (f) {
        if (typeof f !== 'string') {
            var objects = [];
            for (var i = 0; i < arguments.length; i++) {
                objects.push(inspect(arguments[i]));
            }
            return objects.join(' ');
        }
        var i = 1;
        var args = arguments;
        var len = args.length;
        var formatRegExp = new RegExp("%%|%s|%d|%j", "g");
        var str = String(f).replace(formatRegExp, function (x) {
            if (x === '%%') return '%';
            if (i >= len) return x;
            switch (x) {
                case '%s':
                    return String(args[i++]);
                case '%d':
                    return Number(args[i++]);
                case '%j':
                    return JSON.stringify(args[i++]);
                default:
                    return x;
            }
        });
        for (var x = args[i]; i < len; x = args[++i]) {
            if (x === null || typeof x !== 'object') {
                str += ' ' + x;
            } else {
                str += ' ' + inspect(x);
            }
        }
        return str;
    },

    loadGameAutoAtlas(url,spriteName,node,cb){
        if(CC_BUILD){
            cc.resources.load(url, cc.SpriteAtlas, function (err, atlas) {
                var frame = atlas.getSpriteFrame(spriteName);
                node.spriteFrame = frame;
                cb(true);
            }.bind(this));
        }else{
            cc.resources.load(url+spriteName,cc.SpriteFrame,function(err,spriteFrame){
                if(err){
                    cc.log(err.message||err);
                    cb(false);
                    return;
                }
                node.spriteFrame = spriteFrame;
                cb(true);
            }.bind(this));
            
        }
    },

    loadJSONData(bundleName,name,callback){
        cc.assetManager.loadBundle(bundleName, function(err, bundle){
            bundle.load(name, cc.JsonAsset, function (error, res) {
                if (error) {
                    return;
                }
                let jsondata = res.json;
                callback(jsondata);
                //cc.log("jsondata=="+JSON.stringify(jsondata.data))
            }.bind(this));
        }.bind(this));
    },

    loadBundleSprite(bundlename,loadname,node,cb){
        cc.assetManager.loadBundle(bundlename, function (err, bundle) {
            bundle.load(loadname,cc.SpriteFrame, function(err, spriteframe) {
                if(err){
                    return;
                }
                node.spriteFrame = spriteframe;
                cb(true);
            }.bind(this));
        }.bind(this));
    },

    guid() {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    },

    timeConvertInt(time){
        //let converttime = 0;
        let sceond = parseInt(time/1000);
        // if(sceond<=10){
        //     converttime = sceond;
        // }else{
        //     let timestr = sceond+'';
        //     let s1 = timestr.substring(0,timestr.length-1);
        //     s1 = s1+'0';
        //     converttime = parseInt(s1)
        // }
        return sceond;
    },

    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    },
    distance(p1,p2){
        var dx = Math.abs(p2.x - p1.x);
        var dy = Math.abs(p2.y - p1.y);
        return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    },
    //货币进位
    goldCrarryBit(gold){
    
        var array=[
            [100000000,'N'],
            [10000000,'T'],
            [1000000,'G'],
            [100000,'M'],
            [10000,'K'],
            [1000,'B'],
        ];
        for (var i = 0; i < array.length; i++) {
            var value = gold/array[i][0];
            if(value > 1 ){
                return ''+value.toFixed(1)+array[i][1];
            }
        }
        return gold;
    },
    setVirusColor(node,color){
        for (var i = 0; i < node.children.length; i++) {
            var js = node.children[i].getComponent('color');
            if(js != null){
                node.children[i].color = color;
            }
            this.setVirusColor(node.children[i],color);
        }
    },

    getVirusColorByHp(hp) {
        for (var i = 0; i < gVirusColor.length; i++) {
            if(hp <= gVirusColor[i].pro){
                return gVirusColor[i].color;
            }
        }
    },
    getVirusScaleByHp(hp){
        for (var i = 0; i < gVirusColor.length; i++) {
            if(hp <= gVirusColor[i].pro){
                return gVirusScale[i].scale;
            }
        }
    },
    
    getRandomSpeed() {
        var index = random(0,gSpeed.length-1);
        return gSpeed[index];
    },
    
    randAlloc(total, min, max, length) {
        // 首先要判断是否符合 min 和 max 条件
        if (min * length > total || max * length < total) {
            throw Error(`没法满足最最少 ${min} 最大 ${max} 的条件`);
        }
    
        const result = [];
        let restValue = total;
        let restLength = length;
        for (let i = 0; i < length - 1; i++) {
             restLength--;
            // 这一次要发的数量必须保证剩下的要足最小量
            // 同进要保证剩下的不能大于需要的最大量
            const restMin = restLength * min;
            const restMax = restLength * max;
            // 可发的量
            const usable = restValue - restMin;
            // 最少要发的量
            const minValue = Math.max(min, restValue - restMax);
            // 以 minValue 为最左，max 为中线来进行随机，即随机范围是 (max - minValue) * 2
            // 如果这个范围大于 usable - minValue，取 usable - minValue
            const limit = Math.min(usable - minValue, (max - minValue) * 2);
            // 随机部分加上最少要发的部分就是应该发的，但是如果大于 max，最大取到 max
            result[i] = Math.min(max, minValue + Math.floor(limit * Math.random()));
            restValue -= result[i];
        }
        result[length - 1] = restValue;
    
        return result;
    },
    copyText(word,rid) {
        if(cc.sys.platform == cc.sys.BYTEDANCE_GAME || cc.sys.platform == cc.sys.WECHAT_GAME ||cc.sys.platform == cc.sys.BAIDU_GAME){ //头条平台
            let comObject;
            if(cc.sys.platform == cc.sys.BAIDU_GAME){
                comObject = swan;
            }else if(cc.sys.platform == cc.sys.WECHAT_GAME){
                comObject = wx;
            }else{
                comObject = tt; 
            }
            comObject.setClipboardData({
            data:word,
            success: function (res) {
                if(cc.sys.platform == cc.sys.BAIDU_GAME){
                    comObject.showToast({
                        title: '加载完成',
                        icon: 'none'
                    });
                }
                comObject.getClipboardData({
                    success: function (res) {
                        let spreadUrl =consts.HTTP_SPREAD_REPORT+'rid='+rid+'&status='+1;
                        httpUtils.httpSendRequest(spreadUrl,function(spreadRes){});
                    },
                    fail:function(res){
                        let spreadUrl =consts.HTTP_SPREAD_REPORT+'rid='+rid+'&status='+0;
                        httpUtils.httpSendRequest(spreadUrl,function(spreadRes){});
                    }
                })
            },
            fail:function(res){
                let spreadUrl =consts.HTTP_SPREAD_REPORT+'rid='+rid+'&status='+0;
                httpUtils.httpSendRequest(spreadUrl,function(spreadRes){});
            }
            }
            )
        }
    },
    spreadWordFun(){
        if(cc.sys.platform == cc.sys.BYTEDANCE_GAME || cc.sys.platform == cc.sys.WECHAT_GAME ||cc.sys.platform == cc.sys.BAIDU_GAME){ //头条平台
            let comApp,combrand,commodel;
            if(cc.sys.platform == cc.sys.BAIDU_GAME){
                const {host,brand,model} = swan.getSystemInfoSync();
                comApp = host;
                combrand = brand;
                commodel = model;
            }else if(cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'WX'){
                const {appName,brand,model} = wx.getSystemInfoSync();
                comApp = appName;
                combrand = brand;
                commodel = model;
            }else if(cc.sys.platform == cc.sys.WECHAT_GAME && appGame.platform == 'QQ'){
                const {appName,brand,model} = qq.getSystemInfoSync();
                comApp = appName;
                combrand = brand;
                commodel = model;
            } else{
                const {appName,brand,model} = tt.getSystemInfoSync();
                comApp = appName;
                combrand = brand;
                commodel = model;
            }
            
            let param = {"did":appGame.userId,"package":consts.HTTP_RECORD_PACKAGE,"app":comApp,
        "brand":combrand,"model":commodel};
            //console.log("param=="+JSON.stringify(param))
            httpUtils.httpPostParam(consts.HTTP_SPREAD_WORD,param,function(resWord){
                //console.log("resWord =="+JSON.stringify(resWord))
                if(resWord){
                    if(resWord.code == 200 && resWord.data){
                        appGame.gameServerRoom.wordRid = resWord.rid;
                        util.copyText(resWord.data,resWord.rid);
                    }else{
                        appGame.gameServerRoom.wordRid = '';
                    }
                }
            }.bind(this));
        }
        // let param = {"did":appGame.userId,"package":consts.HTTP_RECORD_PACKAGE,"app":"Toutiao"};
        // cc.log("param=="+JSON.stringify(param))
        // httpUtils.httpPostParam(consts.HTTP_SPREAD_WORD,param,function(resWord){
        //     cc.log("resWord =="+JSON.stringify(resWord))
        //     if(resWord){
        //         if(resWord.data && resWord.code == 200){
        //              appGame.gameServerRoom.wordRid = resWord.rid
        //             let spreadUrl =consts.HTTP_SPREAD_REPORT+'rid='+resWord.rid+'&status='+0;
        //             httpUtils.httpSendRequest(spreadUrl,function(spreadRes){}.bind(this));
        //             util.copyText(resWord.data,resWord.rid);
        //         }else{
        //             appGame.gameServerRoom.wordRid = '';
        //         }
        //     }else{
        //         appGame.gameServerRoom.wordRid = '';
        //     }
        // }.bind(this));
    },

    spreadClose(rid){
        let ridUrl = consts.HTTP_SPREAD_CLOSE+rid;
        httpUtils.httpSendRequest(ridUrl,function(spreadRes){});
    },

    /*
    * url 获取配置url
    * bundle  本地配置bundle
    * json  本地配置文件名
    * config  存在该字段 
    * cb 回调
    */
    getUrlSerConfig(url,bundle,json,cb){
        httpUtils.httpSendRequest(url,function(res){
            //console.log("room =="+JSON.stringify(res))
            if(res && res.Code == 200){
                let detailparse = JSON.parse(res.Detail);
                cb(detailparse);
            }else{
                util.loadJSONData(bundle,json,function(data){
                    cb(data);
                }.bind(this));
            }
        }.bind(this));
    },
    /*
    *比较版本号
    */
    compareVersion:function(v1, v2) {
        v1 = v1.split('.')
        v2 = v2.split('.')
        var len = Math.max(v1.length, v2.length)
       
        while (v1.length < len) {
          v1.push('0')
        }
        while (v2.length < len) {
          v2.push('0')
        }
        for (var i = 0; i < len; i++) {
          var num1 = parseInt(v1[i])
          var num2 = parseInt(v2[i])
       
          if (num1 > num2) {
            return 1
          } else if (num1 < num2) {
            return -1
          }
        }
        return 0
    },
}