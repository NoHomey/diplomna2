    var userListData = [];
    document.body.onload = populateTable;
    document.body.addEventListener("onload", generateUpdateUser);
    document.getElementById("btnAddUser").addEventListener("click", addUser);

    Array.prototype.first = function () {
        return this[0];
    };

     function AJAX (onready, method, url, data) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = onready;
        httpRequest.open(method, url);
        httpRequest.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
        httpRequest.send(data);  
    }

    // Fill table with data
    function populateTable(event) {
        try {
            var h2;
            if(h2 = document.getElementById("updateUser"))
                removeElement(h2); 
            generateUpdateUser();
        } catch (e) {
            alert('Caught Exception: ' + e.description);
        }
        if(event) event.preventDefault();
        AJAX(index, 'GET', '/users/userlist', '');
    }

    function index (event) {
            event.preventDefault();
            while(document.getElementById("tbody").firstChild)
                removeElement(document.getElementById("tbody").firstChild);
            try {
                if (event.target.readyState === 4) {
                  if (event.target.status === 200) {
                    var res = JSON.parse(event.target.responseText);
                    userListData = res;
                    res.forEach(function (element, index, array) {
                        var tr = newElement("tr");
                        tr.appendChild(newElement("td")).appendChild(newElement("a", {href : "#", class : "linkshowuser", rel : element.username, innerHTML : element.username, onclick : showUserInfo, onclickArguments : [element]}));
                        tr.appendChild(newElement("td", {innerHTML : element.email}));
                        tr.appendChild(newElement("td")).appendChild(newElement("a", {href : "#", class : "linkshowuser", rel : element._id, innerHTML : "delete", onclick : deleteUser,onclickArguments : [element]}));
                        document.getElementById("tbody").appendChild(tr);
                    });
                  } else 
                    alert('There was a problem with the request.');
                }
            } catch (e) {
                alert('Caught Exception: ' + e.description);
            }
        }

    function newElement (type, attrs) {
        var element = document.createElement(type);
        for(var a in attrs) {
            if(attrs[a] === attrs.onclick)
                element.addEventListener("click", attrs[a]);
            else element[a] = attrs[a];
        }
        return element;
    }
    
    function showUserInfo (event) {
        event.preventDefault();
        var user = event.target.onclickArguments.first();
        document.getElementById("userInfoName").innerHTML = user.fullname;
        document.getElementById("userInfoAge").innerHTML = user.age;
        document.getElementById("userInfoGender").innerHTML = user.gender;
        document.getElementById("userInfoLocation").innerHTML = user.location;
    }

    function addUser (event) {
        event.preventDefault();
        var errorCount = 0;
        var inputs = document.getElementById("addUser").getElementsByTagName("input");
        for(input in inputs)
            if((inputs[input].value !== undefined) && (inputs[input].value === ''))
                errorCount++;
        if(!errorCount) {
            var newUser = {
                'username' : document.getElementById("inputUserName").value,
                'email': document.getElementById("inputUserEmail").value,
                'fullname': document.getElementById("inputUserFullname").value,
                'age': document.getElementById("inputUserAge").value,
                'location': document.getElementById("inputUserLocation").value,
                'gender': document.getElementById("inputUserGender").value
            };
            AJAX(addNewUser, 'POST', '/users/adduser', JSON.stringify(newUser));
        } else alert('Please fill in all fields');
    }

    function addNewUser (event) {
        try {
            if (event.target.readyState === 4) {
                if (event.target.status === 200) {
                    var res = JSON.parse(event.target.responseText);
                    if(res.msg === '') {
                        var inputs = document.getElementById("addUser").getElementsByTagName("input");
                        for(input in inputs)
                            if(inputs[input].value !== undefined)
                                inputs[input].value = "";
                        populateTable(null);
                    } else alert('Error: ' + res.msg)
                } else alert('There was a problem with the request.');
            }
        } catch (e) {
             alert('Caught Exception: ' + e.description);
        }
    }

    function deleteUser (event) {
        event.preventDefault();
        var confirmation = confirm('Are you sure you want to delete this user?');
        if(confirm)
            AJAX(remove, 'DELETE', '/users/deleteuser/' + event.target.rel, '');
    }

    function remove (event) {
        try {
            if (event.target.readyState === 4) {
                if (event.target.status === 200) {
                    var res = JSON.parse(event.target.responseText);
                    if(res.msg !== '')
                        alert('Error: ' + res.msg);
                    populateTable(null);
                } else alert('There was a problem with the request.');
            }
        } catch (e) {
             alert('Caught Exception: ' + e.description);
        }
    }

    function generateUpdateUser () {
        fieldset = newElement("fieldset");
        fieldset.appendChild(newElement("input", {id : "inputUpdateUserName", type : "text", placeholder : "UserName"}));
        fieldset.appendChild(newElement("input", {id : "inputUpdateUserEmail", type : "text", placeholder : "Email"}));
        fieldset.appendChild(newElement("br"));
        fieldset.appendChild(newElement("input", {id : "inputUpdateUserFullName", type : "text", placeholder : "FullName"}));
        fieldset.appendChild(newElement("input", {id : "inputUpdateUserAge", type : "text", placeholder : "Age"}));
        fieldset.appendChild(newElement("br"));
        fieldset.appendChild(newElement("input", {id : "inputUpdateLocation", type : "text", placeholder : "Location"}));
        fieldset.appendChild(newElement("input", {id : "inputUpdateUserGender", type : "text", placeholder : "Gender"}));
        document.body.appendChild(newElement("h2", {id : "updateUser", innerHTML : "UpdateUser"})).appendChild(fieldset);
    }

    function removeElement (element) {
        while(element.firstChild) 
            removeElement(element.firstChild);
        element.parentNode.removeChild(element);
    }