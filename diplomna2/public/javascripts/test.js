document.getElementById("but").addEventListener("click", function (event) {
    event.preventDefault();
    var router = new Router('/hellow');
    router.get('').success(function (resObjscet) {
            console.log(resObjscet.hellow, 'Ivo');
    }).send();
});
var z = new Cookie({me : [1, 2]}, 2);
var c2 = new Cookie({ivo : {test : 3}}, 2);
var c1 = new Cookie({test : 3});
var c = new Cookie();
console.log(z.exist(z.name()));
c1.get().forEach(function (c) {console.log(c.name(), "name"); c.remove()});
console.log(z.exist(z.name()));


/*this.get = function (name) {
    var cookies = document.cookie;
    console.log(cookies, "cookkiies");
    if(!cookies)
        return;
    console.log(cookies, "cookkiies");
    cookies = cookies.split('; ');
    for(var cookie in cookies)
        cookies[cookie].split('=');
    cookies[cookie].second() = JSON.parese(cookies[cookie].second());
    if(!name) {
        cookies.forEach(function (element) {
            var c = new Cookie();
            c.name(cookies[cookie].first());
            c.value(cookies[cookie].second().value);
            c.expires(cookies[cookie].second().expires);
            return c;
        });
        return cookies;
    }
    //if(cookies[cookie].first() == name)
};*/

