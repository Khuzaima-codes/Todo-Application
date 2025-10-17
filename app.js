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
    }else{
        var list = document.createElement("li");
        var listPara = document.createElement("p");
        var listText = document.createTextNode(input.value);
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
        list.setAttribute("class", "d-flex justify-content-between align-items-center mt-2 p-2 rounded-2 bg-white")
        listPara.setAttribute("class", "m-0");
        deleteBtn.setAttribute("class", "delete-btn bg-transparent text-danger border-0 py-1 px-2")
        deleteBtn.setAttribute("onClick", "deleteTodo(this)");
        editBtn.setAttribute("class", "edit-btn bg-transparent text-success border-0 py-1 px-2")
        editBtn.setAttribute("onClick", "editLine(this)");
        btnText.setAttribute("class", "fa-solid fa-trash");
        todoList.appendChild(list);
        input.value = "";
    }
}
function deleteTodo(element) {
    element.parentNode.parentNode.remove();
}
function editLine(element){
    var newValue = prompt("Enter new value");
    element.parentNode.parentNode.childNodes[0].innerHTML = newValue;
}
function deleteAll() {
    todoList.innerHTML = "";
}