document.getElementById("but").addEventListener("click", function (event) {
    event.preventDefault();
    var router = new Router('/hellow');
    router.get('').success(function (resObjscet) {
            console.log(resObjscet.hellow, 'Ivo');
    }).send();
});


var z = $.addCookie({me : [1, 2]}, 2);
var c2 = $.addCookie({ivo : {test : 3}}, 2);
var c1 = $.addCookie({test : 3});
var c = $.addCookie();
$.updateCookie("ivo", {ivo : "ivo.."}, 1);
console.log($.getCookie("ivo").getValue());
$.deleteAllCookies("ivo");
//$.getAllCookies().forEach(function (c) {console.log(c.getName());});
console.log(z.exist(z.getName()));

/*var view = new View("default");
view.addRessource(function (mes) { console.log(mes);},"generate");
//view.removeResource("generate");
view.getResource("generate" ).call(view.getResource("generate" ), "ivo");*/
