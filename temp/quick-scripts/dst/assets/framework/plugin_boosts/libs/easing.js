
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/plugin_boosts/libs/easing.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e6742QWT6FGKZZTNPiWFV4s', 'easing');
// framework/plugin_boosts/libs/easing.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.easeInOutBounce = exports.easeOutBounce = exports.easeInBounce = exports.easeInOutBack = exports.easeOutBack = exports.easeInBack = exports.easeInOutElastic = exports.easeOutElastic = exports.easeInElastic = exports.easeInOutCirc = exports.easeOutCirc = exports.easeInCirc = exports.easeInOutExpo = exports.easeOutExpo = exports.easeInExpo = exports.easeInOutSine = exports.easeOutSine = exports.easeInSine = exports.easeInOutQuint = exports.easeOutQuint = exports.easeInQuint = exports.easeInOutQuart = exports.easeOutQuart = exports.easeInQuart = exports.easeInOutCubic = exports.easeOutCubic = exports.easeInCubic = exports.easeInOutQuad = exports.easeOutQuad = exports.easeInQuad = exports.linear = void 0;
function linear(t, b, c, d) {
    return c * t / d + b;
}
exports.linear = linear;
function easeInQuad(elapsed, initialValue, amountOfChange, duration) {
    return amountOfChange * (elapsed /= duration) * elapsed + initialValue;
}
exports.easeInQuad = easeInQuad;
function easeOutQuad(elapsed, initialValue, amountOfChange, duration) {
    return -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue;
}
exports.easeOutQuad = easeOutQuad;
function easeInOutQuad(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed + initialValue;
    }
    return -amountOfChange / 2 * (--elapsed * (elapsed - 2) - 1) + initialValue;
}
exports.easeInOutQuad = easeInOutQuad;
function easeInCubic(elapsed, initialValue, amountOfChange, duration) {
    return amountOfChange * (elapsed /= duration) * elapsed * elapsed + initialValue;
}
exports.easeInCubic = easeInCubic;
function easeOutCubic(elapsed, initialValue, amountOfChange, duration) {
    return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed + 1) + initialValue;
}
exports.easeOutCubic = easeOutCubic;
function easeInOutCubic(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed * elapsed + initialValue;
    }
    return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue;
}
exports.easeInOutCubic = easeInOutCubic;
function easeInQuart(elapsed, initialValue, amountOfChange, duration) {
    return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed + initialValue;
}
exports.easeInQuart = easeInQuart;
function easeOutQuart(elapsed, initialValue, amountOfChange, duration) {
    return -amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed - 1) + initialValue;
}
exports.easeOutQuart = easeOutQuart;
function easeInOutQuart(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed + initialValue;
    }
    return -amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) + initialValue;
}
exports.easeInOutQuart = easeInOutQuart;
function easeInQuint(elapsed, initialValue, amountOfChange, duration) {
    return amountOfChange * (elapsed /= duration) * elapsed * elapsed * elapsed * elapsed + initialValue;
}
exports.easeInQuint = easeInQuint;
function easeOutQuint(elapsed, initialValue, amountOfChange, duration) {
    return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed * elapsed + 1) + initialValue;
}
exports.easeOutQuint = easeOutQuint;
function easeInOutQuint(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed * elapsed + initialValue;
    }
    return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed * elapsed + 2) + initialValue;
}
exports.easeInOutQuint = easeInOutQuint;
function easeInSine(elapsed, initialValue, amountOfChange, duration) {
    return -amountOfChange * Math.cos(elapsed / duration * (Math.PI / 2)) + amountOfChange + initialValue;
}
exports.easeInSine = easeInSine;
function easeOutSine(elapsed, initialValue, amountOfChange, duration) {
    return amountOfChange * Math.sin(elapsed / duration * (Math.PI / 2)) + initialValue;
}
exports.easeOutSine = easeOutSine;
function easeInOutSine(elapsed, initialValue, amountOfChange, duration) {
    return -amountOfChange / 2 * (Math.cos(Math.PI * elapsed / duration) - 1) + initialValue;
}
exports.easeInOutSine = easeInOutSine;
function easeInExpo(elapsed, initialValue, amountOfChange, duration) {
    return elapsed === 0 ? initialValue : amountOfChange * Math.pow(2, 10 * (elapsed / duration - 1)) + initialValue;
}
exports.easeInExpo = easeInExpo;
function easeOutExpo(elapsed, initialValue, amountOfChange, duration) {
    return elapsed === duration
        ? initialValue + amountOfChange
        : amountOfChange * (-Math.pow(2, -10 * elapsed / duration) + 1) + initialValue;
}
exports.easeOutExpo = easeOutExpo;
function easeInOutExpo(elapsed, initialValue, amountOfChange, duration) {
    if (elapsed === 0) {
        return initialValue;
    }
    if (elapsed === duration) {
        return initialValue + amountOfChange;
    }
    if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * Math.pow(2, 10 * (elapsed - 1)) + initialValue;
    }
    return amountOfChange / 2 * (-Math.pow(2, -10 * --elapsed) + 2) + initialValue;
}
exports.easeInOutExpo = easeInOutExpo;
function easeInCirc(elapsed, initialValue, amountOfChange, duration) {
    return -amountOfChange * (Math.sqrt(1 - (elapsed /= duration) * elapsed) - 1) + initialValue;
}
exports.easeInCirc = easeInCirc;
function easeOutCirc(elapsed, initialValue, amountOfChange, duration) {
    return amountOfChange * Math.sqrt(1 - (elapsed = elapsed / duration - 1) * elapsed) + initialValue;
}
exports.easeOutCirc = easeOutCirc;
function easeInOutCirc(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration / 2) < 1) {
        return -amountOfChange / 2 * (Math.sqrt(1 - elapsed * elapsed) - 1) + initialValue;
    }
    return amountOfChange / 2 * (Math.sqrt(1 - (elapsed -= 2) * elapsed) + 1) + initialValue;
}
exports.easeInOutCirc = easeInOutCirc;
function easeInElastic(elapsed, initialValue, amountOfChange, duration) {
    var s = 1.70158;
    var p = 0;
    var a = amountOfChange;
    if (elapsed === 0) {
        return initialValue;
    }
    if ((elapsed /= duration) === 1) {
        return initialValue + amountOfChange;
    }
    if (!p) {
        p = duration * 0.3;
    }
    if (a < Math.abs(amountOfChange)) {
        a = amountOfChange;
        s = p / 4;
    }
    else {
        s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
    }
    return -(a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p)) + initialValue;
}
exports.easeInElastic = easeInElastic;
function easeOutElastic(elapsed, initialValue, amountOfChange, duration) {
    var s = 1.70158;
    var p = 0;
    var a = amountOfChange;
    if (elapsed === 0) {
        return initialValue;
    }
    if ((elapsed /= duration) === 1) {
        return initialValue + amountOfChange;
    }
    if (!p) {
        p = duration * 0.3;
    }
    if (a < Math.abs(amountOfChange)) {
        a = amountOfChange;
        s = p / 4;
    }
    else {
        s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
    }
    return a * Math.pow(2, -10 * elapsed) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) + amountOfChange + initialValue;
}
exports.easeOutElastic = easeOutElastic;
function easeInOutElastic(elapsed, initialValue, amountOfChange, duration) {
    var s = 1.70158;
    var p = 0;
    var a = amountOfChange;
    if (elapsed === 0) {
        return initialValue;
    }
    if ((elapsed /= duration / 2) === 2) {
        return initialValue + amountOfChange;
    }
    if (!p) {
        p = duration * (0.3 * 1.5);
    }
    if (a < Math.abs(amountOfChange)) {
        a = amountOfChange;
        s = p / 4;
    }
    else {
        s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
    }
    if (elapsed < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p)) + initialValue;
    }
    return (a * Math.pow(2, -10 * (elapsed -= 1)) * Math.sin((elapsed * duration - s) * (2 * Math.PI) / p) * 0.5 + amountOfChange + initialValue);
}
exports.easeInOutElastic = easeInOutElastic;
function easeInBack(elapsed, initialValue, amountOfChange, duration, s) {
    if (s === void 0) { s = 1.70158; }
    return amountOfChange * (elapsed /= duration) * elapsed * ((s + 1) * elapsed - s) + initialValue;
}
exports.easeInBack = easeInBack;
function easeOutBack(elapsed, initialValue, amountOfChange, duration, s) {
    if (s === void 0) { s = 1.70158; }
    return amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * ((s + 1) * elapsed + s) + 1) + initialValue;
}
exports.easeOutBack = easeOutBack;
function easeInOutBack(elapsed, initialValue, amountOfChange, duration, s) {
    if (s === void 0) { s = 1.70158; }
    if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * (elapsed * elapsed * (((s *= 1.525) + 1) * elapsed - s)) + initialValue;
    }
    return amountOfChange / 2 * ((elapsed -= 2) * elapsed * (((s *= 1.525) + 1) * elapsed + s) + 2) + initialValue;
}
exports.easeInOutBack = easeInOutBack;
function easeInBounce(elapsed, initialValue, amountOfChange, duration) {
    return amountOfChange - easeOutBounce(duration - elapsed, 0, amountOfChange, duration) + initialValue;
}
exports.easeInBounce = easeInBounce;
function easeOutBounce(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration) < 1 / 2.75) {
        return amountOfChange * (7.5625 * elapsed * elapsed) + initialValue;
    }
    else if (elapsed < 2 / 2.75) {
        return amountOfChange * (7.5625 * (elapsed -= 1.5 / 2.75) * elapsed + 0.75) + initialValue;
    }
    else if (elapsed < 2.5 / 2.75) {
        return amountOfChange * (7.5625 * (elapsed -= 2.25 / 2.75) * elapsed + 0.9375) + initialValue;
    }
    else {
        return amountOfChange * (7.5625 * (elapsed -= 2.625 / 2.75) * elapsed + 0.984375) + initialValue;
    }
}
exports.easeOutBounce = easeOutBounce;
function easeInOutBounce(elapsed, initialValue, amountOfChange, duration) {
    if (elapsed < duration / 2) {
        return easeInBounce(elapsed * 2, 0, amountOfChange, duration) * 0.5 + initialValue;
    }
    return easeOutBounce(elapsed * 2 - duration, 0, amountOfChange, duration) * 0.5 + amountOfChange * 0.5 + initialValue;
}
exports.easeInOutBounce = easeInOutBounce;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxwbHVnaW5fYm9vc3RzXFxsaWJzXFxlYXNpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxTQUFnQixNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztJQUU3QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNyQixDQUFDO0FBSEQsd0JBR0M7QUFFRCxTQUFnQixVQUFVLENBQUMsT0FBZSxFQUFFLFlBQW9CLEVBQUUsY0FBc0IsRUFBRSxRQUFnQjtJQUN6RyxPQUFPLGNBQWMsR0FBRyxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsR0FBRyxPQUFPLEdBQUcsWUFBWSxDQUFDO0FBQ3hFLENBQUM7QUFGRCxnQ0FFQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxPQUFlLEVBQUUsWUFBb0IsRUFBRSxjQUFzQixFQUFFLFFBQWdCO0lBQzFHLE9BQU8sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDO0FBQy9FLENBQUM7QUFGRCxrQ0FFQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxPQUFlLEVBQUUsWUFBb0IsRUFBRSxjQUFzQixFQUFFLFFBQWdCO0lBQzVHLElBQUksQ0FBQyxPQUFPLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNsQyxPQUFPLGNBQWMsR0FBRyxDQUFDLEdBQUcsT0FBTyxHQUFHLE9BQU8sR0FBRyxZQUFZLENBQUM7S0FDN0Q7SUFDRCxPQUFPLENBQUMsY0FBYyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQztBQUM3RSxDQUFDO0FBTEQsc0NBS0M7QUFFRCxT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QUFDO0tBQ3BFO1NBQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRTtRQUM5QixPQUFPLGNBQWMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQztLQUMzRjtTQUFNLElBQUksT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUU7UUFDaEMsT0FBTyxjQUFjLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxZQUFZLENBQUM7S0FDOUY7U0FBTTtRQUNOLE9BQU8sY0FBYyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsT0FBTyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsWUFBWSxDQUFDO0tBQ2pHO0FBQ0YsQ0FBQztBQVZELHNDQVVDO0FBRUQsU0FBZ0IsZUFBZSxDQUFDLE9BQWUsRUFBRSxZQUFvQixFQUFFLGNBQXNCLEVBQUUsUUFBZ0I7SUFDOUcsSUFBSSxPQUFPLEdBQUcsUUFBUSxHQUFHLENBQUMsRUFBRTtRQUMzQixPQUFPLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQztLQUNuRjtJQUNELE9BQU8sYUFBYSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLGNBQWMsR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDO0FBQ3ZILENBQUM7QUFMRCwwQ0FLQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVhcih0LGIsYyxkKTpudW1iZXJcbntcblx0cmV0dXJuIGMgKiB0IC8gZCArIGIgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFkKGVsYXBzZWQ6IG51bWJlciwgaW5pdGlhbFZhbHVlOiBudW1iZXIsIGFtb3VudE9mQ2hhbmdlOiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuXHRyZXR1cm4gYW1vdW50T2ZDaGFuZ2UgKiAoZWxhcHNlZCAvPSBkdXJhdGlvbikgKiBlbGFwc2VkICsgaW5pdGlhbFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1YWQoZWxhcHNlZDogbnVtYmVyLCBpbml0aWFsVmFsdWU6IG51bWJlciwgYW1vdW50T2ZDaGFuZ2U6IG51bWJlciwgZHVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG5cdHJldHVybiAtYW1vdW50T2ZDaGFuZ2UgKiAoZWxhcHNlZCAvPSBkdXJhdGlvbikgKiAoZWxhcHNlZCAtIDIpICsgaW5pdGlhbFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVhZChlbGFwc2VkOiBudW1iZXIsIGluaXRpYWxWYWx1ZTogbnVtYmVyLCBhbW91bnRPZkNoYW5nZTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcblx0aWYgKChlbGFwc2VkIC89IGR1cmF0aW9uIC8gMikgPCAxKSB7XG5cdFx0cmV0dXJuIGFtb3VudE9mQ2hhbmdlIC8gMiAqIGVsYXBzZWQgKiBlbGFwc2VkICsgaW5pdGlhbFZhbHVlO1xuXHR9XG5cdHJldHVybiAtYW1vdW50T2ZDaGFuZ2UgLyAyICogKC0tZWxhcHNlZCAqIChlbGFwc2VkIC0gMikgLSAxKSArIGluaXRpYWxWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkN1YmljKGVsYXBzZWQ6IG51bWJlciwgaW5pdGlhbFZhbHVlOiBudW1iZXIsIGFtb3VudE9mQ2hhbmdlOiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuXHRyZXR1cm4gYW1vdW50T2ZDaGFuZ2UgKiAoZWxhcHNlZCAvPSBkdXJhdGlvbikgKiBlbGFwc2VkICogZWxhcHNlZCArIGluaXRpYWxWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRDdWJpYyhlbGFwc2VkOiBudW1iZXIsIGluaXRpYWxWYWx1ZTogbnVtYmVyLCBhbW91bnRPZkNoYW5nZTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcblx0cmV0dXJuIGFtb3VudE9mQ2hhbmdlICogKChlbGFwc2VkID0gZWxhcHNlZCAvIGR1cmF0aW9uIC0gMSkgKiBlbGFwc2VkICogZWxhcHNlZCArIDEpICsgaW5pdGlhbFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0Q3ViaWMoZWxhcHNlZDogbnVtYmVyLCBpbml0aWFsVmFsdWU6IG51bWJlciwgYW1vdW50T2ZDaGFuZ2U6IG51bWJlciwgZHVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG5cdGlmICgoZWxhcHNlZCAvPSBkdXJhdGlvbiAvIDIpIDwgMSkge1xuXHRcdHJldHVybiBhbW91bnRPZkNoYW5nZSAvIDIgKiBlbGFwc2VkICogZWxhcHNlZCAqIGVsYXBzZWQgKyBpbml0aWFsVmFsdWU7XG5cdH1cblx0cmV0dXJuIGFtb3VudE9mQ2hhbmdlIC8gMiAqICgoZWxhcHNlZCAtPSAyKSAqIGVsYXBzZWQgKiBlbGFwc2VkICsgMikgKyBpbml0aWFsVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFydChlbGFwc2VkOiBudW1iZXIsIGluaXRpYWxWYWx1ZTogbnVtYmVyLCBhbW91bnRPZkNoYW5nZTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcblx0cmV0dXJuIGFtb3VudE9mQ2hhbmdlICogKGVsYXBzZWQgLz0gZHVyYXRpb24pICogZWxhcHNlZCAqIGVsYXBzZWQgKiBlbGFwc2VkICsgaW5pdGlhbFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1YXJ0KGVsYXBzZWQ6IG51bWJlciwgaW5pdGlhbFZhbHVlOiBudW1iZXIsIGFtb3VudE9mQ2hhbmdlOiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuXHRyZXR1cm4gLWFtb3VudE9mQ2hhbmdlICogKChlbGFwc2VkID0gZWxhcHNlZCAvIGR1cmF0aW9uIC0gMSkgKiBlbGFwc2VkICogZWxhcHNlZCAqIGVsYXBzZWQgLSAxKSArIGluaXRpYWxWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YXJ0KGVsYXBzZWQ6IG51bWJlciwgaW5pdGlhbFZhbHVlOiBudW1iZXIsIGFtb3VudE9mQ2hhbmdlOiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuXHRpZiAoKGVsYXBzZWQgLz0gZHVyYXRpb24gLyAyKSA8IDEpIHtcblx0XHRyZXR1cm4gYW1vdW50T2ZDaGFuZ2UgLyAyICogZWxhcHNlZCAqIGVsYXBzZWQgKiBlbGFwc2VkICogZWxhcHNlZCArIGluaXRpYWxWYWx1ZTtcblx0fVxuXHRyZXR1cm4gLWFtb3VudE9mQ2hhbmdlIC8gMiAqICgoZWxhcHNlZCAtPSAyKSAqIGVsYXBzZWQgKiBlbGFwc2VkICogZWxhcHNlZCAtIDIpICsgaW5pdGlhbFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluUXVpbnQoZWxhcHNlZDogbnVtYmVyLCBpbml0aWFsVmFsdWU6IG51bWJlciwgYW1vdW50T2ZDaGFuZ2U6IG51bWJlciwgZHVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG5cdHJldHVybiBhbW91bnRPZkNoYW5nZSAqIChlbGFwc2VkIC89IGR1cmF0aW9uKSAqIGVsYXBzZWQgKiBlbGFwc2VkICogZWxhcHNlZCAqIGVsYXBzZWQgKyBpbml0aWFsVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVpbnQoZWxhcHNlZDogbnVtYmVyLCBpbml0aWFsVmFsdWU6IG51bWJlciwgYW1vdW50T2ZDaGFuZ2U6IG51bWJlciwgZHVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG5cdHJldHVybiBhbW91bnRPZkNoYW5nZSAqICgoZWxhcHNlZCA9IGVsYXBzZWQgLyBkdXJhdGlvbiAtIDEpICogZWxhcHNlZCAqIGVsYXBzZWQgKiBlbGFwc2VkICogZWxhcHNlZCArIDEpICsgaW5pdGlhbFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVpbnQoZWxhcHNlZDogbnVtYmVyLCBpbml0aWFsVmFsdWU6IG51bWJlciwgYW1vdW50T2ZDaGFuZ2U6IG51bWJlciwgZHVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG5cdGlmICgoZWxhcHNlZCAvPSBkdXJhdGlvbiAvIDIpIDwgMSkge1xuXHRcdHJldHVybiBhbW91bnRPZkNoYW5nZSAvIDIgKiBlbGFwc2VkICogZWxhcHNlZCAqIGVsYXBzZWQgKiBlbGFwc2VkICogZWxhcHNlZCArIGluaXRpYWxWYWx1ZTtcblx0fVxuXHRyZXR1cm4gYW1vdW50T2ZDaGFuZ2UgLyAyICogKChlbGFwc2VkIC09IDIpICogZWxhcHNlZCAqIGVsYXBzZWQgKiBlbGFwc2VkICogZWxhcHNlZCArIDIpICsgaW5pdGlhbFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluU2luZShlbGFwc2VkOiBudW1iZXIsIGluaXRpYWxWYWx1ZTogbnVtYmVyLCBhbW91bnRPZkNoYW5nZTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcblx0cmV0dXJuIC1hbW91bnRPZkNoYW5nZSAqIE1hdGguY29zKGVsYXBzZWQgLyBkdXJhdGlvbiAqIChNYXRoLlBJIC8gMikpICsgYW1vdW50T2ZDaGFuZ2UgKyBpbml0aWFsVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0U2luZShlbGFwc2VkOiBudW1iZXIsIGluaXRpYWxWYWx1ZTogbnVtYmVyLCBhbW91bnRPZkNoYW5nZTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcblx0cmV0dXJuIGFtb3VudE9mQ2hhbmdlICogTWF0aC5zaW4oZWxhcHNlZCAvIGR1cmF0aW9uICogKE1hdGguUEkgLyAyKSkgKyBpbml0aWFsVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRTaW5lKGVsYXBzZWQ6IG51bWJlciwgaW5pdGlhbFZhbHVlOiBudW1iZXIsIGFtb3VudE9mQ2hhbmdlOiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuXHRyZXR1cm4gLWFtb3VudE9mQ2hhbmdlIC8gMiAqIChNYXRoLmNvcyhNYXRoLlBJICogZWxhcHNlZCAvIGR1cmF0aW9uKSAtIDEpICsgaW5pdGlhbFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluRXhwbyhlbGFwc2VkOiBudW1iZXIsIGluaXRpYWxWYWx1ZTogbnVtYmVyLCBhbW91bnRPZkNoYW5nZTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcblx0cmV0dXJuIGVsYXBzZWQgPT09IDAgPyBpbml0aWFsVmFsdWUgOiBhbW91bnRPZkNoYW5nZSAqIE1hdGgucG93KDIsIDEwICogKGVsYXBzZWQgLyBkdXJhdGlvbiAtIDEpKSArIGluaXRpYWxWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRFeHBvKGVsYXBzZWQ6IG51bWJlciwgaW5pdGlhbFZhbHVlOiBudW1iZXIsIGFtb3VudE9mQ2hhbmdlOiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuXHRyZXR1cm4gZWxhcHNlZCA9PT0gZHVyYXRpb25cblx0XHQ/IGluaXRpYWxWYWx1ZSArIGFtb3VudE9mQ2hhbmdlXG5cdFx0OiBhbW91bnRPZkNoYW5nZSAqICgtTWF0aC5wb3coMiwgLTEwICogZWxhcHNlZCAvIGR1cmF0aW9uKSArIDEpICsgaW5pdGlhbFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0RXhwbyhlbGFwc2VkOiBudW1iZXIsIGluaXRpYWxWYWx1ZTogbnVtYmVyLCBhbW91bnRPZkNoYW5nZTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcblx0aWYgKGVsYXBzZWQgPT09IDApIHtcblx0XHRyZXR1cm4gaW5pdGlhbFZhbHVlO1xuXHR9XG5cdGlmIChlbGFwc2VkID09PSBkdXJhdGlvbikge1xuXHRcdHJldHVybiBpbml0aWFsVmFsdWUgKyBhbW91bnRPZkNoYW5nZTtcblx0fVxuXHRpZiAoKGVsYXBzZWQgLz0gZHVyYXRpb24gLyAyKSA8IDEpIHtcblx0XHRyZXR1cm4gYW1vdW50T2ZDaGFuZ2UgLyAyICogTWF0aC5wb3coMiwgMTAgKiAoZWxhcHNlZCAtIDEpKSArIGluaXRpYWxWYWx1ZTtcblx0fVxuXHRyZXR1cm4gYW1vdW50T2ZDaGFuZ2UgLyAyICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLWVsYXBzZWQpICsgMikgKyBpbml0aWFsVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5DaXJjKGVsYXBzZWQ6IG51bWJlciwgaW5pdGlhbFZhbHVlOiBudW1iZXIsIGFtb3VudE9mQ2hhbmdlOiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuXHRyZXR1cm4gLWFtb3VudE9mQ2hhbmdlICogKE1hdGguc3FydCgxIC0gKGVsYXBzZWQgLz0gZHVyYXRpb24pICogZWxhcHNlZCkgLSAxKSArIGluaXRpYWxWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRDaXJjKGVsYXBzZWQ6IG51bWJlciwgaW5pdGlhbFZhbHVlOiBudW1iZXIsIGFtb3VudE9mQ2hhbmdlOiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuXHRyZXR1cm4gYW1vdW50T2ZDaGFuZ2UgKiBNYXRoLnNxcnQoMSAtIChlbGFwc2VkID0gZWxhcHNlZCAvIGR1cmF0aW9uIC0gMSkgKiBlbGFwc2VkKSArIGluaXRpYWxWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dENpcmMoZWxhcHNlZDogbnVtYmVyLCBpbml0aWFsVmFsdWU6IG51bWJlciwgYW1vdW50T2ZDaGFuZ2U6IG51bWJlciwgZHVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG5cdGlmICgoZWxhcHNlZCAvPSBkdXJhdGlvbiAvIDIpIDwgMSkge1xuXHRcdHJldHVybiAtYW1vdW50T2ZDaGFuZ2UgLyAyICogKE1hdGguc3FydCgxIC0gZWxhcHNlZCAqIGVsYXBzZWQpIC0gMSkgKyBpbml0aWFsVmFsdWU7XG5cdH1cblx0cmV0dXJuIGFtb3VudE9mQ2hhbmdlIC8gMiAqIChNYXRoLnNxcnQoMSAtIChlbGFwc2VkIC09IDIpICogZWxhcHNlZCkgKyAxKSArIGluaXRpYWxWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkVsYXN0aWMoZWxhcHNlZDogbnVtYmVyLCBpbml0aWFsVmFsdWU6IG51bWJlciwgYW1vdW50T2ZDaGFuZ2U6IG51bWJlciwgZHVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG5cdGxldCBzID0gMS43MDE1ODtcblx0bGV0IHAgPSAwO1xuXHRsZXQgYSA9IGFtb3VudE9mQ2hhbmdlO1xuXHRpZiAoZWxhcHNlZCA9PT0gMCkge1xuXHRcdHJldHVybiBpbml0aWFsVmFsdWU7XG5cdH1cblx0aWYgKChlbGFwc2VkIC89IGR1cmF0aW9uKSA9PT0gMSkge1xuXHRcdHJldHVybiBpbml0aWFsVmFsdWUgKyBhbW91bnRPZkNoYW5nZTtcblx0fVxuXHRpZiAoIXApIHtcblx0XHRwID0gZHVyYXRpb24gKiAwLjM7XG5cdH1cblx0aWYgKGEgPCBNYXRoLmFicyhhbW91bnRPZkNoYW5nZSkpIHtcblx0XHRhID0gYW1vdW50T2ZDaGFuZ2U7XG5cdFx0cyA9IHAgLyA0O1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihhbW91bnRPZkNoYW5nZSAvIGEpO1xuXHR9XG5cdHJldHVybiAtKGEgKiBNYXRoLnBvdygyLCAxMCAqIChlbGFwc2VkIC09IDEpKSAqIE1hdGguc2luKChlbGFwc2VkICogZHVyYXRpb24gLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSkgKyBpbml0aWFsVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0RWxhc3RpYyhlbGFwc2VkOiBudW1iZXIsIGluaXRpYWxWYWx1ZTogbnVtYmVyLCBhbW91bnRPZkNoYW5nZTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcblx0bGV0IHMgPSAxLjcwMTU4O1xuXHRsZXQgcCA9IDA7XG5cdGxldCBhID0gYW1vdW50T2ZDaGFuZ2U7XG5cdGlmIChlbGFwc2VkID09PSAwKSB7XG5cdFx0cmV0dXJuIGluaXRpYWxWYWx1ZTtcblx0fVxuXHRpZiAoKGVsYXBzZWQgLz0gZHVyYXRpb24pID09PSAxKSB7XG5cdFx0cmV0dXJuIGluaXRpYWxWYWx1ZSArIGFtb3VudE9mQ2hhbmdlO1xuXHR9XG5cdGlmICghcCkge1xuXHRcdHAgPSBkdXJhdGlvbiAqIDAuMztcblx0fVxuXHRpZiAoYSA8IE1hdGguYWJzKGFtb3VudE9mQ2hhbmdlKSkge1xuXHRcdGEgPSBhbW91bnRPZkNoYW5nZTtcblx0XHRzID0gcCAvIDQ7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGFtb3VudE9mQ2hhbmdlIC8gYSk7XG5cdH1cblx0cmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiBlbGFwc2VkKSAqIE1hdGguc2luKChlbGFwc2VkICogZHVyYXRpb24gLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSArIGFtb3VudE9mQ2hhbmdlICsgaW5pdGlhbFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0RWxhc3RpYyhlbGFwc2VkOiBudW1iZXIsIGluaXRpYWxWYWx1ZTogbnVtYmVyLCBhbW91bnRPZkNoYW5nZTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcblx0bGV0IHMgPSAxLjcwMTU4O1xuXHRsZXQgcCA9IDA7XG5cdGxldCBhID0gYW1vdW50T2ZDaGFuZ2U7XG5cdGlmIChlbGFwc2VkID09PSAwKSB7XG5cdFx0cmV0dXJuIGluaXRpYWxWYWx1ZTtcblx0fVxuXHRpZiAoKGVsYXBzZWQgLz0gZHVyYXRpb24gLyAyKSA9PT0gMikge1xuXHRcdHJldHVybiBpbml0aWFsVmFsdWUgKyBhbW91bnRPZkNoYW5nZTtcblx0fVxuXHRpZiAoIXApIHtcblx0XHRwID0gZHVyYXRpb24gKiAoMC4zICogMS41KTtcblx0fVxuXHRpZiAoYSA8IE1hdGguYWJzKGFtb3VudE9mQ2hhbmdlKSkge1xuXHRcdGEgPSBhbW91bnRPZkNoYW5nZTtcblx0XHRzID0gcCAvIDQ7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGFtb3VudE9mQ2hhbmdlIC8gYSk7XG5cdH1cblx0aWYgKGVsYXBzZWQgPCAxKSB7XG5cdFx0cmV0dXJuIC0wLjUgKiAoYSAqIE1hdGgucG93KDIsIDEwICogKGVsYXBzZWQgLT0gMSkpICogTWF0aC5zaW4oKGVsYXBzZWQgKiBkdXJhdGlvbiAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKSArIGluaXRpYWxWYWx1ZTtcblx0fVxuXHRyZXR1cm4gKFxuXHRcdGEgKiBNYXRoLnBvdygyLCAtMTAgKiAoZWxhcHNlZCAtPSAxKSkgKiBNYXRoLnNpbigoZWxhcHNlZCAqIGR1cmF0aW9uIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAwLjUgKyBhbW91bnRPZkNoYW5nZSArIGluaXRpYWxWYWx1ZVxuXHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluQmFjayhlbGFwc2VkOiBudW1iZXIsIGluaXRpYWxWYWx1ZTogbnVtYmVyLCBhbW91bnRPZkNoYW5nZTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyLCBzOiBudW1iZXIgPSAxLjcwMTU4KTogbnVtYmVyIHtcblx0cmV0dXJuIGFtb3VudE9mQ2hhbmdlICogKGVsYXBzZWQgLz0gZHVyYXRpb24pICogZWxhcHNlZCAqICgocyArIDEpICogZWxhcHNlZCAtIHMpICsgaW5pdGlhbFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEJhY2soZWxhcHNlZDogbnVtYmVyLCBpbml0aWFsVmFsdWU6IG51bWJlciwgYW1vdW50T2ZDaGFuZ2U6IG51bWJlciwgZHVyYXRpb246IG51bWJlciwgczogbnVtYmVyID0gMS43MDE1OCk6IG51bWJlciB7XG5cdHJldHVybiBhbW91bnRPZkNoYW5nZSAqICgoZWxhcHNlZCA9IGVsYXBzZWQgLyBkdXJhdGlvbiAtIDEpICogZWxhcHNlZCAqICgocyArIDEpICogZWxhcHNlZCArIHMpICsgMSkgKyBpbml0aWFsVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRCYWNrKFxuXHRlbGFwc2VkOiBudW1iZXIsXG5cdGluaXRpYWxWYWx1ZTogbnVtYmVyLFxuXHRhbW91bnRPZkNoYW5nZTogbnVtYmVyLFxuXHRkdXJhdGlvbjogbnVtYmVyLFxuXHRzOiBudW1iZXIgPSAxLjcwMTU4XG4pOiBudW1iZXIge1xuXHRpZiAoKGVsYXBzZWQgLz0gZHVyYXRpb24gLyAyKSA8IDEpIHtcblx0XHRyZXR1cm4gYW1vdW50T2ZDaGFuZ2UgLyAyICogKGVsYXBzZWQgKiBlbGFwc2VkICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIGVsYXBzZWQgLSBzKSkgKyBpbml0aWFsVmFsdWU7XG5cdH1cblx0cmV0dXJuIGFtb3VudE9mQ2hhbmdlIC8gMiAqICgoZWxhcHNlZCAtPSAyKSAqIGVsYXBzZWQgKiAoKChzICo9IDEuNTI1KSArIDEpICogZWxhcHNlZCArIHMpICsgMikgKyBpbml0aWFsVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5Cb3VuY2UoZWxhcHNlZDogbnVtYmVyLCBpbml0aWFsVmFsdWU6IG51bWJlciwgYW1vdW50T2ZDaGFuZ2U6IG51bWJlciwgZHVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG5cdHJldHVybiBhbW91bnRPZkNoYW5nZSAtIGVhc2VPdXRCb3VuY2UoZHVyYXRpb24gLSBlbGFwc2VkLCAwLCBhbW91bnRPZkNoYW5nZSwgZHVyYXRpb24pICsgaW5pdGlhbFZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWFzZU91dEJvdW5jZShlbGFwc2VkOiBudW1iZXIsIGluaXRpYWxWYWx1ZTogbnVtYmVyLCBhbW91bnRPZkNoYW5nZTogbnVtYmVyLCBkdXJhdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcblx0aWYgKChlbGFwc2VkIC89IGR1cmF0aW9uKSA8IDEgLyAyLjc1KSB7XG5cdFx0cmV0dXJuIGFtb3VudE9mQ2hhbmdlICogKDcuNTYyNSAqIGVsYXBzZWQgKiBlbGFwc2VkKSArIGluaXRpYWxWYWx1ZTtcblx0fSBlbHNlIGlmIChlbGFwc2VkIDwgMiAvIDIuNzUpIHtcblx0XHRyZXR1cm4gYW1vdW50T2ZDaGFuZ2UgKiAoNy41NjI1ICogKGVsYXBzZWQgLT0gMS41IC8gMi43NSkgKiBlbGFwc2VkICsgMC43NSkgKyBpbml0aWFsVmFsdWU7XG5cdH0gZWxzZSBpZiAoZWxhcHNlZCA8IDIuNSAvIDIuNzUpIHtcblx0XHRyZXR1cm4gYW1vdW50T2ZDaGFuZ2UgKiAoNy41NjI1ICogKGVsYXBzZWQgLT0gMi4yNSAvIDIuNzUpICogZWxhcHNlZCArIDAuOTM3NSkgKyBpbml0aWFsVmFsdWU7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGFtb3VudE9mQ2hhbmdlICogKDcuNTYyNSAqIChlbGFwc2VkIC09IDIuNjI1IC8gMi43NSkgKiBlbGFwc2VkICsgMC45ODQzNzUpICsgaW5pdGlhbFZhbHVlO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRCb3VuY2UoZWxhcHNlZDogbnVtYmVyLCBpbml0aWFsVmFsdWU6IG51bWJlciwgYW1vdW50T2ZDaGFuZ2U6IG51bWJlciwgZHVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG5cdGlmIChlbGFwc2VkIDwgZHVyYXRpb24gLyAyKSB7XG5cdFx0cmV0dXJuIGVhc2VJbkJvdW5jZShlbGFwc2VkICogMiwgMCwgYW1vdW50T2ZDaGFuZ2UsIGR1cmF0aW9uKSAqIDAuNSArIGluaXRpYWxWYWx1ZTtcblx0fVxuXHRyZXR1cm4gZWFzZU91dEJvdW5jZShlbGFwc2VkICogMiAtIGR1cmF0aW9uLCAwLCBhbW91bnRPZkNoYW5nZSwgZHVyYXRpb24pICogMC41ICsgYW1vdW50T2ZDaGFuZ2UgKiAwLjUgKyBpbml0aWFsVmFsdWU7XG59Il19