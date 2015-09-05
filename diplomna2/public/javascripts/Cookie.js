var Cookie = function (cookie, expire) {
    var cookieExpires;
    var cookieName;
    var cookieValue;
    var convertDayToMilliseconds = function (day) {
        var exp;
        if(!day)
            return new Date(-1).toUTCString();
        if(day === -1)
            exp = 0x7fffffff * 1e3;
        else
            exp = Date.now() + (day * 86400000);
        return new Date(exp).toUTCString();
    };
    var copy = function (name, value, expires) {
        cookieName = name;
        cookieValue = value;
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
        copy(name, value, expires);
    };
    this.name = function(name) {
      if(!name)
          return cookieName;
       update(name, cookieValue, cookieExpires);
    };
    this.value = function(value) {
        if(!value)
            return cookieValue;
        update(cookieName, value, cookieExpires);
    };
    this.expires = function(expires) {
        if(!expires && (expires !== 0))
            return cookieExpires;
        update(cookieName, cookieValue, expires);
    };
    this.remove = function () {
        move();
    };
    this.get = function (cookieName) {
        var cookies = document.cookie;
        if(!cookies)
            return null;
        cookies = cookies.split('; ');
        cookies.forEach(function (cookie, index, cookies) {
            var c = cookie.split('=');
            var newCookie = new Cookie();
            c[1] = JSON.parse(c[1]);
            newCookie.name(c[0]);
            newCookie.value(c[1].value);
            newCookie.expires(c[1].expires);
            cookies[index] = newCookie;
        });
        if(cookieName)
            for(var cookie in cookies)
                if(cookies[cookie].name() === cookieName)
                    copy(cookies[cookie].name(), cookies[cookie].value(), cookies[cookie].expires());
        return cookies;
    };
    this.exist = function (cookieName) {
        var res = this.get(cookieName);
        return !!(res && res.hasOwnProperty('exist') && res.hasOwnProperty('get'));
    };
    for(var prop in cookie) {
        cookieExpires = expire;
        cookieName = prop;
        cookieValue = cookie[prop];
        cookie[prop] = JSON.stringify({value : cookie[prop], expires : cookieExpires});
        expire = convertDayToMilliseconds(expire);
        var newCookie =  '' + prop + '=' + cookie[prop];
        if (cookieExpires !== undefined)
            newCookie +=  ';expires=' + expire;
        document.cookie = newCookie;
    }
};