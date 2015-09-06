var View = function (name) {
    var Resource = function (resource, name) {
        this.resource = resource;
        this.name = name;
    };
    var name = name;
    var resources = [];
    this.$res = function (resource, name) {
        resources.push(new Resource(resource, name));
    };
    this.getResource = function (name) {
        for(var res in resources)
            if(resources[res].name === name)
                return resources[res].resource;
    };
    this.removeResource = function (name) {
        var pos = -1;
        for(var res in resources)
            if(resources[res].name === name)
                pos = res;
        if(pos > -1)
            resources.splice(pos, 1);
    };
    this.new = function (type, attrs) {
        var element = document.createElement(type);
        for(var a in attrs) {
            if(attrs[a] === attrs.onclick)
                element.addEventListener("click", attrs[a]);
            else element[a] = attrs[a];
        }
        return element;
    }
    this.delete = function (name) {
        var element = get ;
        while(element.firstChild)
            removeElement(element.firstChild);
        element.parentNode.removeChild(element);
    };
    this.get = function (name) {
        if(name[0] === '@') {
            name.slice(0, 1);
            return getResource(name);
        }
        return
    };
};

var $ = new $Cookie();
$.$v()
$.v$