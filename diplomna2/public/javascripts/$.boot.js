(function($) {
    var scriptsPath = '';
    $.$ = function (selector) {
        return document.querySelector(selector);
    };
    $.addDependencies = function (path, dependencies) {
        ['View.js', 'Extends.js', '$.js', 'Cookie.js', 'Router.js'].forEach(function (dependency) {
            dependencies.push(dependency);
        });
        dependencies.reverse();
        scriptsPath = path;
        $.load(dependencies);
    };
    $.newElement = function (elementObj) {
        var element = document.createElement(elementObj.$);
        for(var prop in elementObj) {
            if(elementObj.hasOwnProperty(prop)) {
                if(elementObj[prop] === elementObj.$)
                    continue;
                if (elementObj[prop] === elementObj.event) {
                    element.addEventListener (elementObj[prop].target , $.eventCallBack);
                    element['callback'] = elementObj[prop].callback;
                    element['ARGS'] = elementObj[prop].ARGS;
                } else element[prop] = elementObj[prop];
            }
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
        $.$('head').appendChild($.newElement({$ : 'script', src : scriptsPath + dep, event : {target : 'load', callback : $.load, ARGS : [deps]}}));
    };
})(window.$ = window.$ || {});