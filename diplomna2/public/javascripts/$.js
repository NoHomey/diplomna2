var $ = {};
(function() {
    //Private Property
    var isHot = true;

    //Private Method
    var fly = function () {
        console.log(isHot);
    };

    //Public Property
    this.ingredient = "Bacon Strips";

    //Public Method
    this.fry = function() {
        console.log(this.ingredient);
    };


}).apply($);