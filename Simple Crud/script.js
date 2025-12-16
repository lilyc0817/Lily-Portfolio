
//check to see if script loaded
console.log("site loaded!");


//define elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

//define game state

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
        taskList.innerHTML += `<li>
            <input type="checkbox">
            <span>${item}</span>
            <button id="delete${i}" onClick="deleteTask(${i})">Delete</button>
        </li>`
    })
}

function deleteTask(taskID){
    tasks.splice(taskID, 1);
    saveItem();
    renderTaskList();
}



loadTasks();
renderTaskList();


