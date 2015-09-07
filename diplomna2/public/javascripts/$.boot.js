(function($) {
    var scriptsPath = '';
    $.$ = function (selector) {
        return document.querySelector(selector);
    };
    $.addDependencies = function (path, dependencies) {
        console.log(dependencies);
        ['Extends.js', '$.js', 'Cookie.js', 'Router.js'].forEach(function (dependency) {
            dependencies.push(dependency);
        });
        dependencies.reverse();
        console.log(dependencies);
        scriptsPath = path;
        $.load(dependencies);
    };
    $.newElement = function (type, attrs) {
        var element = document.createElement(type);
        for(var a in attrs) {
            if(attrs[a] === attrs.event) {
                element.addEventListener(attrs[a].type, $.eventCallBack);
                element['callback'] = attrs[a].callback;
                element['ARGS'] = attrs[a].ARGS;
            } else element[a] = attrs[a];
        }
        return element;
    };
    $.eventCallBack = function (event) {
        event.preventDefault();
        event.target.ARGS.push(event);
        event.target.callback.apply(event.target.callback, event.target.ARGS);
    };
    $.load = function (deps) {
        if(!deps.length)
            return;
        var dep = deps[0];
        deps.splice(0, 1);
        $.$('head').appendChild($.newElement('script', {src : scriptsPath + dep, event : {type : 'load', callback : $.load, ARGS : [deps]}}));
    };
})(window.$ = window.$ || {});