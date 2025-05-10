let todoBox = document.querySelector(".todoBox");
let todoArray = [];
let editIndex = null; // For edit tracking

function toGetlocalStorage() {
    let data = JSON.parse(window.localStorage.getItem("todoArray"));
    if (data) {
        todoArray = data;
    }
    console.log(data);
}
toGetlocalStorage();

function toStorelocalStorage() {
    window.localStorage.setItem("todoArray", JSON.stringify(todoArray));
}
toStorelocalStorage();

function randorbox() {
    todoBox.innerHTML = "";

    for (let i = 0; i < todoArray.length; i++) {
        let todoDiv = document.createElement("div");
        let todoSpan = document.createElement("span");
        todoSpan.style.padding = "10px";

        let todoButton = document.createElement("button");
        todoButton.innerText = "delete";
        todoButton.style.marginLeft = "5px";
        todoButton.addEventListener("click", function (e) {
            todoButton.id = i;
            let todobtnId = e.target.id;
            todoArray.splice(todobtnId, 1);
            toStorelocalStorage();
            randorbox();
        });

        // --- EDIT button ---
        let editButton = document.createElement("button");
        editButton.innerText = "edit";
        editButton.style.marginLeft = "5px";
        editButton.addEventListener("click", function () {
            document.querySelector("#todo-input").value = todoArray[i];
            editIndex = i;
            document.querySelector("#add-btn").innerText = "Update";
        });

        todoDiv.className = "todo";
        todoDiv.innerText = todoArray[i];

        todoDiv.appendChild(todoSpan);
        todoDiv.appendChild(editButton);
        todoDiv.appendChild(todoButton);
        todoBox.appendChild(todoDiv);
    }
}
randorbox();

function handleAdd() {
    let todo_input = document.querySelector("#todo-input").value;
    if (todo_input == "") {
        alert("enter todo");
        return;
    }

    if (editIndex !== null) {
        todoArray[editIndex] = todo_input;
        editIndex = null;
        document.querySelector("#add-btn").innerText = "Add";
    } else {
        todoArray.push(todo_input);
    }

    toStorelocalStorage();
    randorbox();
    document.querySelector("#todo-input").value = ""; // Clear input
}
