function addEventListenerToAddTaskButton() {
    const addTaskButton = document.querySelector(".add-task-button");
    addTaskButton.addEventListener("click", () => {
        openEditor()
    })
}

function openEditor() {
    const editor = document.querySelector(".editor");
    editor.style.visibility = "visible";
}

function closeEditor() {
    const editor = document.querySelector(".editor");
    const form = document.querySelector(".editor-form");
    form.reset();
    editor.style.visibility = "hidden";
}

function addEventListenerToSaveFormButton() {
    const saveFormButton = document.querySelector(".save-form-button");
    saveFormButton.addEventListener("click", (e) => {
        e.preventDefault();
        createNewTask();
        closeEditor();
    })
}

function addEventListenerToDeleteFormButton() {
    const deleteFormButton = document.querySelector(".delete-form-button");
    deleteFormButton.addEventListener("click", () => {
        closeEditor();
    })
}

function Task(title, due, priority, description) {
    this.title = title,
    this.due = due,
    this.priority = priority,
    this.description = description
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
    findDaysLeft(task, dateIndicator);

    const priorityIndicator = document.createElement("button");
    checkPriority(task, priorityIndicator);

    taskItem.append(checkbox, taskElement, deleteTaskButton);
    taskElement.append(taskTitleIndicator, priorityIndicator, dateIndicator);

    addTaskToTaskBox(taskTitleIndicator, task);
    addEventListenerToDeleteTaskButton(deleteTaskButton);
    addEventListenerToCheckbox(checkbox, taskTitleIndicator, taskElement);
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

function addTaskToTaskBox(taskTitleIndicator, task) {
    console.log(task);
    taskTitleIndicator.textContent = task.title;
}

function addTask() {
    addEventListenerToAddTaskButton();
    addEventListenerToDeleteFormButton();
    addEventListenerToSaveFormButton();
}

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

addTask();