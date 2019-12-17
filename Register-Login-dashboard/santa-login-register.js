function toserver() {
    var array = []
    var name = document.getElementById("usernameId").value;
    var phone = document.getElementById("phoneId").value;
    var email = document.getElementById("emailId").value;
    var password = document.getElementById("passwordId").value;
    var submit = document.getElementById("submitId");
    submit.disabled = true;
    var jsonData = { name, phone, email, password };
    console.log(email)
    console.log(jsonData);

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:3000/registration");

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify(jsonData));



};
function tologin() {

    var email = document.getElementById("emailLoginId").value;
    var password = document.getElementById("passwordLoginId").value;
    var submit = document.getElementById("submitLoginId");
    submit.disabled = true;

    var jsonData = { email, password };

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:3000/login");

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    console.log("got")
    xhttp.send(JSON.stringify(jsonData));

}

