

/**
 * @fileoverview
 *
 * Need to suppress 'global this' error so the Node.js export line doesn't cause
 * closure compile to error out.
 * @suppress {globalThis}
 */

var g = function(){
};

g.iswxgame = function () {
    //return cc.sys.platform == cc.sys.WECHAT_GAME
    return cc.sys.platform == cc.sys.BAIDU_GAME
    
};


var _G = this;

g.setGlobalInstance = function(obj,name)
{
    console.log("g.setGlobalInstance" , obj)
    if(name)
    {
        _G[name] = obj;
    }else{
        if (obj.__classname__){
            _G[obj.__classname__] = obj;
        } else {
            console.warn("g.setGlobalInstance:register failed")
        }
    }
};
g.getGlobal = function(s)
{
    if(s==null|| s==undefined)
        return _G;
    else
        return _G[s];
};
g.randomInt = function(min, max) {
    if(max == null) {max = min; min = 0;}
    var val = Math.random() * (max - min);
    return Math.floor(val) + min;
};

g.getRandomInArray = function(arr)
{
    if(arr)
        return arr[g.randomInt(0,arr.length)]
};

g.randomFloat = function(min,max)
{
    return Math.random() * (max - min) + min;
};

g.foreachNode = function(node,callback,target)
{
    if (node == null || node == undefined) return;
    for (var i = 0 ;i <node.childrenCount;i++)
    {
        var child = node.children[i];
        callback.call(target,child);
        if (child.childrenCount > 0 )
        {
            g.foreachNode(child,callback,target)
        }
    }
};

g.uuid = function(len, radix) { 
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); 
    var uuid = [], i; 
    radix = radix || chars.length; 
    
    if (len) { 
        // Compact form 
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix]; 
    } else { 
        // rfc4122, version 4 form 
        var r; 
        // rfc4122 requires these characters 
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'; 
        uuid[14] = '4'; 
        // Fill in random data.  At i==19 set the high bits of clock sequence as 
        // per rfc4122, sec. 4.1.5 
        for (i = 0; i < 36; i++) { 
        if (!uuid[i]) { 
            r = 0 | Math.random()*16; 
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]; 
        } 
        } 
    } 
    return uuid.join(''); 
} ;

g.fbToJson = function(fb)
{
    
};

g._dumpBuffer = function(res,level)
{
    var pre = ""
    for (var i = 0; i< level;i++)
    {
        pre += "    "
    }
    pre +="-"
    for(var r in res)
    {
        if(r == "bb" || r == "bb_pos" ||r == "__init")
            continue;
        else
        {
            var v = res[r].call(res)
            if(v == "[object Object]")
            {
                console.log(cc.js.formatStr(pre +"[%s] : " , r));
                var len_func = res[r+"Length"]
                var get_func = res[r];
                if (len_func)
                {
                    //array 
                    var len = len_func.call(res);
                    for (var i = 0 ;i<len ; i++)
                    {
                        var subItem = get_func.call(res,i)
                        console.log(pre + " " + i +":");
                        this._dumpBuffer(subItem,level+1);
                    }
                }else{
                    // object 
                    this._dumpBuffer(v,level+1);
                }
            }
            else{
                if (v !=null)
                    console.log(pre + cc.js.formatStr("[%s] : %s ", r,v ));
            }
        }
    }
};

g.logColor = function(str,color)
{
    color = color || "#0092c3"
    console.log("%c | "+str+" |", "background-color: "+color+"; background-image: -webkit-linear-gradient(top, "+color+", #eee); background-image: linear-gradient(to bottom, "+color+", #eee); padding: 5px 10px; color: #333");
};

g.dumpBuffer = function(res)
{
    g.logColor("======= dump buffer============================================")
    g._dumpBuffer(res,0)
    g.logColor("================================================================")
};

//通用公式 
g.increaseFomula = function(min,max,t,d)
{
    return min + (t / (t + d) * (max - min))
};
g.decreaseFomula = function(max,min,t,d)
{
    return max - (t/ ( t + d) * (max - min) )
};

g.isNextDay = function(timeSec)
{
return g.isGreaterDate(new Date(),new Date(timeSec))
}
g.isGreaterDate = function(now,before)
{
    var diff = now.getTime() - before.getTime() 
    if(diff > 86400000) // 24*60*60*1000
    {
        return true;
    }else{
        if (diff > 0 )
            return now.getDate() != before.getDate()
        else 
            return false; 
    }
};

g.map = function()
{
    
};

g.allPossibles = function(x,y,ox,oy)
{
    var h = []
    var k = 4 - Math.round(x / 2)
    var m = 4 - Math.round(y / 2)
    for (var n = k; n <= k + x - 1; n++)
        for (var p = m; p <= m + y - 1; p++) 
            h.push([n, p]);
    return h;
};

g.execScript = function(exp)
{
    var expressionParts = exp.split(".")
    if (expressionParts.length >= 2)
    {
        var left = expressionParts[0];
        //ignore (exp)
        //todo: load params from global object
        var right = expressionParts[1].replace(/\(.*\)/,"")
        var gobj = _G[left]
        if(gobj )
        {
            var func = gobj[right];
            if (func)
            {
                func.call(gobj);
            }
        }
    }
};

g.fadeAndDestroy = function(node,t )
{
    t = t || 0.3;
    var seq = cc.sequence(cc.fadeOut(t),cc.callFunc(node.destroy,node))
    node.runAction(seq)
};

g.extendArray = function (array ,other_array) {
    /* you should include a test to check whether other_array really is an array */
    other_array.forEach(function(v) {array.push(v)}, array);   
};

//arr number or array 
g.getRandomUniqueArray = function(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    var len = arr;
    if(Array.isArray(arr))
    {
        len = arr.length;
        for (var i = 0 ;i < len; i ++) {
            temp_array.push(arr[i])
        }
    }else{
        for (var i = 0 ;i < len; i ++) {
            temp_array.push(i)
        }
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length>0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random()*temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
};
g.prefixInteger = function (num, length) {
    return ( "0000000000000000" + num ).substr( -length );
}

Function.prototype.getName = function(){
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
};

Date.prototype.format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
};

// String.prototype.startWith=function(str){     
// var reg=new RegExp("^"+str);     
// return reg.test(this);        
// }  
  
// String.prototype.endWith=function(str){     
// var reg=new RegExp(str+"$");     
// return reg.test(this);        
// }


Array.prototype.shuffle = function(a) {
    if (void 0 === a || 0 >= a || a > this.length) a = this.length;
    for (a -= 1; 0 <= a; a--) {
        var b = 0 | (Math.random()*0x00ffffff) % (a + 1)
        c = this[a];
        this[a] = this[b];
        this[b] = c
    }
};




cc.Node.prototype.getComponentInParent = function(t) {
    var component = this.getComponent(t)
    if(component instanceof t)
    {
        return component;
    }else{
        parent = this.getParent();
        if(parent == null)
        {
            return null
        }else{
            return parent.getComponentInParent(t);
        }
    }
};

cc.Component.prototype.getComponentInParent = function(t) {
    var component = this.getComponent(t)
    if(component instanceof t)
    {
        return component;
    }else{
        parent = this.node.getParent();
        if(parent == null)
        {
            return null
        }else{
            return parent.getComponentInParent(t);
        }

    }
};

cc.Camera.prototype.canSee = function(node)
{
    var plb = cc.v2(node.x -  node.width * node.anchorX ,node.y - node.anchorY * node.height)
    var p = this.getWorldToCameraPoint(plb,cc.Vec2.ZERO);
    var rectInCamera = cc.rect(p.x,p.y ,node.width,node.height)
    rectInCamera.origin = node.getParent().convertToWorldSpaceAR(rectInCamera.origin);
    if(rectInCamera.yMin > cc.visibleRect.height || rectInCamera.yMax < 0 ||rectInCamera.xMax < 0 || rectInCamera.x > cc.visibleRect.width )
    {
        return false
    }
    return true
};
// showlist(arg0: (node: Node, data: any, i: number) => void);
cc.ScrollView.prototype.showlist = function(callback,list,template) {
    if(!template)
    {
        template = this.content.children[0]
    }
    this.content.removeAllChildren();
    for (var i = 0 ;i < list.length; i ++)
    {
        var cfg = list[i];
        var node = cc.instantiate(template)
        this.content.addChild(node)
        if(callback)
            callback(node,cfg,i)
    }
}

cc.Layout.prototype.showlist = function(callback,list,template) {
    if(!template)
    {
        template = this.node.children[0]
    }
    this.node.removeAllChildren();
    for (var i = 0 ;i < list.length; i ++)
    {
        var cfg = list[i];
        var node = cc.instantiate(template)
        this.node.addChild(node)
        if(callback)
            callback(node,cfg,i)
    }
}



cc.warnID = function() {};

if(this)
    this.g = g;