var Cookie = function (cookie, expire) {
    var expires_;
    var name_;
    var value_;
    var copy_ = function (cookie, expires) {
        var name = Object.keys(cookie)[0];
        name_ = name;
        value_ = cookie[name];
        expires_ = expires;
    };
    var move_ = function () {
        var cookie = {};
        cookie[name_] = value_;
        new Cookie(cookie, 0);
    };
    var update_ = function (name, value, expires) {
        move_();
        var cookie = {};
        cookie[name] = value;
        new Cookie(cookie, expires);
        copy_(cookie, expires);
    };
    this.name = function (newName) {
        if(!newName)
            return name_;
        update_(newName, value_,  expires_);
    };
    this.value = function (newValue) {
        if(!newValue)
            return value_;
        update_(name_, newValue,  expires_);
    };
    this.expires = function (newExpires) {
        if(!newExpires && (newExpires !== 0))
            return  expires_;
        update_(name_, value_, newExpires);
    };
    this.remove = function () {
        move_();
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
                copy_(cookie, c[1].expires);
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