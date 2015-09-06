(function($) {
    $.$ = function (selector) {
        return document.querySelector(selector.replace(' ', ','));
    };
    $.addDependencies = function (dependencies) {
        ['$.js', 'Cookie.js', 'Router.js'].forEach(function (dependency) {
            dependencies.push(dependency);
        });
        dependencies.reverse();
        $.load(dependencies);
    };
    $.newElement = function (parent, type, attrs) {
        var element = document.createElement(type);
        for(var a in attrs) {
            if(attrs[a] === attrs.event) {
                element.addEventListener ( attrs[ a ].type , $.eventCallBack );
                element['callback'] = attrs[a ].callback;
                element['ARGS'] = attrs[a ].ARGS;
            } else element[a] = attrs[a];
        }
        return $.$(parent).appendChild(element);
    };
    $.eventCallBack = function (event) {
        event.preventDefault();
        event.target.ARGS.push[event];
        event.target.callback.apply(event.target.callback, event.target.ARGS);
    };
    $.load = function (deps) {
        if(!deps.length)
            return;
        var dep = deps[0];
        deps.splice(0, 1);
        $.newElement('head', 'script', {src : '/javascripts/' + dep, event : {type : 'load', callback : $.load, ARGS : [deps]}});
    };
})(window.$ = window.$ || {});
