
//$.$('body').add($.newElement({$ : 'button', id : 'but', innerHTML : 'Click', onclick :));
var ivo = $.createView("ivo");


ivo.addResource('hellow', function (name) {
    var router = new Router('/hellow');
    router.get('').success(function (resObjscet) {
        console.log(resObjscet.hellow, name);
    }).send();
});

ivo.addResource('button', {$ : 'button', innerHTML : 'Click', event : {target : 'click', callback : '@hellow', ARGS : ['Ivo']}});

ivo.setView({
'@button' : ['@']
});
$.setView('ivo');



/*var view = new View("default");
view.addRessource(function (mes) { console.log(mes);},"generate");
//view.removeResource("generate");
view.getResource("generate" ).call(view.getResource("generate" ), "ivo");*/
