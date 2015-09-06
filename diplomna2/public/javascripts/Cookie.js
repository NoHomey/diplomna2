var Cookie = function (cookie, expire) {
    var cookieExpires ;
    var cookieName;
    var cookieValue;
    var convertDayToMilliseconds = function (day) {
        var exp;
        if(day === -1)
            exp = 0x7fffffff * 1e3;
        else
            exp = Date.now() + (day * 86400000);
        if(!day)
            exp = -1;
        return new Date(exp).toUTCString();
    };
    var copy = function (cookie, expires) {
        var name = Object.keys(cookie)[0];
        cookieName = name;
        cookieValue = cookie[name];
        cookieExpires = expires;
    };
    var move = function () {
        var cookie = {};
        cookie[cookieName] = cookieValue;
        new Cookie(cookie, 0);
    };
    var update = function (name, value, expires) {
        move();
        var cookie = {};
        cookie[name] = value;
        new Cookie(cookie, expires);
        copy(cookie, expires);
    };
    this.name = function (newName) {
        if(!newName)
            return cookieName;
        update(newName, cookieValue, cookieExpires);
    };
    this.value = function (newValue) {
        if(!newValue)
            return cookieValue;
        update(cookieName, newValue, cookieExpires);
    };
    this.expires = function (newExpires) {
        if(!newExpires && (newExpires !== 0))
            return cookieExpires;
        update(cookieName, cookieValue, newExpires);
    };
    this.remove = function () {
        move();
    };
    this.get = function (cookieName) {
        var cookies = document.cookie;
        if(!cookies)
            return null;
        cookies = cookies.split('; ');
        for(var index in cookies) {
            var c = cookies[index].split('=');
            var cookie = {};
            c[1] = JSON.parse(c[1]);
            cookie[c[0]] = c[1].value;
            if(c[0] === cookieName) {
                copy(cookie, c[1].expires);
                return this;
            }
            cookies[index] = new Cookie(cookie, c[1].expires);
        }
        return cookies;
    };
    this.exist = function (cookieName) {
        var res = this.get(cookieName);
        return !!(res && res.hasOwnProperty('exist') && res.hasOwnProperty('get'));
    };
    if(cookie) {
        var name = Object.keys(cookie)[0];
        cookieExpires = expire;
        cookieName = name;
        cookieValue = cookie[name];
        cookie[name] = JSON.stringify({value : cookie[name], expires : cookieExpires});
        expire = convertDayToMilliseconds(expire);
        var newCookie = name + '=' + cookie[name];
        if(cookieExpires !== undefined)
            newCookie += ';expires=' + expire;
        document.cookie = newCookie;
    }
};