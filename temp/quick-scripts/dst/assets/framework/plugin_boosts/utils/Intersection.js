
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/utils/Intersection.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2f4dfDdP95AjIAwGFL34sfm', 'Intersection');
// framework/plugin_boosts/utils/Intersection.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Intersection = /** @class */ (function () {
    function Intersection() {
    }
    // contains and intesect
    Intersection.circleIntersectRect = function (circle_pt, radius, rect) {
        var cx = 0;
        var cy = 0;
        //Find the point on the collision box closest to the center of the circle
        if (circle_pt.x < rect.x)
            cx = rect.x;
        else if (circle_pt.x > rect.x + rect.width)
            cx = rect.x + rect.width;
        else
            cx = circle_pt.x;
        if (circle_pt.y < rect.y)
            cy = rect.y;
        else if (circle_pt.y > rect.y + rect.height)
            cy = rect.y + rect.height;
        else
            cy = circle_pt.y;
        var v2 = cc.v2(cx, cy);
        v2.subSelf(circle_pt);
        if (v2.magSqr() < radius * radius)
            return true;
        return false;
    };
    return Intersection;
}());
exports.default = Intersection;
/***
// 矩形和圆形碰撞检测
bool IsCirlceCollisionRect(float circleXPos, float circleYPos, float radius, float rectX, float rectY, float rectW, float rectH)
{
    float arcR  = radius;
    float arcOx = circleXPos;
    float arcOy = circleYPos;

    //分别判断矩形4个顶点与圆心的距离是否<=圆半径；如果<=，说明碰撞成功
    if(((rectX-arcOx) * (rectX-arcOx) + (rectY-arcOy) * (rectY-arcOy)) <= arcR * arcR)
        return true;
    if(((rectX+rectW-arcOx) * (rectX+rectW-arcOx) + (rectY-arcOy) * (rectY-arcOy)) <= arcR * arcR)
        return true;
    if(((rectX-arcOx) * (rectX-arcOx) + (rectY+rectH-arcOy) * (rectY+rectH-arcOy)) <= arcR * arcR)
        return true;
    if(((rectX+rectW-arcOx) * (rectX+rectW-arcOx) + (rectY+rectH-arcOy) * (rectY+rectH-arcOy)) <= arcR * arcR)
        return true;

    //判断当圆心的Y坐标进入矩形内时X的位置，如果X在(rectX-arcR)到(rectX+rectW+arcR)这个范围内，则碰撞成功
    float minDisX = 0;
    if(arcOy >= rectY && arcOy <= rectY + rectH)
    {
        if(arcOx < rectX)
            minDisX = rectX - arcOx;
        else if(arcOx > rectX + rectW)
            minDisX = arcOx - rectX - rectW;
        else
            return true;
        if(minDisX <= arcR)
            return true;
    }

    //判断当圆心的X坐标进入矩形内时Y的位置，如果X在(rectY-arcR)到(rectY+rectH+arcR)这个范围内，则碰撞成功
    float minDisY = 0;
    if(arcOx >= rectX && arcOx <= rectX + rectW)
    {
        if(arcOy < rectY)
            minDisY = rectY - arcOy;
        else if(arcOy > rectY + rectH)
            minDisY = arcOy - rectY - rectH;
        else
            return true;
        if(minDisY <= arcR)
            return true;
    }

    return false;
}

// 线段和线段碰撞检测
bool IsLineCollisionLine(cocos2d::CCPoint p1, cocos2d::CCPoint p2, cocos2d::CCPoint p3, cocos2d::CCPoint p4)
{
    float x1 = p1.x, x2 = p2.x, x3 = p3.x, x4 = p4.x;
    float y1 = p1.y, y2 = p2.y, y3 = p3.y, y4 = p4.y;

    float d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    // If d is zero, there is no intersection
    if (d == 0)
        return false;

    // Get the x and y
    float pre = (x1*y2 - y1*x2), post = (x3*y4 - y3*x4);
    float x = ( pre * (x3 - x4) - (x1 - x2) * post ) / d;
    float y = ( pre * (y3 - y4) - (y1 - y2) * post ) / d;

    // Check if the x and y coordinates are within both lines
    if ( x < MIN(x1, x2) || x > MAX(x1, x2) ||
        x < MIN(x3, x4) || x > MAX(x3, x4) )
        return false;

    if ( y < MIN(y1, y2) || y > MAX(y1, y2) ||
        y < MIN(y3, y4) || y > MAX(y3, y4) )
        return false;

    return true;
}

static float mult(cocos2d::CCPoint a, cocos2d::CCPoint b, cocos2d::CCPoint c)
{
    return (a.x-c.x)*(b.y-c.y)-(b.x-c.x)*(a.y-c.y);
}

bool IsLineCollisionLine2(cocos2d::CCPoint aa, cocos2d::CCPoint bb, cocos2d::CCPoint cc, cocos2d::CCPoint dd)
{
    if ( MAX(aa.x, bb.x)<MIN(cc.x, dd.x) )
        return false;

    if ( MAX(aa.y, bb.y)<MIN(cc.y, dd.y) )
        return false;

    if ( MAX(cc.x, dd.x)<MIN(aa.x, bb.x) )
        return false;

    if ( MAX(cc.y, dd.y)<MIN(aa.y, bb.y) )
        return false;

    if (mult(cc, bb, aa)*mult(bb, dd, aa)<0.0001f)
        return false;

    if (mult(aa, dd, cc)*mult(dd, bb, cc)<0.0001f)
        return false;

    return true;
}

// 线段和矩形碰撞检测
bool IsLineCollisionRect(cocos2d::CCPoint lineStartPoint, cocos2d::CCPoint lineEndPoint, cocos2d::CCPoint rectleftBottomPoint, float width, float height)
{
    // 因为这个方法专门进行射线光束的碰撞检测，所以暂不进行线段在矩形内的碰撞检测
    cocos2d::CCPoint leftLineStartPoint = rectleftBottomPoint;
    cocos2d::CCPoint leftLineEndPoint   = cocos2d::CCPoint(leftLineStartPoint.x, leftLineStartPoint.y+height);

    cocos2d::CCPoint rightLineStartPoint= cocos2d::CCPoint(leftLineStartPoint.x+width, leftLineStartPoint.y);
    cocos2d::CCPoint rightLineEndPoint  = cocos2d::CCPoint(leftLineStartPoint.x+width, leftLineStartPoint.y+height);

    cocos2d::CCPoint topLineStartPoint  = cocos2d::CCPoint(leftLineStartPoint.x, leftLineStartPoint.y+height);
    cocos2d::CCPoint topLineEndPoint    = cocos2d::CCPoint(leftLineStartPoint.x+width, leftLineStartPoint.y+height);

    cocos2d::CCPoint bottomLineStartPoint= cocos2d::CCPoint(leftLineStartPoint.x, leftLineStartPoint.y);
    cocos2d::CCPoint bottomLineEndPoint  = cocos2d::CCPoint(leftLineStartPoint.x+width, leftLineStartPoint.y);
    
    cocos2d::CCPoint leftBottomLineStartPoint= rectleftBottomPoint;
    cocos2d::CCPoint rightTopLineEndPoint    = rightLineEndPoint;

    cocos2d::CCPoint leftTopLineStartPoint   = leftLineEndPoint;
    cocos2d::CCPoint rightBottomLineEndPoint = rightLineStartPoint;


    do
    {
        if (IsLineCollisionLine2(lineStartPoint, lineEndPoint, leftLineStartPoint, leftLineEndPoint))
            break;

        if (IsLineCollisionLine2(lineStartPoint, lineEndPoint, rightLineStartPoint, rightLineEndPoint))
            break;

        if (IsLineCollisionLine2(lineStartPoint, lineEndPoint, topLineStartPoint, topLineEndPoint))
            break;

        if (IsLineCollisionLine2(lineStartPoint, lineEndPoint, bottomLineStartPoint, bottomLineEndPoint))
            break;

        if (IsLineCollisionLine2(lineStartPoint, lineEndPoint, leftBottomLineStartPoint, rightTopLineEndPoint))
            break;

        if (IsLineCollisionLine2(lineStartPoint, lineEndPoint, leftTopLineStartPoint, rightBottomLineEndPoint))
            break;

        return false;
    }
    while (false);

    return true;
}

static  bool  IsRectCollisionRect2(cocos2d::CCPoint rect1CenterPoint, float rect1W, float rect1H, cocos2d::CCPoint rect2CenterPoint, float rect2W, float rect2H)
{
    cocos2d::CCPoint leftTopPoint     = cocos2d::CCPoint(rect2CenterPoint.x-rect2W/2.0f, rect2CenterPoint.y+rect2H/2.0f);
    cocos2d::CCPoint leftBottomPoint  = cocos2d::CCPoint(rect2CenterPoint.x-rect2W/2.0f, rect2CenterPoint.y-rect2H/2.0f);
    cocos2d::CCPoint rightTopPoint    = cocos2d::CCPoint(rect2CenterPoint.x+rect2W/2.0f, rect2CenterPoint.y+rect2H/2.0f);
    cocos2d::CCPoint rightBottomPoint = cocos2d::CCPoint(rect2CenterPoint.x+rect2W/2.0f, rect2CenterPoint.y-rect2H/2.0f);

    if ( (leftTopPoint.x>(rect1CenterPoint.x-rect1W/2.0f)) && (leftTopPoint.x<(rect1CenterPoint.x+rect1W/2.0f))
        && (leftTopPoint.y>(rect1CenterPoint.y-rect1H/2.0f)) && (leftTopPoint.y<(rect1CenterPoint.y+rect1H/2.0f)))
        return true;

    if ( (leftBottomPoint.x>(rect1CenterPoint.x-rect1W/2.0f)) && (leftBottomPoint.x<(rect1CenterPoint.x+rect1W/2.0f))
        && (leftBottomPoint.y>(rect1CenterPoint.y-rect1H/2.0f)) && (leftBottomPoint.y<(rect1CenterPoint.y+rect1H/2.0f)))
        return true;

    if ( (rightTopPoint.x>(rect1CenterPoint.x-rect1W/2.0f)) && (rightTopPoint.x<(rect1CenterPoint.x+rect1W/2.0f))
        && (rightTopPoint.y>(rect1CenterPoint.y-rect1H/2.0f)) && (rightTopPoint.y<(rect1CenterPoint.y+rect1H/2.0f)))
        return true;

    if ( (rightBottomPoint.x>(rect1CenterPoint.x-rect1W/2.0f)) && (rightBottomPoint.x<(rect1CenterPoint.x+rect1W/2.0f))
        && (rightBottomPoint.y>(rect1CenterPoint.y-rect1H/2.0f)) && (rightBottomPoint.y<(rect1CenterPoint.y+rect1H/2.0f)))
        return true;

    return false;
}

// 矩形和矩形碰撞检测
bool  IsRectCollisionRect(cocos2d::CCPoint rect1CenterPoint, float rect1W, float rect1H, cocos2d::CCPoint rect2CenterPoint, float rect2W, float rect2H)
{
    if (IsRectCollisionRect2(rect1CenterPoint, rect1W, rect1H, rect2CenterPoint, rect2W, rect2H))
        return true;
    
    if (IsRectCollisionRect2(rect2CenterPoint, rect2W, rect2H, rect1CenterPoint, rect1W, rect1H))
        return true;

    return false;
}

**/ 

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFx1dGlsc1xcSW50ZXJzZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBeUJBLENBQUM7SUF2Qkcsd0JBQXdCO0lBQ2pCLGdDQUFtQixHQUExQixVQUEyQixTQUFpQixFQUFFLE1BQU0sRUFBRSxJQUFJO1FBQ3RELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNWLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNWLHlFQUF5RTtRQUN6RSxJQUFJLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDcEIsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUE7YUFDVixJQUFJLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSztZQUN0QyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBOztZQUV4QixFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQTtRQUNwQixJQUFJLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDcEIsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUE7YUFDVixJQUFJLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTTtZQUN2QyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBOztZQUV6QixFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQTtRQUNwQixJQUFJLEVBQUUsR0FBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQTtRQUNwQixFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3JCLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sR0FBRyxNQUFNO1lBQzdCLE9BQU8sSUFBSSxDQUFBO1FBQ2YsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0F6QkEsQUF5QkMsSUFBQTs7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlNRyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyc2VjdGlvblxue1xuICAgIC8vIGNvbnRhaW5zIGFuZCBpbnRlc2VjdFxuICAgIHN0YXRpYyBjaXJjbGVJbnRlcnNlY3RSZWN0KGNpcmNsZV9wdDpjYy5WZWMyLMKgcmFkaXVzLMKgcmVjdCl7XG4gICAgwqDCoMKgwqBsZXTCoGN4wqA9IDBcbiAgICDCoMKgwqDCoGxldMKgY3nCoD0gMFxuICAgIMKgwqDCoMKgLy9GaW5kwqB0aGXCoHBvaW50wqBvbsKgdGhlwqBjb2xsaXNpb27CoGJveMKgY2xvc2VzdMKgdG/CoHRoZcKgY2VudGVywqBvZsKgdGhlwqBjaXJjbGVcbiAgICDCoMKgwqDCoGlmwqAoY2lyY2xlX3B0LnjCoDzCoHJlY3QueClcbiAgICDCoMKgwqDCoMKgwqDCoMKgY3jCoD3CoHJlY3QueFxuICAgIMKgwqDCoMKgZWxzZSBpZsKgKGNpcmNsZV9wdC54wqA+wqByZWN0LnjCoCvCoHJlY3Qud2lkdGgpXG4gICAgwqDCoMKgwqDCoMKgwqDCoGN4wqA9wqByZWN0LnjCoCvCoHJlY3Qud2lkdGhcbiAgICDCoMKgwqDCoGVsc2VcbiAgICDCoMKgwqDCoMKgwqDCoMKgY3jCoD3CoGNpcmNsZV9wdC54XG4gICAgwqDCoMKgwqBpZsKgKGNpcmNsZV9wdC55wqA8wqByZWN0LnnCoClcbiAgICDCoMKgwqDCoMKgwqDCoMKgY3nCoD3CoHJlY3QueVxuICAgIMKgwqDCoMKgZWxzZSBpZijCoGNpcmNsZV9wdC55wqA+wqByZWN0LnnCoCvCoHJlY3QuaGVpZ2h0KVxuICAgIMKgwqDCoMKgwqDCoMKgwqBjecKgPcKgcmVjdC55wqArwqByZWN0LmhlaWdodFxuICAgIMKgwqDCoMKgZWxzZVxuICAgIMKgwqDCoMKgwqDCoMKgwqBjecKgPcKgY2lyY2xlX3B0LnlcbiAgICAgICAgbGV0IHYyID1jYy52MihjeCxjeSkgXG4gICAgICAgIHYyLnN1YlNlbGYoY2lyY2xlX3B0KSAgICBcbiAgICDCoMKgwqDCoGlmwqAodjIubWFnU3FyKCnCoDzCoHJhZGl1cyAqIHJhZGl1cylcbiAgICDCoMKgwqDCoMKgwqDCoMKgcmV0dXJuwqB0cnVlXG4gICAgwqDCoMKgwqByZXR1cm7CoGZhbHNlXG4gICAgfVxufVxuLyoqKlxuLy8g55+p5b2i5ZKM5ZyG5b2i56Kw5pKe5qOA5rWLXG5ib29sIElzQ2lybGNlQ29sbGlzaW9uUmVjdChmbG9hdCBjaXJjbGVYUG9zLCBmbG9hdCBjaXJjbGVZUG9zLCBmbG9hdCByYWRpdXMsIGZsb2F0IHJlY3RYLCBmbG9hdCByZWN0WSwgZmxvYXQgcmVjdFcsIGZsb2F0IHJlY3RIKVxue1xuICAgIGZsb2F0IGFyY1IgID0gcmFkaXVzO1xuICAgIGZsb2F0IGFyY094ID0gY2lyY2xlWFBvcztcbiAgICBmbG9hdCBhcmNPeSA9IGNpcmNsZVlQb3M7XG5cbiAgICAvL+WIhuWIq+WIpOaWreefqeW9ojTkuKrpobbngrnkuI7lnIblv4PnmoTot53nprvmmK/lkKY8PeWchuWNiuW+hO+8m+WmguaenDw977yM6K+05piO56Kw5pKe5oiQ5YqfICAgXG4gICAgaWYoKChyZWN0WC1hcmNPeCkgKiAocmVjdFgtYXJjT3gpICsgKHJlY3RZLWFyY095KSAqIChyZWN0WS1hcmNPeSkpIDw9IGFyY1IgKiBhcmNSKSAgIFxuICAgICAgICByZXR1cm4gdHJ1ZTsgICBcbiAgICBpZigoKHJlY3RYK3JlY3RXLWFyY094KSAqIChyZWN0WCtyZWN0Vy1hcmNPeCkgKyAocmVjdFktYXJjT3kpICogKHJlY3RZLWFyY095KSkgPD0gYXJjUiAqIGFyY1IpICAgXG4gICAgICAgIHJldHVybiB0cnVlOyAgIFxuICAgIGlmKCgocmVjdFgtYXJjT3gpICogKHJlY3RYLWFyY094KSArIChyZWN0WStyZWN0SC1hcmNPeSkgKiAocmVjdFkrcmVjdEgtYXJjT3kpKSA8PSBhcmNSICogYXJjUikgICBcbiAgICAgICAgcmV0dXJuIHRydWU7ICAgXG4gICAgaWYoKChyZWN0WCtyZWN0Vy1hcmNPeCkgKiAocmVjdFgrcmVjdFctYXJjT3gpICsgKHJlY3RZK3JlY3RILWFyY095KSAqIChyZWN0WStyZWN0SC1hcmNPeSkpIDw9IGFyY1IgKiBhcmNSKSAgIFxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIC8v5Yik5pat5b2T5ZyG5b+D55qEWeWdkOagh+i/m+WFpeefqeW9ouWGheaXtljnmoTkvY3nva7vvIzlpoLmnpxY5ZyoKHJlY3RYLWFyY1Ip5YiwKHJlY3RYK3JlY3RXK2FyY1Ip6L+Z5Liq6IyD5Zu05YaF77yM5YiZ56Kw5pKe5oiQ5YqfICAgXG4gICAgZmxvYXQgbWluRGlzWCA9IDA7ICAgXG4gICAgaWYoYXJjT3kgPj0gcmVjdFkgJiYgYXJjT3kgPD0gcmVjdFkgKyByZWN0SClcbiAgICB7ICAgXG4gICAgICAgIGlmKGFyY094IDwgcmVjdFgpICAgXG4gICAgICAgICAgICBtaW5EaXNYID0gcmVjdFggLSBhcmNPeDsgICBcbiAgICAgICAgZWxzZSBpZihhcmNPeCA+IHJlY3RYICsgcmVjdFcpICAgXG4gICAgICAgICAgICBtaW5EaXNYID0gYXJjT3ggLSByZWN0WCAtIHJlY3RXOyAgIFxuICAgICAgICBlbHNlICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAgXG4gICAgICAgIGlmKG1pbkRpc1ggPD0gYXJjUikgICBcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyAgIFxuICAgIH1cblxuICAgIC8v5Yik5pat5b2T5ZyG5b+D55qEWOWdkOagh+i/m+WFpeefqeW9ouWGheaXtlnnmoTkvY3nva7vvIzlpoLmnpxY5ZyoKHJlY3RZLWFyY1Ip5YiwKHJlY3RZK3JlY3RIK2FyY1Ip6L+Z5Liq6IyD5Zu05YaF77yM5YiZ56Kw5pKe5oiQ5YqfXG4gICAgZmxvYXQgbWluRGlzWSA9IDA7ICAgXG4gICAgaWYoYXJjT3ggPj0gcmVjdFggJiYgYXJjT3ggPD0gcmVjdFggKyByZWN0VylcbiAgICB7ICAgXG4gICAgICAgIGlmKGFyY095IDwgcmVjdFkpICAgXG4gICAgICAgICAgICBtaW5EaXNZID0gcmVjdFkgLSBhcmNPeTsgICBcbiAgICAgICAgZWxzZSBpZihhcmNPeSA+IHJlY3RZICsgcmVjdEgpICAgXG4gICAgICAgICAgICBtaW5EaXNZID0gYXJjT3kgLSByZWN0WSAtIHJlY3RIOyAgIFxuICAgICAgICBlbHNlICBcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyAgIFxuICAgICAgICBpZihtaW5EaXNZIDw9IGFyY1IpICAgXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgICBcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7IFxufVxuXG4vLyDnur/mrrXlkoznur/mrrXnorDmkp7mo4DmtYtcbmJvb2wgSXNMaW5lQ29sbGlzaW9uTGluZShjb2NvczJkOjpDQ1BvaW50IHAxLCBjb2NvczJkOjpDQ1BvaW50IHAyLCBjb2NvczJkOjpDQ1BvaW50IHAzLCBjb2NvczJkOjpDQ1BvaW50IHA0KVxue1xuICAgIGZsb2F0IHgxID0gcDEueCwgeDIgPSBwMi54LCB4MyA9IHAzLngsIHg0ID0gcDQueDtcbiAgICBmbG9hdCB5MSA9IHAxLnksIHkyID0gcDIueSwgeTMgPSBwMy55LCB5NCA9IHA0Lnk7XG5cbiAgICBmbG9hdCBkID0gKHgxIC0geDIpICogKHkzIC0geTQpIC0gKHkxIC0geTIpICogKHgzIC0geDQpO1xuICAgIC8vIElmIGQgaXMgemVybywgdGhlcmUgaXMgbm8gaW50ZXJzZWN0aW9uXG4gICAgaWYgKGQgPT0gMCkgXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIC8vIEdldCB0aGUgeCBhbmQgeVxuICAgIGZsb2F0IHByZSA9ICh4MSp5MiAtIHkxKngyKSwgcG9zdCA9ICh4Myp5NCAtIHkzKng0KTtcbiAgICBmbG9hdCB4ID0gKCBwcmUgKiAoeDMgLSB4NCkgLSAoeDEgLSB4MikgKiBwb3N0ICkgLyBkO1xuICAgIGZsb2F0IHkgPSAoIHByZSAqICh5MyAtIHk0KSAtICh5MSAtIHkyKSAqIHBvc3QgKSAvIGQ7XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgeCBhbmQgeSBjb29yZGluYXRlcyBhcmUgd2l0aGluIGJvdGggbGluZXNcbiAgICBpZiAoIHggPCBNSU4oeDEsIHgyKSB8fCB4ID4gTUFYKHgxLCB4MikgfHxcbiAgICAgICAgeCA8IE1JTih4MywgeDQpIHx8IHggPiBNQVgoeDMsIHg0KSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGlmICggeSA8IE1JTih5MSwgeTIpIHx8IHkgPiBNQVgoeTEsIHkyKSB8fFxuICAgICAgICB5IDwgTUlOKHkzLCB5NCkgfHwgeSA+IE1BWCh5MywgeTQpICkgXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5zdGF0aWMgZmxvYXQgbXVsdChjb2NvczJkOjpDQ1BvaW50IGEsIGNvY29zMmQ6OkNDUG9pbnQgYiwgY29jb3MyZDo6Q0NQb2ludCBjKVxue1xuICAgIHJldHVybiAoYS54LWMueCkqKGIueS1jLnkpLShiLngtYy54KSooYS55LWMueSk7XG59XG5cbmJvb2wgSXNMaW5lQ29sbGlzaW9uTGluZTIoY29jb3MyZDo6Q0NQb2ludCBhYSwgY29jb3MyZDo6Q0NQb2ludCBiYiwgY29jb3MyZDo6Q0NQb2ludCBjYywgY29jb3MyZDo6Q0NQb2ludCBkZClcbntcbiAgICBpZiAoIE1BWChhYS54LCBiYi54KTxNSU4oY2MueCwgZGQueCkgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoIE1BWChhYS55LCBiYi55KTxNSU4oY2MueSwgZGQueSkgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoIE1BWChjYy54LCBkZC54KTxNSU4oYWEueCwgYmIueCkgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoIE1BWChjYy55LCBkZC55KTxNSU4oYWEueSwgYmIueSkgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAobXVsdChjYywgYmIsIGFhKSptdWx0KGJiLCBkZCwgYWEpPDAuMDAwMWYpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChtdWx0KGFhLCBkZCwgY2MpKm11bHQoZGQsIGJiLCBjYyk8MC4wMDAxZilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vIOe6v+auteWSjOefqeW9oueisOaSnuajgOa1i1xuYm9vbCBJc0xpbmVDb2xsaXNpb25SZWN0KGNvY29zMmQ6OkNDUG9pbnQgbGluZVN0YXJ0UG9pbnQsIGNvY29zMmQ6OkNDUG9pbnQgbGluZUVuZFBvaW50LCBjb2NvczJkOjpDQ1BvaW50IHJlY3RsZWZ0Qm90dG9tUG9pbnQsIGZsb2F0IHdpZHRoLCBmbG9hdCBoZWlnaHQpXG57XG4gICAgLy8g5Zug5Li66L+Z5Liq5pa55rOV5LiT6Zeo6L+b6KGM5bCE57q/5YWJ5p2f55qE56Kw5pKe5qOA5rWL77yM5omA5Lul5pqC5LiN6L+b6KGM57q/5q615Zyo55+p5b2i5YaF55qE56Kw5pKe5qOA5rWLXG4gICAgY29jb3MyZDo6Q0NQb2ludCBsZWZ0TGluZVN0YXJ0UG9pbnQgPSByZWN0bGVmdEJvdHRvbVBvaW50O1xuICAgIGNvY29zMmQ6OkNDUG9pbnQgbGVmdExpbmVFbmRQb2ludCAgID0gY29jb3MyZDo6Q0NQb2ludChsZWZ0TGluZVN0YXJ0UG9pbnQueCwgbGVmdExpbmVTdGFydFBvaW50LnkraGVpZ2h0KTtcblxuICAgIGNvY29zMmQ6OkNDUG9pbnQgcmlnaHRMaW5lU3RhcnRQb2ludD0gY29jb3MyZDo6Q0NQb2ludChsZWZ0TGluZVN0YXJ0UG9pbnQueCt3aWR0aCwgbGVmdExpbmVTdGFydFBvaW50LnkpO1xuICAgIGNvY29zMmQ6OkNDUG9pbnQgcmlnaHRMaW5lRW5kUG9pbnQgID0gY29jb3MyZDo6Q0NQb2ludChsZWZ0TGluZVN0YXJ0UG9pbnQueCt3aWR0aCwgbGVmdExpbmVTdGFydFBvaW50LnkraGVpZ2h0KTtcblxuICAgIGNvY29zMmQ6OkNDUG9pbnQgdG9wTGluZVN0YXJ0UG9pbnQgID0gY29jb3MyZDo6Q0NQb2ludChsZWZ0TGluZVN0YXJ0UG9pbnQueCwgbGVmdExpbmVTdGFydFBvaW50LnkraGVpZ2h0KTtcbiAgICBjb2NvczJkOjpDQ1BvaW50IHRvcExpbmVFbmRQb2ludCAgICA9IGNvY29zMmQ6OkNDUG9pbnQobGVmdExpbmVTdGFydFBvaW50Lngrd2lkdGgsIGxlZnRMaW5lU3RhcnRQb2ludC55K2hlaWdodCk7XG5cbiAgICBjb2NvczJkOjpDQ1BvaW50IGJvdHRvbUxpbmVTdGFydFBvaW50PSBjb2NvczJkOjpDQ1BvaW50KGxlZnRMaW5lU3RhcnRQb2ludC54LCBsZWZ0TGluZVN0YXJ0UG9pbnQueSk7XG4gICAgY29jb3MyZDo6Q0NQb2ludCBib3R0b21MaW5lRW5kUG9pbnQgID0gY29jb3MyZDo6Q0NQb2ludChsZWZ0TGluZVN0YXJ0UG9pbnQueCt3aWR0aCwgbGVmdExpbmVTdGFydFBvaW50LnkpO1xuICAgIFxuICAgIGNvY29zMmQ6OkNDUG9pbnQgbGVmdEJvdHRvbUxpbmVTdGFydFBvaW50PSByZWN0bGVmdEJvdHRvbVBvaW50O1xuICAgIGNvY29zMmQ6OkNDUG9pbnQgcmlnaHRUb3BMaW5lRW5kUG9pbnQgICAgPSByaWdodExpbmVFbmRQb2ludDtcblxuICAgIGNvY29zMmQ6OkNDUG9pbnQgbGVmdFRvcExpbmVTdGFydFBvaW50ICAgPSBsZWZ0TGluZUVuZFBvaW50O1xuICAgIGNvY29zMmQ6OkNDUG9pbnQgcmlnaHRCb3R0b21MaW5lRW5kUG9pbnQgPSByaWdodExpbmVTdGFydFBvaW50O1xuXG5cbiAgICBkbyBcbiAgICB7XG4gICAgICAgIGlmIChJc0xpbmVDb2xsaXNpb25MaW5lMihsaW5lU3RhcnRQb2ludCwgbGluZUVuZFBvaW50LCBsZWZ0TGluZVN0YXJ0UG9pbnQsIGxlZnRMaW5lRW5kUG9pbnQpKVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgaWYgKElzTGluZUNvbGxpc2lvbkxpbmUyKGxpbmVTdGFydFBvaW50LCBsaW5lRW5kUG9pbnQsIHJpZ2h0TGluZVN0YXJ0UG9pbnQsIHJpZ2h0TGluZUVuZFBvaW50KSlcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGlmIChJc0xpbmVDb2xsaXNpb25MaW5lMihsaW5lU3RhcnRQb2ludCwgbGluZUVuZFBvaW50LCB0b3BMaW5lU3RhcnRQb2ludCwgdG9wTGluZUVuZFBvaW50KSlcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGlmIChJc0xpbmVDb2xsaXNpb25MaW5lMihsaW5lU3RhcnRQb2ludCwgbGluZUVuZFBvaW50LCBib3R0b21MaW5lU3RhcnRQb2ludCwgYm90dG9tTGluZUVuZFBvaW50KSlcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGlmIChJc0xpbmVDb2xsaXNpb25MaW5lMihsaW5lU3RhcnRQb2ludCwgbGluZUVuZFBvaW50LCBsZWZ0Qm90dG9tTGluZVN0YXJ0UG9pbnQsIHJpZ2h0VG9wTGluZUVuZFBvaW50KSlcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGlmIChJc0xpbmVDb2xsaXNpb25MaW5lMihsaW5lU3RhcnRQb2ludCwgbGluZUVuZFBvaW50LCBsZWZ0VG9wTGluZVN0YXJ0UG9pbnQsIHJpZ2h0Qm90dG9tTGluZUVuZFBvaW50KSlcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IFxuICAgIHdoaWxlIChmYWxzZSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuc3RhdGljICBib29sICBJc1JlY3RDb2xsaXNpb25SZWN0Mihjb2NvczJkOjpDQ1BvaW50IHJlY3QxQ2VudGVyUG9pbnQsIGZsb2F0IHJlY3QxVywgZmxvYXQgcmVjdDFILCBjb2NvczJkOjpDQ1BvaW50IHJlY3QyQ2VudGVyUG9pbnQsIGZsb2F0IHJlY3QyVywgZmxvYXQgcmVjdDJIKVxue1xuICAgIGNvY29zMmQ6OkNDUG9pbnQgbGVmdFRvcFBvaW50ICAgICA9IGNvY29zMmQ6OkNDUG9pbnQocmVjdDJDZW50ZXJQb2ludC54LXJlY3QyVy8yLjBmLCByZWN0MkNlbnRlclBvaW50LnkrcmVjdDJILzIuMGYpO1xuICAgIGNvY29zMmQ6OkNDUG9pbnQgbGVmdEJvdHRvbVBvaW50ICA9IGNvY29zMmQ6OkNDUG9pbnQocmVjdDJDZW50ZXJQb2ludC54LXJlY3QyVy8yLjBmLCByZWN0MkNlbnRlclBvaW50LnktcmVjdDJILzIuMGYpO1xuICAgIGNvY29zMmQ6OkNDUG9pbnQgcmlnaHRUb3BQb2ludCAgICA9IGNvY29zMmQ6OkNDUG9pbnQocmVjdDJDZW50ZXJQb2ludC54K3JlY3QyVy8yLjBmLCByZWN0MkNlbnRlclBvaW50LnkrcmVjdDJILzIuMGYpO1xuICAgIGNvY29zMmQ6OkNDUG9pbnQgcmlnaHRCb3R0b21Qb2ludCA9IGNvY29zMmQ6OkNDUG9pbnQocmVjdDJDZW50ZXJQb2ludC54K3JlY3QyVy8yLjBmLCByZWN0MkNlbnRlclBvaW50LnktcmVjdDJILzIuMGYpO1xuXG4gICAgaWYgKCAobGVmdFRvcFBvaW50Lng+KHJlY3QxQ2VudGVyUG9pbnQueC1yZWN0MVcvMi4wZikpICYmIChsZWZ0VG9wUG9pbnQueDwocmVjdDFDZW50ZXJQb2ludC54K3JlY3QxVy8yLjBmKSkgXG4gICAgICAgICYmIChsZWZ0VG9wUG9pbnQueT4ocmVjdDFDZW50ZXJQb2ludC55LXJlY3QxSC8yLjBmKSkgJiYgKGxlZnRUb3BQb2ludC55PChyZWN0MUNlbnRlclBvaW50LnkrcmVjdDFILzIuMGYpKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICBpZiAoIChsZWZ0Qm90dG9tUG9pbnQueD4ocmVjdDFDZW50ZXJQb2ludC54LXJlY3QxVy8yLjBmKSkgJiYgKGxlZnRCb3R0b21Qb2ludC54PChyZWN0MUNlbnRlclBvaW50LngrcmVjdDFXLzIuMGYpKSBcbiAgICAgICAgJiYgKGxlZnRCb3R0b21Qb2ludC55PihyZWN0MUNlbnRlclBvaW50LnktcmVjdDFILzIuMGYpKSAmJiAobGVmdEJvdHRvbVBvaW50Lnk8KHJlY3QxQ2VudGVyUG9pbnQueStyZWN0MUgvMi4wZikpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGlmICggKHJpZ2h0VG9wUG9pbnQueD4ocmVjdDFDZW50ZXJQb2ludC54LXJlY3QxVy8yLjBmKSkgJiYgKHJpZ2h0VG9wUG9pbnQueDwocmVjdDFDZW50ZXJQb2ludC54K3JlY3QxVy8yLjBmKSkgXG4gICAgICAgICYmIChyaWdodFRvcFBvaW50Lnk+KHJlY3QxQ2VudGVyUG9pbnQueS1yZWN0MUgvMi4wZikpICYmIChyaWdodFRvcFBvaW50Lnk8KHJlY3QxQ2VudGVyUG9pbnQueStyZWN0MUgvMi4wZikpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGlmICggKHJpZ2h0Qm90dG9tUG9pbnQueD4ocmVjdDFDZW50ZXJQb2ludC54LXJlY3QxVy8yLjBmKSkgJiYgKHJpZ2h0Qm90dG9tUG9pbnQueDwocmVjdDFDZW50ZXJQb2ludC54K3JlY3QxVy8yLjBmKSkgXG4gICAgICAgICYmIChyaWdodEJvdHRvbVBvaW50Lnk+KHJlY3QxQ2VudGVyUG9pbnQueS1yZWN0MUgvMi4wZikpICYmIChyaWdodEJvdHRvbVBvaW50Lnk8KHJlY3QxQ2VudGVyUG9pbnQueStyZWN0MUgvMi4wZikpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy8g55+p5b2i5ZKM55+p5b2i56Kw5pKe5qOA5rWLXG5ib29sICBJc1JlY3RDb2xsaXNpb25SZWN0KGNvY29zMmQ6OkNDUG9pbnQgcmVjdDFDZW50ZXJQb2ludCwgZmxvYXQgcmVjdDFXLCBmbG9hdCByZWN0MUgsIGNvY29zMmQ6OkNDUG9pbnQgcmVjdDJDZW50ZXJQb2ludCwgZmxvYXQgcmVjdDJXLCBmbG9hdCByZWN0MkgpXG57XG4gICAgaWYgKElzUmVjdENvbGxpc2lvblJlY3QyKHJlY3QxQ2VudGVyUG9pbnQsIHJlY3QxVywgcmVjdDFILCByZWN0MkNlbnRlclBvaW50LCByZWN0MlcsIHJlY3QySCkpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIFxuICAgIGlmIChJc1JlY3RDb2xsaXNpb25SZWN0MihyZWN0MkNlbnRlclBvaW50LCByZWN0MlcsIHJlY3QySCwgcmVjdDFDZW50ZXJQb2ludCwgcmVjdDFXLCByZWN0MUgpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuKiovIl19