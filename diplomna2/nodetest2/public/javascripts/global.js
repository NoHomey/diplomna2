    var userListData = [];
    document.body.onload = populateTable;
    document.body.addEventListener("onload", generateUpdateUser);
    document.getElementById("btnAddUser").addEventListener("click", addUser);

    Array.prototype.first = function () {
        return this[0];
    };

     function AJAX (callback, method, url, data) {
        var httpRequest = new XMLHttpRequest();
        httpRequest["callback"] = callback;
        httpRequest.onreadystatechange = onready;
        httpRequest.open(method, url);
        httpRequest.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
        httpRequest.send(data);  
    }

   function onready (event) {
        event.preventDefault();
        try {
            if (event.target.readyState === 4) {
                if (event.target.status === 200) 
                    event.target.callback.call(event.target.callback, JSON.parse(event.target.responseText));
                else
                    alert('There was a problem with the request.');
            }
        } catch (e) {
             alert('Caught Exception: ' + e.description);
        }
    }

    // Fill table with data
    function populateTable(event) {
        generateUpdateUser();
        if(event) event.preventDefault();
        AJAX(index, 'GET', '/users/userlist', '');
    }

    function index (res) {
        while(document.getElementById("tbody").firstChild)
            removeElement(document.getElementById("tbody").firstChild);
        userListData = res;
        res.forEach(function (element, index, array) {
            var tr = newElement("tr");
            tr.appendChild(newElement("td")).appendChild(newElement("a", {href : "#", rel : element.username, innerHTML : element.username, onclick : showUserInfo, onclickArguments : [element]}));
            tr.appendChild(newElement("td", {innerHTML : element.email}));
            tr.appendChild(newElement("td")).appendChild(newElement("a", {href : "#", rel : element._id, innerHTML : "delete", onclick : deleteUser}));
            tr.appendChild(newElement("td")).appendChild(newElement("a", {href : "#", rel : element._id, innerHTML : "update", onclick : updateUser}));
            document.getElementById("tbody").appendChild(tr);
        });
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

    function addNewUser (res) {
        if(res.msg === '') {
            var inputs = document.getElementById("addUser").getElementsByTagName("input");
            for(input in inputs)
                if(inputs[input].value !== undefined)
                     inputs[input].value = "";
                populateTable(null);
         } else alert('Error: ' + res.msg);
    }

    function deleteUser (event) {
        event.preventDefault();
        var confirmation = confirm('Are you sure you want to delete this user?');
        if(confirm)
            AJAX(change, 'DELETE', '/users/deleteuser/' + event.target.rel, '');
    }

    function change (res) {
        if(res.msg !== '')
            alert('Error: ' + res.msg);
        populateTable(null);
    }

    function generateUpdateUser () {
        var h2;
        if(h2 = document.getElementById("updateUser"))
             removeElement(h2); 
        fieldset = newElement("fieldset");
        fieldset.appendChild(newElement("input", {id : "inputUpdateUserName", type : "text", placeholder : "UserName"}));
        fieldset.appendChild(newElement("input", {id : "inputUpdateUserEmail", type : "text", placeholder : "Email"}));
        fieldset.appendChild(newElement("br"));
        fieldset.appendChild(newElement("input", {id : "inputUpdateUserFullName", type : "text", placeholder : "FullName"}));
        fieldset.appendChild(newElement("input", {id : "inputUpdateUserAge", type : "text", placeholder : "Age"}));
        fieldset.appendChild(newElement("br"));
        fieldset.appendChild(newElement("input", {id : "inputUpdateUserLocation", type : "text", placeholder : "Location"}));
        fieldset.appendChild(newElement("input", {id : "inputUpdateUserGender", type : "text", placeholder : "Gender"}));
        document.body.appendChild(newElement("h2", {id : "updateUser", innerHTML : "UpdateUser"})).appendChild(fieldset);
    }

    function removeElement (element) {
        while(element.firstChild) 
            removeElement(element.firstChild);
        element.parentNode.removeChild(element);
    }

    function updateUser (event) {
        event.preventDefault();
        var confirmation = confirm('Are you sure you want to update this user?');
        if(confirm) {
            var inputs = document.getElementById("updateUser").getElementsByTagName("input");
            var errorCount = 0;
            for(input in inputs)
                if((inputs[input].value !== undefined) && (inputs[input].value === ''))
                    errorCount++;
            if(!errorCount) {
                var user = {
                    'username' : document.getElementById("inputUpdateUserName").value,
                    'email': document.getElementById("inputUpdateUserEmail").value,
                    'fullname': document.getElementById("inputUpdateUserFullName").value,
                    'age': document.getElementById("inputUpdateUserAge").value,
                    'location': document.getElementById("inputUpdateUserLocation").value,
                    'gender': document.getElementById("inputUpdateUserGender").value
                };
                AJAX(change, 'PUT', '/users/updateuser/' + event.target.rel, JSON.stringify(user));
            } else alert('Please fill in all fields');
        }
    }