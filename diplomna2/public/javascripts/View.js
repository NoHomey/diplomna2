(function($) {
    $.View = function (viewName) {
        var Resource = function (resource, name) {
            this.resource = resource;
            this.name = name;
        };
        var name = viewName;
        var resources = [];
        this.addResource = function (resource, name) {
            resources.push(new Resource(resource, name));
        };
        this.getResource = function (name) {
            for(var res in resources)
                if(resources[res].name === name)
                    return resources[res].resource;
        };
        this.getResources = function () {
            return resources;
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
            if(name[0] !== '$')
                return $.$(name);
            name.slice(0, 1);
            return getResource(name);
        };
        this.newElement = function (type, attrs) {
            var element = document.createElement(type);
            for(var a in attrs) {
                if(attrs[a] === attrs.onclick)
                    element.addEventListener("click", attrs[a]);
                else element[a] = attrs[a];
            }
            return element;
        };
        this.deleteElement = function (selectors) {
            var element = $.$(selectors);
            while(element.firstChild)
                removeElement(element.firstChild);
            element.parentNode.removeChild(element);
        };
    };
})(window.$ = window.$ || {});