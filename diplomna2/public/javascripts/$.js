(function($) {
    var cookie = new $.Cookie();
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
        return cookie.getAllCookies();
    };
    $.deleteAllCookies = function () {
        $.getAllCookies().forEach(function (c) {c.delete();});
    };
    $.hasCookie = function (name) {
        return cookie.exist(name);
    };
    $.deleteElement = function (selectors) {
        var element = $.$(selectors);
        while(element.firstChild)
            $.deleteElement(element.firstChild);
        element.parentNode.removeChild(element);
    };


})(window.$ = window.$ || {});