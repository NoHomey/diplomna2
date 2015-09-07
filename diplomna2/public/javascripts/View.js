(function($) {
    $.View = function (viewName) {
        var Resource = function (resource, name, args) {
            this.resource = resource;
            this.name = name;
            if(args)
                this.args = args;
        };
        var name = viewName;
        var resources = [];
        var root = document.createElement('body');
        var view;
        var check = function (elementObj) {
            for(var prop in elementObj)
                if(elementObj.hasOwnProperty(prop))
                    if((typeof elementObj[prop] === 'string') && (elementObj[prop][0] === '@'))
                        elementObj[prop] = this.get(elementObj[prop]);
            return elementObj;
        };
        this.add = function (name, resource, args) {
            resources.push(new Resource(resource, name, args));
        };
        this.getName = function () {
            return name;
        };
        this.get = function (name) {
            if(name[0] !== '@')
                return $.$(name);
            return (function (name) {
                for(var i = 0;i < resources.length;++i)
                    if(resources[i].name === name)
                        return resources[i].resource;
                return null;
            })(name.slice(1, name.length));
        };
        this.setView = function (viewObj) {
            view = viewObj;
        };
        this.build = function () {
            for(var element in view)
                if(view.hasOwnProperty(element))
                    console.log(element);
                   // addTo(element, root)

            return root;
        };
    };
})(window.$ = window.$ || {});