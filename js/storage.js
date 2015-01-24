1/**
 * Created by wm on 12.01.15.
 */
var AppStorage = {
    set : function(index, value) {
        window.localStorage.setItem(index, value);
    },
    get : function(index) {
        return window.localStorage.getItem(index);
    },
    isSet : function(index) {
        var res = typeof window.localStorage.getItem(index) !== "undefined"
        return (res);
    }
};