(function($) {
    $.Cookie = function (cookie, expire) {
        var expires;
        var name;
        var value;
        var copy = function (cookie) {
            name = cookie.getName();
            value = cookie.getValue();
            expires = cookie.getExpire();
        };
        var formCookieObj = function (name, value) {
            var cookieObj = {};
            cookieObj[name] = value;
            return cookieObj;
        };
        this.update = function (cookie, expires) {
            this.delete();
            copy(new $.Cookie(cookie, expires));
        };
        this.setName = function (newName) {
            this.update(formCookieObj(newName, value),  expires);
        };
        this.setValue = function (newValue) {
            this.update(formCookieObj(name, newValue),  expires);
        };
        this.setExpire = function (newExpires) {
            this.update(formCookieObj(name, value), newExpires);
        };
        this.getName = function () {
            return name;
        };
        this.getValue = function () {
            return value;
        };
        this.getExpire = function () {
            return expires;
        };
        this.delete = function () {
            new $.Cookie(formCookieObj(name, value), 0);
            name = '';
            value = {};
            expires = 0;
        };
        this.getAllCookies = function () {
            var cookies = document.cookie;
            if(!cookies)
                return null;
            cookies = cookies.split('; ');
            for(var i = 0;i < cookies.length;++i) {
                var c = cookies[i].split('=');
                c[1] = JSON.parse(c[1]);
                cookies[i] = new $.Cookie(formCookieObj(c[0], c[1].value), c[1].expires);
            }
            return cookies;
        };
        this.get = function (cookieName) {
            var cookies = this.getAllCookies();
            if(!cookies)
                return null;
            for(var i = 0;i < cookies.length;++i)
                if(cookies[i].getName() === cookieName) {
                    copy(cookies[i]);
                    return cookies[i];
                }
        };
        this.exist = function (cookieName) {
            var res = this.get(cookieName);
            return !!(res && res.hasOwnProperty('exist') && res.hasOwnProperty('get'));
        };
        if(cookie) {
            name = cookie.first();
            expires = expire;
            value = cookie[name];
            cookie[name] = JSON.stringify({value : cookie[name], expires :  expires});
            expire = (function (day) {
                var exp;
                if(day === -1)
                    exp = 0x7fffffff * 1e3;
                else
                    exp = Date.now() + (day * 86400000);
                if(!day)
                    exp = -1;
                return new Date(exp).toUTCString();
            })(expire);
            var newCookie = name + '=' + cookie[name];
            if(expires !== undefined)
                newCookie += ';expires=' + expire;
            document.cookie = newCookie;
        }
    };
})(window.$ = window.$ || {});