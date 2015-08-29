    var httpRequest;
    document.body.onload = populateTable;

    var userListData = [];

    // Fill table with data
    function populateTable() {
        httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            try {
                if (httpRequest.readyState === 4) {
                  if (httpRequest.status === 200) {
                    var res = JSON.parse(httpRequest.responseText);
                    userListData = res;
                    res.forEach(function (element, index, array) {
                        var tr = newElement("tr");
                        tr.appendChild(newElement("td")).appendChild(newElement("a", {href : "#", class : "linkshowuser", rel : element.username, innerHTML : element.username, onclick : showUserInfoObject(element)}));
                        tr.appendChild(newElement("td", {innerHTML : element.email}));
                        tr.appendChild(newElement("td")).appendChild(newElement("a", {href : "#", class : "linkshowuser", rel : element._id, innerHTML : "delete"})).addEventListener('click', showUserInfo);
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

       function newElement (type, attrs) {
        var element = document.createElement(type);
        for(var a in attrs) {
            if(attrs[a] === attrs.onclick)
                element.addEventListener('click', attrs[a]);
            else element[a] = attrs[a];
        }
        return element;
    }

    function findUserByName (username) {
        for (var i in userListData)
            if (userListData[i].username == username)
                return userListData[i];
    }

    function showUserInfo (username) {
        console.log("Delete?", findUserByName(username));
    }

    function showUserInfoObject (user) {
        console.log("UserName", user);
    }