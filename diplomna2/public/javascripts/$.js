(function($) {
    $.addCookie = function (cookie, expire) {
        return new $.Cookie(cookie, expire);
    };
    $.deleteCookie = function (name) {
        $.getCookie(name).delete();
    };
    $.getCookie = function (name) {
        return $.addCookie().get(name);
    };
    $.updateCookie = function (name, cookie, expire) {
        $.getCookie(name).update(cookie, expire);
    };
    $.getAllCookies = function () {
        return $.addCookie().getAllCookies();
    };
    $.deleteAllCookies = function () {
        $.getAllCookies().forEach(function (c) {c.delete();});
    };


})(window.$ = window.$ || {});