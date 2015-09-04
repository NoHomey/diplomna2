var Router = function (rout) {
    this.rout = rout;
    var request = function (method, url) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open(method, rout + url);
        httpRequest.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
        httpRequest.onreadystatechange = function (event) {
            event.preventDefault();
            try {
                if (event.target.readyState === 4) {
                    if (event.target.status === 200)
                        event.target.success.call(event.target.success, JSON.parse(event.target.responseText));
                    else
                        alert('There was a problem with the request.');
                }
            } catch (e) {
                alert('Caught Exception: ' + e.description);
            }
        };
        return httpRequest;
    };
    this.get = function (url) {
        return request('GET', url);
    };
    this.post = function (url) {
        return request('POST', url);
    };
    this.put = function (url) {
        return request('PUT', url);
    };
    this.delete = function (url) {
        return request('DELETE', url);
    };
};

XMLHttpRequest.prototype.success = function (callback) {
    this.success = callback;
    return this;
};