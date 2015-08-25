// Userlist data array for filling in info box
var userListData = [];
var httpRequest;

document.getElementById('Rest').onclick = populateTable;

// Fill table with data
function populateTable() {

	httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
    	var tableContent = '';
    	try {
	    	if (httpRequest.readyState === 4) {
		      if (httpRequest.status === 200) {
		        var res = JSON.parse(httpRequest.responseText);
	    		res.forEach(function (element, index, array) {
	    			console.log('username :' + element.username + 'email : ' + element.email);
	    		});
		      } else {
		        alert('There was a problem with the request.');
		      }
		    }
	    } catch (e) {
	    	alert('Caught Exception: ' + e.description)
	    }

    };
    httpRequest.open('GET', '/users/userlist');
    httpRequest.send();    
};