(function($) {
    $.Cookie = function (cookie, expire) {
        var expires_;
        var name_;
        var value_;
        var copy = function (cookie) {
            name_ = cookie.getName();
            value_ = cookie.getValue();
            expires_ = cookie.getExpire();
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
            this.update(formCookieObj(newName, value_),  expires_);
        };
        this.setValue = function (newValue) {
            this.update(formCookieObj(name_, newValue),  expires_);
        };
        this.setExpire = function (newExpires) {
            this.update(formCookieObj(name_, value_), newExpires);
        };
        this.getName = function () {
            return name_;
        };
        this.getValue = function () {
            return value_;
        };
        this.getExpire = function () {
            return expires_;
        };
        this.delete = function () {
            new $.Cookie(formCookieObj(name_, value_), 0);
            name_ = '';
            value_ = {};
            expires_ = 0;
        };
        this.getAllCookies = function () {
            var cookies = document.cookie;
            if(!cookies)
                return null;
            cookies = cookies.split('; ');
            for(var index in cookies) {
                var c = cookies[index].split('=');
                c[1] = JSON.parse(c[1]);
                cookies[index] = new $.Cookie(formCookieObj(c[0], c[1].value), c[1].expires);
            }
            return cookies;
        };
        this.get = function (cookieName) {
            var cookies = this.getAllCookies();
            for(var cookie in cookies)
                if(cookies[cookie].getName() === cookieName) {
                    copy(cookies[cookie]);
                    return cookies[cookie];
                }
        };
        this.exist = function (cookieName) {
            var res = this.get(cookieName);
            return !!(res && res.hasOwnProperty('exist') && res.hasOwnProperty('get'));
        };
        if(cookie) {
            var name = Object.keys(cookie)[0];
            expires_ = expire;
            name_ = name;
            value_ = cookie[name];
            cookie[name] = JSON.stringify({value : cookie[name], expires :  expires_});
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
            if( expires_ !== undefined)
                newCookie += ';expires=' + expire;
            document.cookie = newCookie;
        }
    };
})(window.$ = window.$ || {});