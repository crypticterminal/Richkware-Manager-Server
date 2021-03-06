
function bodyOnLoad() {
    accountInformation();

    loadUsersTable();
    window.setInterval(function(){
        loadUsersTable();
    }, 5000);
}

function accountInformation() {

    $(document).ready(function () {
        $.get("user", /*data,*/ function (data, status) {

            user = data[0];
            // load name near to the brand
            var string = " - " + user.email;
            if (user.isAdmin == true) {
                string = string +" (ADMIN)";
            }
            document.getElementById("userNearBrand").innerHTML = string;

            // manage signup, login, logout
            document.getElementById("signupNavBar").hidden = true;
            document.getElementById("loginNavBar").hidden = true;
            document.getElementById("logoutNavBar").hidden = false;

            // if the user is an ADMIN, then it can see users.html
            if (user.isAdmin == true) {
                document.getElementById("usersNavBar").hidden = false;
            }

        }, "json"/*, dataType*/)
            .done(function () {
                //alert("second success");
            })
            .fail(function () {
                //alert( "error" );
                // manage signup, login, logout
                document.getElementById("signupNavBar").hidden = false;
                document.getElementById("loginNavBar").hidden = false;
                document.getElementById("logoutNavBar").hidden = true;
            })
            .always(function () {
                //alert("finished");
            });
    });

}


function loadUsersTable() {

    $(document).ready(function () {
        $.get("usersList", /*data,*/ function (data, status) {
            var userJSON = data;
            //    alert (userJSON);
            //device = JSON.parse(DeviceJSON);
            //document.getElementById("Email").innerHTML = Person.email;

            //status : "success", "notmodified", "error", "timeout", or "parsererror"
            if (status === "error" || status === "timeout" || status === "parsererror") {
                alert("You are not logged in. You are being redirected to the Login Page");
                window.location.href = "login.html";
            } else {
                //if you set "json" as dataType, it's already parsed, so it's a JSON object
                loadUsersJSONtoTable(userJSON);
            }

        }, "json"/*, dataType*/)
            .done(function () {
                //alert("second success");
            })
            .fail(function () {
                //alert( "error" );
                alert("You are not logged in. You are being redirected to the Login Page");
                window.location.href = "login.html";
            })
            .always(function () {
                //alert("finished");
            });
    });

    /* sc.onload = function () {
         document.getElementById("Logout").innerHTML = lang.logout;
         document.getElementById("Lang").innerHTML = lang.lang;
     };
     */
}

/*
function EditDevicesTableField(name, IP, serverPort, lastConnection) {
    var editForm = document.getElementById("EditForm");
    editForm.style.display = "inline";

    var editButton = document.getElementById("AddForm");
    //editButton.style.display = "none";

    document.getElementById("name_OE").value = name;
    document.getElementById("name_E").value = name;
    document.getElementById("IP_OE").value = IP;
    document.getElementById("IP_E").value = IP;
    document.getElementById("serverPort_OE").value = serverPort;
    document.getElementById("serverPort_E").value = serverPort;
    document.getElementById("lastConnection_OE").value = lastConnection;
    document.getElementById("lastConnection_E").value = lastConnection;
    document.getElementById("encryptionKey_OE").value = lastConnection;
    document.getElementById("encryptionKey_E").value = lastConnection;

}*/

function createUsersTableHeader() {
    var usersTable = document.getElementById("usersTable");
    usersTable.innerHTML = "";

    var thead = document.createElement("thead");
    var row = document.createElement("tr");
    row.innerHTML = ( //"<th>Index</th>" +
        "<th>Email</th>" +
        "<th>Password</th>" +
        "<th>isAdmin</th>");

    thead.appendChild(row);
    usersTable.appendChild(thead);
}

function loadUsersJSONtoTable(usersListJSON) {
    createUsersTableHeader();

    var usersList = usersListJSON//jQuery.parseJSON(usersListJSON);

    var tbody = document.createElement("tbody");
    //var index = 0;
    //while (usersList[index] != null) {
    //for(var device in usersList){
    $.each(usersList, function (index, value) {
        //var user = usersList[index];
        var user = value;

        var email = user.email;
        var password = user.password;
        var isAdmin = user.isAdmin;

        var row = document.createElement("tr");
        row.id = "tableRow" + index;

        row.innerHTML = (
            //"<td>" + (index + 1) + "</td>" +
            "<td>" + email + "</td>" +
            "<td>" + password + "</td>" +
            "<td>" + isAdmin + "</td>" +
            "<td><button type=\"button\" class=\"btn btn-secondary\" onclick=\"EditDevicesTableField('" + email + "','" + password + "','" + isAdmin + "')\">Edit</button></td>" +
            "<td><button type=\"button\" class=\"btn btn-warning\" onclick=\"deleteUser('" + email + "','" + index + "')\">Remove</button></td>");

        tbody.appendChild(row);
        //      index++
    });
    usersTable.appendChild(tbody);
}

function deleteUser(email, indexTableRow){
    $.ajax({
        url: '/Richkware-Manager-Server/user?email='+email,
        type: 'DELETE',
        success: function(result) {
            $("#tableRow"+indexTableRow).remove();
        }
    });
}