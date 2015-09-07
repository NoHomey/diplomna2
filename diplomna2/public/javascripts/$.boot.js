(function($) {
    var scriptsPath = '';
    var deps = [];
    $.load = function (path, dependencies) {
        ['View.js', 'Extends.js', '$.js', 'Cookie.js', 'Router.js'].forEach(function (dependency) {
            dependencies.push(dependency);
        });
        dependencies.reverse();
        scriptsPath = path;
        deps = dependencies;
        load();
    };
    var newScript= function (src) {
        var element = document.createElement('script');
        element.src = src;
        element.addEventListener('load' , function (event) {
            event.preventDefault();
            load();
        });
        return element;
    };
    var load = function () {
        if(!deps[0])
            return;
        document.head.appendChild(newScript(scriptsPath + deps[0]));
        deps.splice(0, 1);
    };
})(window.$ = window.$ || {});