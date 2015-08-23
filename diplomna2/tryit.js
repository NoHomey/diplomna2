
var tryit = function () {
	var newE = document.createElement("button");
	newE.innerHTML = "click me";
	document.appendChild(newE);
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = tryit;
}
