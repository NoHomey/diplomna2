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
	    			var tr = newElement({type : "tr"});
	    			tr.appendChild(newElement({type : "td"})).appendChild(newElement({type : "a", href : "#", class : "linkshowuser", rel : element.username, innerHTML : element.username}));
	    			tr.appendChild(newElement({type : "td", innerHTML : element.email}));
	    			tr.appendChild(newElement({type : "td"})).appendChild(newElement({type : "a", href : "#", class : "linkshowuser", rel : element._id, innerHTML : "delete"}));
	    			document.getElementById("tbody").appendChild(tr);
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

function newElement (attrs) {
	var element = document.createElement(attrs.type);
	for(var a in attrs) 
		element[a] = attrs[a];
	return element;
}