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

    const priorityIndicator = document.createElement("button");
    checkPriority(task, priorityIndicator);

    taskItem.append(checkbox, taskElement, deleteTaskButton);
    taskElement.append(taskTitleIndicator, priorityIndicator);

    addTaskToTaskBox(taskTitleIndicator, task);
    addEventListenerToDeleteTaskButton(deleteTaskButton);
    addEventListenerToCheckbox(checkbox, taskTitleIndicator, taskElement);
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
            taskElement.style.backgroundColor = "lightGray";
        } else {
            checkbox.classList.remove("checkbox-complete");
            taskTitleIndicator.classList.remove("title-complete");
            taskElement.style.backgroundColor = "#aec7d2";
        }
    })
}

addTask();