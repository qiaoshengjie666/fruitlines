"use strict";
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