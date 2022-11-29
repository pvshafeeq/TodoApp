
const loginvalidate = (callback) => {
    var isvalid = false;
    var msg='';
    var username = document.getElementById('txtUsername').value.trim();
    var password = document.getElementById('txtPassword').value.trim();
    if (username == 'admin' && password == '12345') {
        isvalid = true;
    }
    else  if (username == '' && password == '')
    {
        msg='Username and Password cannot be blank..';
    }
    else  if (username == '')
    {
        msg='Username cannot be blank..';
    }
    else  if (password == '')
    {
        msg='Password cannot be blank..';
    }
    else
    {
        msg='Invalid credentials..';
    }
    callback(isvalid,msg);
}

function redirect(val,msg) {
    if (val == true) {
        window.location.href = 'todo.html';
    }
    else {
        document.getElementById('errMessage').innerHTML = msg;
    }
}

function loadapidata() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);
            var tableRef = document.getElementById('tblData').getElementsByTagName('tbody')[0];

            for (let index = 0; index < resp.length; index++) {
                let output = "<th scope='row'>" + (index + 1).toString() + "</th>" +
                    "<td>" + resp[index].title + "</td>";
                if (resp[index].completed == true) {
                    output += '<td><input type="checkbox" checked disabled></td>';
                }
                else {
                    // output+= '<td><input type="checkbox"></td>';
                    output += '<td><label><input type="checkbox" onclick="marktodos(this);"></label></td>';
                }
                tableRef.insertRow().innerHTML = output;
            }
        }
    }
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();
}

const showAlert = (cnt) => {
    if (cnt == 5) {
        alert('Congrats. 5 Tasks have been Successfully Completed');
    }
}

var count = 0
const handleClick = (cb) => {
    return new Promise((resolve, reject) => {
        if (cb.checked == true) {
            count = count + 1;
        }
        else if (cb.checked == false) {
            count = count - 1;
        }
        resolve(count);
    })
}

function marktodos(cb) {
    handleClick(cb).then((cnt) => {
        showAlert(cnt);
    })
        .catch(() => {
            alert('An error occured!');
        })
}