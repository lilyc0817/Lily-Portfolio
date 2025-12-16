console.log("Script loaded!");
/*CRUD = create, read, update, delete*/

//DOM Elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");


//Game State
let tasks = [];

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text === ""){
        return;
    }
    tasks.push(text);
    console.log(tasks);
    taskInput.value = "";
    saveItem();
    renderTaskList();
})

function saveItem(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks){
        tasks = JSON.parse(storedTasks);
    }
}

function renderTaskList(){
    taskList.innerHTML = "";
    tasks.forEach((item, i) => {
        taskList.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
        <input type="checkbox" class="form-check-input me-2" checked=true>
        <span>${item}</span>
        <button class="btn btn-sm btn-danger ms-3" id="delete${i}" onClick="deleteTask(${i}")>Delete</button>
      </li>`
    })
}

function deleteTask(taskID){
    tasks = tasks.splice(taskID, 1);
    saveItem();
    renderTaskList();
}



loadTasks();
renderTaskList();
deleteTask();