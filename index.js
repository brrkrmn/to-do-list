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
    this.description = description,
    this.sayName = function () {
        console.log(this);
    };
}

function createNewTask() {
    const title = document.getElementById("task-name").value;
    const due = document.getElementById("task-due").value;
    const priority = document.getElementById("task-priority").value;
    const description = document.getElementById("task-description").value;
    const task = new Task(title, due, priority, description);
    task.sayName();
}

addEventListenerToAddTaskButton();
addEventListenerToDeleteFormButton();
addEventListenerToSaveFormButton();