console.log(document.getElementById("but"));
document.getElementById("but").addEventListener("click", function (event) {
    event.preventDefault();
    var router = new Router('/hellow');
    router.get('').success(function (resObjscet) {
            console.log(resObjscet.hellow, 'Ivo');
    }).send();
});
