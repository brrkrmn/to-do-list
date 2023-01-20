//form actions//
function openEditorForm() {
    const form = document.querySelector(".editor-form");
    form.style.visibility = "visible";
}

function closeEditorForm() {
    const form = document.querySelector(".editor-form");
    form.reset();
    form.style.visibility = "hidden";
}

function addEventListenerToAddTaskButton() {
    const addTaskButton = document.querySelector(".add-task-button");
    addTaskButton.addEventListener("click", () => {
        openEditorForm()
    })
}

function addEventListenerToSaveFormButton() {
    const saveFormButton = document.querySelector(".save-form-button");
    saveFormButton.addEventListener("click", (e) => {
        e.preventDefault();
        createNewTask();
        closeEditorForm();
    })
}

function addEventListenerToDeleteFormButton() {
    const deleteFormButton = document.querySelector(".delete-form-button");
    deleteFormButton.addEventListener("click", () => {
        closeEditorForm();
    })
}

//creating new task//
const tasks = [];

function Task(title, due, priority, description) {
    this.title = title,
    this.due = due,
    this.priority = priority,
    this.description = description,
    tasks.push(this);
}

function createNewTask() {
    const title = document.getElementById("task-name").value;
    const due = document.getElementById("task-due").value;
    const priority = document.getElementById("task-priority").value;
    const description = document.getElementById("task-description").value;
    const task = new Task(title, due, priority, description);
    createTaskItem(task);
}

function createTaskItem(task) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    document.querySelector(".task-box").appendChild(taskItem);

    const checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.classList.add("delete-task-button");

    const taskTitleIndicator = document.createElement("div");
    taskTitleIndicator.classList.add("task-title-indicator");

    const dateIndicator = document.createElement("div");
    dateIndicator.classList.add("date-indicator");

    const priorityIndicator = document.createElement("button");
    
    findDaysLeft(task, dateIndicator);
    checkPriority(task, priorityIndicator);

    taskItem.append(checkbox, taskElement, deleteTaskButton);
    taskElement.append(taskTitleIndicator, priorityIndicator, dateIndicator);

    addTaskToTaskBox(taskTitleIndicator, task);
    addEventListenerToDeleteTaskButton(deleteTaskButton);
    addEventListenerToCheckbox(checkbox, taskTitleIndicator, taskElement);
    editTask();
}

function addTask() {
    addEventListenerToAddTaskButton();
    addEventListenerToDeleteFormButton();
    addEventListenerToSaveFormButton();
}

//display task information on page//
function addTaskToTaskBox(taskTitleIndicator, task) {
    taskTitleIndicator.textContent = task.title;
}

function findDaysLeft(task, dateIndicator) {
    const currentDate = new Date();
    const dueDate = new Date(task.due);
    let daysLeft = dueDate.getTime() - currentDate.getTime();
    daysLeft = Math.ceil(daysLeft / (1000 * 60 * 60 * 24));
    if (task.due === "") {
        dateIndicator.textContent = ("");
    } else {
        dateIndicator.textContent = (daysLeft + " days left");
    }
}

function checkPriority(task, priorityIndicator) {
    if (task.priority === "low") {
        priorityIndicator.classList.add("priority-indicator-low");
    } else if (task.priority === "medium") {
        priorityIndicator.classList.add("priority-indicator-medium");
    } else {
        priorityIndicator.classList.add("priority-indicator-high");
    }
}

//task actions//
function addEventListenerToDeleteTaskButton(deleteTaskButton) {
    deleteTaskButton.addEventListener("click", () => {
        deleteTaskButton.parentElement.remove();
    })
}

function addEventListenerToCheckbox(checkbox, taskTitleIndicator, taskElement) {
    checkbox.addEventListener("click", () => {
        if (!checkbox.classList.contains("checkbox-complete")) {
            checkbox.classList.add("checkbox-complete");
            taskTitleIndicator.classList.add("title-complete");
            taskElement.classList.add("task-complete");
        } else {
            checkbox.classList.remove("checkbox-complete");
            taskTitleIndicator.classList.remove("title-complete");
            taskElement.classList.remove("task-complete");
        }
    })
}

//edit task//
function editTask() {
    addEventListenerToEditTask();
}

function addEventListenerToEditTask() {
    const taskElement = document.querySelectorAll(".task");
    for (let i = 0; i < taskElement.length; i++) {
        taskElement[i].addEventListener("click", () => {
            closeEditorForm();
            const title = taskElement[i].querySelector(".task-title-indicator").textContent;
            findTaskObject(title);
            closeEditModal();
        });
    }
}

function findTaskObject(title) {
    const taskObject = tasks.find(obj => obj.title === title);
    openEditModal(taskObject);
}

function openEditModal(taskObject){
    const modal = document.querySelector(".modal");
    modal.style.display = "block";

    const title = document.querySelector(".modal-title");
    title.textContent = taskObject.title;

    const description = document.querySelector(".modal-description");
    description.textContent = taskObject.description;

    const priority = document.querySelector(".modal-select");
    priority.value = taskObject.priority;
    
    //date does not work//
    console.log(taskObject.due.split("-").reverse().join("-").replaceAll("-", "."));
    const date = document.querySelector(".modal-due");
    date.value = (taskObject.due.split("-").reverse().join("-").replaceAll("-", "."));
}

function closeEditModal(){
    const closeModalButton = document.querySelector(".close-modal-button");
    closeModalButton.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        modal.style.display = "none";
    })
}


addTask();