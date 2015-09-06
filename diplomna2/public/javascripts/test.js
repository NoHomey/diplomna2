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
console.log( z.name());
console.log(z.exist(z.name()));
c1.get().forEach(function (c) {console.log(c.name()); c.remove()});
console.log(z.exist(z.name()));
console.log(c2);
$.fry();


/*var view = new View("default");
view.addRessource(function (mes) { console.log(mes);},"generate");
//view.removeResource("generate");
view.getResource("generate" ).call(view.getResource("generate" ), "ivo");*/
