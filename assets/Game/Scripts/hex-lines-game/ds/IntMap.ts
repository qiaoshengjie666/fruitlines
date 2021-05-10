export default class IntMap
{
    h = {}
    set(t, e) {
        this.h[t] = e
    }
    get(t) {
        return this.h[t]
    }
    exists(t) {
        return this.h.hasOwnProperty(t)
    }
    remove(t) {
        return this.h.hasOwnProperty(t) ? (delete this.h[t], !0) : !1
    }
    keys() {
        var t, e = [];
        for (t in this.h) this.h.hasOwnProperty(t) && e.push(0 | t);
        return com.iter(e)
    }
}