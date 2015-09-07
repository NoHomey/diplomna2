Object.prototype.first = function () {
    return Object.keys(this)[0];
};

XMLHttpRequest.prototype.success = function (callback) {
    this.success = callback;
    return this;
};

Node.prototype.add = function (element) {
    return this.appendChild(element);
};