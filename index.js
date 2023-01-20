function addTask() {
    addEventListenerToAddTaskButton();
    addEventListenerToDeleteFormButton();
    addEventListenerToSaveFormButton();
}

//form actions//
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

function openEditorForm() {
    const form = document.querySelector(".editor-form");
    form.style.visibility = "visible";
}

function closeEditorForm() {
    const form = document.querySelector(".editor-form");
    form.reset();
    form.style.visibility = "hidden";
}

//creating new task//
function Task(title, due, priority, description) {
    this.title = title,
    this.due = due,
    this.priority = priority,
    this.description = description,
    tasks.push(this);
}

function createNewTask() {
    //create new object
    const title = document.getElementById("task-name").value;
    const due = document.getElementById("task-due").value;
    const priority = document.getElementById("task-priority").value;
    const description = document.getElementById("task-description").value;
    const task = new Task(title, due, priority, description);

    createTaskItem(); //add the object to DOM
    writeInfoToTaskItem(task); //fill the DOM element with task info
}

function createTaskItem() {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

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
    priorityIndicator.classList.add("priority-indicator");

    document.querySelector(".task-box").appendChild(taskItem);
    taskItem.append(checkbox, taskElement, deleteTaskButton);
    taskElement.append(taskTitleIndicator, priorityIndicator, dateIndicator);

    addEventListenerToDeleteTaskButton(deleteTaskButton);
    addEventListenerToCheckbox(checkbox, taskTitleIndicator, taskElement, taskItem);
    editTask();
}

//display task information on task element//
function writeInfoToTaskItem(task) {
    const last = document.querySelectorAll(".task-item:last-child");
    const lastTask = last[0]
    addTaskTitle(task, lastTask);
    findDaysLeft(task, lastTask);
    checkPriority(task, lastTask);
}

function addTaskTitle(task, lastTask) {
    const taskTitleIndicator = lastTask.querySelector(".task-title-indicator");
    if (taskTitleIndicator) {
        taskTitleIndicator.textContent = task.title;
    }
}

function findDaysLeft(task, lastTask) {
    const dateIndicator = lastTask.querySelector(".date-indicator");
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

function checkPriority(task, lastTask) {
    const priorityIndicator = lastTask.querySelector(".priority-indicator");
    if (priorityIndicator) {
        if (task.priority === "low") {
            priorityIndicator.classList.remove("priority-indicator-high", "priority-indicator-medium");
            priorityIndicator.classList.add("priority-indicator-low");
        } else if (task.priority === "medium") {
            priorityIndicator.classList.remove("priority-indicator-high", "priority-indicator-low");
            priorityIndicator.classList.add("priority-indicator-medium");
        } else {
            priorityIndicator.classList.remove("priority-indicator-low", "priority-indicator-medium");
            priorityIndicator.classList.add("priority-indicator-high");
        }
    }
}

//task actions//
function addEventListenerToDeleteTaskButton(deleteTaskButton) {
    deleteTaskButton.addEventListener("click", () => {
        deleteTaskButton.parentElement.remove();
    })
}

function addEventListenerToCheckbox(checkbox, taskTitleIndicator, taskElement, taskItem) {
    if (checkbox) {
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
}

//edit task//
function editTask() {
    addEventListenerToEditTask(); //modal opens as the task is clicked
    closeModal();
}

function openModal(){
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
}

function closeModal(){
    const closeModalButton = document.querySelector(".close-modal-button");
    closeModalButton.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        modal.style.display = "none";
    })
}

function addEventListenerToEditTask() {
    const taskElement = document.querySelectorAll(".task");
    for (let i = 0; i < taskElement.length; i++) {
        taskElement[i].addEventListener("click", () => {
            const thisTask = taskElement[i];
            console.log(thisTask);
            closeEditorForm();
            openModal();
            findTaskObject(thisTask); 
        });
    }
}

function findTaskObject(thisTask) {
    const title = thisTask.querySelector(".task-title-indicator").textContent;
    const taskObject = tasks.find(obj => obj.title === title);
    writeTaskInfoToModal(taskObject); //task info is displayed on modal
    changeTaskInfo(taskObject, thisTask);
}

function writeTaskInfoToModal(taskObject) {
    const title = document.querySelector(".modal-title");
    title.textContent = taskObject.title;

    const description = document.querySelector(".modal-description");
    description.textContent = taskObject.description;

    const priority = document.querySelector(".modal-select");
    priority.value = taskObject.priority;

    const date = document.querySelector("#modal-due");
    date.value = (taskObject.due.split("-").reverse().join("-").replaceAll("-", "."));
}

function changeTaskInfo(taskObject, thisTask) {
    const saveModalButton = document.querySelector(".modal-save-button");
    saveModalButton.addEventListener("click", () => {

        const title = document.querySelector(".modal-title").textContent;
        taskObject.title = title;
        addTaskTitle(taskObject, thisTask);

        const description = document.querySelector(".modal-description").textContent;
        taskObject.description = description;

        const due = document.querySelector("#modal-due").value;
        taskObject.due = due;
        findDaysLeft(taskObject, thisTask);

        const priority = document.querySelector(".modal-select").value;
        taskObject.priority = priority;
        checkPriority(taskObject, thisTask);

        //close modal
        const modal = document.querySelector(".modal");
        modal.style.display = "none";
    })
}

//projects//
function openProject() {
    addEventListenerToAllButton();
    addEventListenerToTodayButton();
    addEventListenerToDoneButton();
}

function addEventListenerToAllButton() {
    const allButton = document.querySelector(".all-button");
    allButton.addEventListener("click", () => {
        const addTaskButton = document.querySelector(".add-task-button");
        addTaskButton.style.display = "block";

        const projectTitle = document.querySelector(".task-container-title");
        projectTitle.textContent = "All";
        const tasks = document.querySelectorAll(".task-item");
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].style.display = "flex";
        }
    })
}

function addEventListenerToTodayButton() {
    const todayButton = document.querySelector(".today-button");
    todayButton.addEventListener("click", () => {
        const addTaskButton = document.querySelector(".add-task-button");
        addTaskButton.style.display = "none";

        const projectTitle = document.querySelector(".task-container-title");
        projectTitle.textContent = "Today";
        const tasks = document.querySelectorAll(".task-item");
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].style.display = "flex";
            if (tasks[i].children[1].children[2].textContent !== "0 days left") {
                tasks[i].style.display = "none";
            }
        }
    })
}

function addEventListenerToDoneButton() {
    const doneButton = document.querySelector(".done-button");
    doneButton.addEventListener("click", () => {
        const addTaskButton = document.querySelector(".add-task-button");
        addTaskButton.style.display = "none";  

        const projectTitle = document.querySelector(".task-container-title");
        projectTitle.textContent = "Done";
        const tasks = document.querySelectorAll(".task-item");
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].style.display = "flex";
            if (!tasks[i].children[0].classList.contains("checkbox-complete")) {
                tasks[i].style.display = "none";
            }
        }
    })
}

const tasks = [];
addTask();
openProject();
