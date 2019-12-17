function load() {


    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/userData");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var responseData = this.responseText;
            responseData = JSON.parse(responseData);
            console.log(this.responseText);

            Object.keys(responseData).forEach((ele) => {

                tableRow = document.createElement('tr');
                element_name = document.createElement('td');
                element_email = document.createElement('td');
                element_child = document.createElement('td');
                element_parent = document.createElement('td');


                textnodename = document.createTextNode(responseData[ele].name + " ");
                textnodeemail = document.createTextNode(responseData[ele].email + " ");
                textnodechild = document.createTextNode(responseData[ele].child + " ");
                textnodeparent = document.createTextNode(responseData[ele].parent + " ");

                element_name.appendChild(textnodename);
                element_email.appendChild(textnodeemail);
                element_child.appendChild(textnodechild);
                element_parent.appendChild(textnodeparent);


                tableRow.appendChild(element_name);
                tableRow.appendChild(element_email);
                tableRow.appendChild(element_child);
                tableRow.appendChild(element_parent);

                document.getElementById("responseDiv").appendChild(tableRow);



            });

        }
        else {
            console.log("not recieved")
        }
    }
    xhttp.send();

};
