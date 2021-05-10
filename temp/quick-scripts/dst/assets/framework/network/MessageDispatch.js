
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/network/MessageDispatch.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '27032HakQBLd5OVLXAxtzCc', 'MessageDispatch');
// framework/network/MessageDispatch.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDispatch = void 0;
var MessageDispatch = /** @class */ (function () {
    function MessageDispatch() {
        this._handler = null;
        this._allMessageBases = {};
    }
    MessageDispatch.getInstance = function () {
        if (this._instace == null) {
            this._instace = new MessageDispatch();
        }
        return this._instace;
    };
    MessageDispatch.prototype.register = function (key, msgPro) {
        if (key == null)
            return null;
        if (msgPro == null)
            return null;
        var allBases = this._allMessageBases[key];
        if (allBases == null)
            this._allMessageBases[key] = [];
        this._allMessageBases[key].push(msgPro);
        return msgPro;
    };
    MessageDispatch.prototype.isNull = function (key) {
        var allBases = this._allMessageBases[key];
        if (allBases != null && allBases.length > 0)
            return true;
        return false;
    };
    MessageDispatch.prototype.registerUnique = function (key, msgPro) {
        if (key == null)
            return null;
        var allBases = this._allMessageBases[key];
        if (allBases != null && allBases.length > 0)
            return this._allMessageBases[key][0];
        else
            return this.register(key, msgPro);
    };
    MessageDispatch.prototype.getBean = function (key) {
        if (key == null)
            return null;
        var allBeans = this._allMessageBases[key];
        if (allBeans != null && allBeans.length > 0) {
            return allBeans[0];
        }
        return null;
    };
    MessageDispatch.prototype.unRegister = function (key) {
        var allBases = this._allMessageBases[key];
        if (allBases == null)
            return;
        for (var i = 0; i < allBases.length; i++)
            allBases[i].onDestory();
        this._allMessageBases[key] = null;
        delete this._allMessageBases[key];
    };
    MessageDispatch.prototype.onMessage = function (msg) {
        for (var key in this._allMessageBases) {
            if (this._allMessageBases[key] == null)
                continue;
            var allBases = this._allMessageBases[key];
            for (var i = 0; i < allBases.length; i++)
                if (allBases[i].onMessage(msg))
                    return true;
        }
        return false;
    };
    MessageDispatch._instace = null;
    return MessageDispatch;
}());
exports.MessageDispatch = MessageDispatch;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxuZXR3b3JrXFxNZXNzYWdlRGlzcGF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtJQWNDO1FBQ0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBYmEsMkJBQVcsR0FBekI7UUFDQyxJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztTQUN0QztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN0QixDQUFDO0lBVU0sa0NBQVEsR0FBZixVQUFnQixHQUFXLEVBQUUsTUFBbUI7UUFDL0MsSUFBRyxHQUFHLElBQUksSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzVCLElBQUcsTUFBTSxJQUFJLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUMvQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBRyxRQUFRLElBQUksSUFBSTtZQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxPQUFPLE1BQU0sQ0FBQztJQUNmLENBQUM7SUFFTSxnQ0FBTSxHQUFiLFVBQWMsR0FBVztRQUN4QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBRyxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUN6QyxPQUFPLElBQUksQ0FBQztRQUNiLE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVNLHdDQUFjLEdBQXJCLFVBQXNCLEdBQVcsRUFBRSxNQUFvQjtRQUN0RCxJQUFHLEdBQUcsSUFBSSxJQUFJO1lBQUcsT0FBTyxJQUFJLENBQUM7UUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUcsUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDekMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ2pDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLGlDQUFPLEdBQWQsVUFBZSxHQUFXO1FBQ3pCLElBQUksR0FBRyxJQUFJLElBQUk7WUFBRyxPQUFPLElBQUksQ0FBQztRQUM5QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBRyxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO1lBQzFDLE9BQVksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBRU0sb0NBQVUsR0FBakIsVUFBa0IsR0FBVztRQUM1QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBRyxRQUFRLElBQUksSUFBSTtZQUFFLE9BQU87UUFDNUIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQ3RDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxtQ0FBUyxHQUFoQixVQUFpQixHQUFRO1FBQ3hCLEtBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFDO1lBQ3BDLElBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFFLElBQUk7Z0JBQUMsU0FBUztZQUM3QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO2dCQUN0QyxJQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO29CQUFFLE9BQU8sSUFBSSxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBbkVjLHdCQUFRLEdBQW9CLElBQUksQ0FBQztJQW9FakQsc0JBQUM7Q0F0RUQsQUFzRUMsSUFBQTtBQXRFWSwwQ0FBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWVzc2FnZUJhc2V9IGZyb20gXCIuL01lc3NhZ2VCYXNlXCJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlRGlzcGF0Y2h7XG5cblx0cHJpdmF0ZSBzdGF0aWMgX2luc3RhY2U6IE1lc3NhZ2VEaXNwYXRjaCA9IG51bGw7XG5cblx0cHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpe1xuXHRcdGlmKHRoaXMuX2luc3RhY2UgPT0gbnVsbCl7XG5cdFx0XHR0aGlzLl9pbnN0YWNlID0gbmV3IE1lc3NhZ2VEaXNwYXRjaCgpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5faW5zdGFjZTtcblx0fVxuXG5cdHByaXZhdGUgX2hhbmRsZXI6IGFueTtcblx0cHJpdmF0ZSBfYWxsTWVzc2FnZUJhc2VzOiB7W2tleTogc3RyaW5nXTogTWVzc2FnZUJhc2VbXX07XG5cblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLl9oYW5kbGVyID0gbnVsbDtcblx0XHR0aGlzLl9hbGxNZXNzYWdlQmFzZXMgPSB7fTtcblx0fVxuXG5cdHB1YmxpYyByZWdpc3RlcihrZXk6IHN0cmluZywgbXNnUHJvOiBNZXNzYWdlQmFzZSl7XG5cdFx0aWYoa2V5ID09IG51bGwpIHJldHVybiBudWxsO1xuXHRcdGlmKG1zZ1BybyA9PSBudWxsKSByZXR1cm4gbnVsbDtcblx0XHRsZXQgYWxsQmFzZXMgPSB0aGlzLl9hbGxNZXNzYWdlQmFzZXNba2V5XTtcblx0XHRpZihhbGxCYXNlcyA9PSBudWxsKXRoaXMuX2FsbE1lc3NhZ2VCYXNlc1trZXldID0gW107XG5cdFx0dGhpcy5fYWxsTWVzc2FnZUJhc2VzW2tleV0ucHVzaChtc2dQcm8pO1xuXHRcdHJldHVybiBtc2dQcm87XG5cdH1cblxuXHRwdWJsaWMgaXNOdWxsKGtleTogc3RyaW5nKXtcblx0XHRsZXQgYWxsQmFzZXMgPSB0aGlzLl9hbGxNZXNzYWdlQmFzZXNba2V5XTtcblx0XHRpZihhbGxCYXNlcyAhPSBudWxsICYmIGFsbEJhc2VzLmxlbmd0aCA+IDApXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgcmVnaXN0ZXJVbmlxdWUoa2V5OiBzdHJpbmcsIG1zZ1Bybz86IE1lc3NhZ2VCYXNlKXtcblx0XHRpZihrZXkgPT0gbnVsbCApIHJldHVybiBudWxsO1xuXHRcdGxldCBhbGxCYXNlcyA9IHRoaXMuX2FsbE1lc3NhZ2VCYXNlc1trZXldO1xuXHRcdGlmKGFsbEJhc2VzICE9IG51bGwgJiYgYWxsQmFzZXMubGVuZ3RoID4gMClcblx0XHRcdHJldHVybiB0aGlzLl9hbGxNZXNzYWdlQmFzZXNba2V5XVswXTtcblx0XHRlbHNlIHJldHVybiB0aGlzLnJlZ2lzdGVyKGtleSwgbXNnUHJvKTtcblx0fVxuXG5cdHB1YmxpYyBnZXRCZWFuKGtleTogc3RyaW5nKSB7XG5cdFx0aWYoIGtleSA9PSBudWxsICkgcmV0dXJuIG51bGw7XG5cdFx0bGV0IGFsbEJlYW5zID0gdGhpcy5fYWxsTWVzc2FnZUJhc2VzW2tleV07XG5cdFx0aWYoYWxsQmVhbnMgIT0gbnVsbCAmJiBhbGxCZWFucy5sZW5ndGggPiAwKXtcblx0XHRcdHJldHVybiA8YW55PmFsbEJlYW5zWzBdO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHB1YmxpYyB1blJlZ2lzdGVyKGtleTogc3RyaW5nKXtcblx0XHRsZXQgYWxsQmFzZXMgPSB0aGlzLl9hbGxNZXNzYWdlQmFzZXNba2V5XTtcblx0XHRpZihhbGxCYXNlcyA9PSBudWxsKSByZXR1cm47XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGFsbEJhc2VzLmxlbmd0aDsgaSsrKVxuXHRcdFx0YWxsQmFzZXNbaV0ub25EZXN0b3J5KCk7XG5cdFx0dGhpcy5fYWxsTWVzc2FnZUJhc2VzW2tleV0gPSBudWxsO1xuXHRcdGRlbGV0ZSB0aGlzLl9hbGxNZXNzYWdlQmFzZXNba2V5XTtcblx0fVxuXG5cdHB1YmxpYyBvbk1lc3NhZ2UobXNnOiBhbnkpe1xuXHRcdGZvcihsZXQga2V5IGluIHRoaXMuX2FsbE1lc3NhZ2VCYXNlcyl7XG5cdFx0XHRpZih0aGlzLl9hbGxNZXNzYWdlQmFzZXNba2V5XT09bnVsbCljb250aW51ZTtcblx0XHRcdGxldCBhbGxCYXNlcyA9IHRoaXMuX2FsbE1lc3NhZ2VCYXNlc1trZXldO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGFsbEJhc2VzLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRpZihhbGxCYXNlc1tpXS5vbk1lc3NhZ2UobXNnKSkgcmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufSJdfQ==