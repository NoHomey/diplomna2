(function($) {
    $.View = function (viewName) {
        var Resource = function (resource, name) {
            this.resource = resource;
            this.name = name;
        };
        var name = viewName;
        var resources = [];
        var root = $.newElement({$ : 'body'});
        var view;
        var check = function (elementObj) {
            for(var prop in elementObj)
                if(elementObj.hasOwnProperty(prop))
                    if((typeof elementObj[prop] === 'string') && (elementObj[prop][0] === '@'))
                        elementObj[prop] = get(elementObj[prop]);
            return elementObj;
        };
        var addTo = function (child, parent) {
            parent.add($.newElement(check()));
        };
        this.addResource = function (name, resource) {
            resources.push(new Resource(resource, name));
        };
        this.getResource = function (name) {
            for(var i = 0;i < resources.length;++i)
                if(resources[i].name === name)
                    return resources[i].resource;
            return null;
        };
        this.removeResource = function (name) {
            var pos = -1;
            for(var res in resources)
                if(resources[res].name === name)
                    pos = res;
            if(pos > -1)
                resources.splice(pos, 1);
        };
        this.getName = function () {
            return name;
        };
        this.get = function (name) {
            if(name[0] !== '@')
                return $.$(name);
            return this.getResource(name.slice(1, name.length));
        };
        this.build = function () {
            console.log(view);
            for(var element in view)
                if(view.hasOwnProperty(element))
                    console.log(element);
                   // addTo(element, root)

            return root;
        };
        this.setView = function (viewObj) {
            view = viewObj;
        };
    };
})(window.$ = window.$ || {});