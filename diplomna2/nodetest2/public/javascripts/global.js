var httpRequest;
document.body.onload = populateTable;

// Fill table with data
function populateTable() {
	httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
    	try {
	    	if (httpRequest.readyState === 4) {
		      if (httpRequest.status === 200) {
		        var res = JSON.parse(httpRequest.responseText);
	    		res.forEach(function (element, index, array) {
	    			var tr = newElement("tr", {});
	    			var td = newElement("td", {});
	    			var a = newElement("a", {href : "#", class : "linkshowuser", rel : element.username, innerHTML : element.username});
	    			td.appendChild(a);
	    			tr.appendChild(td);
	    			var td = newElement("td", {innerHTML : element.email});
	    			tr.appendChild(td);
	    			var td = newElement("td", {});
	    			var a = newElement("a", {href : "#", class : "linkshowuser", rel : element._id, innerHTML : "delete"});
	    			td.appendChild(a);
	    			tr.appendChild(td);
	    			document.getElementById("tbody").appendChild(tr);
	    			console.log(tr.td);
	    		});
		      } else 
		        alert('There was a problem with the request.');
		    }
	    } catch (e) {
	    	alert('Caught Exception: ' + e.description);
	   	}
    };
    httpRequest.open('GET', '/users/userlist');
    httpRequest.send();    
};

function newElement (type, attrs) {
	var element = document.createElement(type);
	for(var a in attrs) 
		element[a] = attrs[a];
	return element;
}