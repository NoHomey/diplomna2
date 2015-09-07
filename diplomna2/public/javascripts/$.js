(function($) {
    var cookie = new $.Cookie();
    var views = [];
    var view;
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
    $.createView = function (name) {
        var newView = new $.View(name);
        views.push(newView);
        return newView;
    };
    $.setView = function (name) {
        for(var i = 0;i < views.length;++i)
            if(views[i].getName() === name) {
                view = views[i];
                view.build();
            }
    }


})(window.$ = window.$ || {});