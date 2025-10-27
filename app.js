var firebaseConfig = {
    apiKey: "AIzaSyDuteBoZ_uJIINFahpwSbFDrxOUuMXDZGo",
    authDomain: "todo-app-38753.firebaseapp.com",
    projectId: "todo-app-38753",
    storageBucket: "todo-app-38753.firebasestorage.app",
    messagingSenderId: "170515854911",
    appId: "1:170515854911:web:9b98fb46b65b373969ea8a",
};

var app = firebase.initializeApp(firebaseConfig);

var inputDiv = document.getElementById("input-buttons");
function takeDown() {
    inputDiv.classList.add("display");
}
function takeUp() {
    inputDiv.classList.remove("display");
}

var input = document.getElementById("todo-inp");
var todoList = document.getElementById("todo-list");
function addTodo() {
    if (input.value === "") {
        alert("empty input");
    } else {
        var database = firebase.database().ref("todoAdd");
        var key = database.push().key
        var todo = {
            taskEntered: input.value,
            id: key,
        }
        database.child(key).set(todo);
        input.value = "";
    }
}
firebase
    .database()
    .ref("todoAdd")
    .on("child_added", function (data) {
        var list = document.createElement("li");
        var listPara = document.createElement("p");
        var listText = document.createTextNode(data.val().taskEntered);
        var deleteBtn = document.createElement("button");
        var btnText = document.createElement("i");
        var div = document.createElement("div");
        var editBtn = document.createElement("button");
        var editBtnText = document.createTextNode("Edit");
        editBtn.appendChild(editBtnText);
        listPara.appendChild(listText);
        deleteBtn.appendChild(btnText);
        list.appendChild(listPara);
        div.appendChild(editBtn);
        div.appendChild(deleteBtn);
        list.appendChild(div);
        list.setAttribute(
            "class",
            "d-flex justify-content-between align-items-center mt-2 p-2 rounded-2 bg-white"
        );
        listPara.setAttribute("class", "m-0");
        deleteBtn.setAttribute(
            "class",
            "delete-btn bg-transparent text-danger border-0 py-1 px-2"
        );
        deleteBtn.setAttribute("id", data.val().id);
        deleteBtn.setAttribute("onClick", "deleteTodo(this)");
        editBtn.setAttribute(
            "class",
            "edit-btn bg-transparent text-success border-0 py-1 px-2"
        );
        editBtn.setAttribute("id", data.val().id);
        editBtn.setAttribute("onClick", "editLine(this)");
        btnText.setAttribute("class", "fa-solid fa-trash");
        todoList.appendChild(list);
    });
function deleteTodo(element) {
    firebase.database().ref("todoAdd").child(element.id).remove();
    element.parentNode.parentNode.remove();
}
function editLine(element) {
    var newValue = prompt("Enter new value");
    element.parentNode.parentNode.childNodes[0].innerHTML = newValue;
    var editedValue = {
        value: newValue,
        key: element.id,
    }
    firebase.database().ref("todoAdd").child(element.id).set(editedValue);
}
function deleteAll() {
    todoList.innerHTML = "";
}
