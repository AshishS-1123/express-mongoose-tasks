const URL = "http://localhost:3000/api/v1";
let task_id = 0;

// DOM Element for creating tasks.
const taskSubmitButton = document.querySelector(".form_container button");
const taskInput = document.querySelector('.form_container input[type="text"]');
const errorContainer = document.getElementById("error_text");

// DOM Elements for showing tasks.
const taskContainer = document.querySelector(".task_container");

// DOM Elements for editing tasks.
const taskEditor = document.querySelector(".editor_container");
const editorIdInput = document.getElementById("id_input");
const editorNameInput = document.getElementById("title_input");
const editorCompletedInput = document.getElementById("completed_input");
const editorSubmitButton = document.querySelector(".editor button");

taskContainer.innerHTML = "";

// EDIT and DELETE
taskContainer.addEventListener("click", (event) => {
  // Check if one of the buttons was clicked.
  if (event.target.localName != "button") {
    return;
  }

  const itemType = event.target.dataset.type;
  const itemId = event.target.dataset.item;
  const taskId = event.target.dataset.task;

  if (itemType == "D") {
    // Delete Task.
    const url = `/tasks/${taskId}`
    makeRequest(url, "DELETE", {}).then(({ data, status }) => {
      if (status == 201) {
        // If task was deleted in the backend, remove it from the frontend.
        const element = event.target.parentElement?.parentElement;
        if (!element)
          return;

        const parent = element.parentElement;
        if (!parent)
          return;

        parent.removeChild(element);
      }
    })
  } else {
    // Edit Task.
    taskEditor.style.visibility = "visible";

    // fetch the task datails from server.
    const url = `/tasks/${taskId}`;
    makeRequest(url, "GET", {}).then(({ data, status }) => {
      if (status != 201)
        return;

      editorIdInput.value = data.task._id;
      editorNameInput.value = data.task.name;
      editorCompletedInput.value = data.task.completed;
      taskEditor.dataset.task = String(taskId);
    })
  }
})

editorSubmitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const newTaskName = editorNameInput.value;
  const newCompleted = editorCompletedInput.value;
  const taskId = taskEditor.dataset.task;
  const body = {
    name: newTaskName,
    completed: newCompleted
  };


  const url = `/tasks/${taskId}`;

  makeRequest(url, "PATCH", body).then(({ data, status }) => {
    taskEditor.style.visibility = "hidden";
    getAllTasks();
  })

})

// CREATE
taskSubmitButton.addEventListener("click", (event) => {
  const taskName = taskInput.value;

  // If no name was provided for the task, show a warning for 3s, then remove it.
  if (taskName == "") {
    errorContainer.innerHTML = "Please provide a valid task name!";
    setTimeout(() => {
      errorContainer.innerHTML = "";
      clearTimeout();
    }, 3000);
  }

  const body = {
    name: taskName,
    completed: false,
  }

  // Make request to backend to create a new task.
  makeRequest("/tasks", "POST", body).then(({ data }) => {
    const newTask = createNewTask(taskName, task_id, data.task._id);
    ++task_id;

    // When the task is created, add it to the view.
    taskContainer.innerHTML += newTask;
  })
})

// Method for making CRUD request using the fetch api.
async function makeRequest(url, method, body) {
  // Create the whole url.
  url = URL + url;

  // This data defines the request we make.
  let init = {
    method: method, // GET, POST, UPDATE, DELETE
    mode: "cors",
    headers: {
      "Content-Type": 'application/json', // type of data we are sending.
    }
  }

  // For GET method, we must not provide the body attribute.
  // that's why we are adding the property seperately.
  if (method != "GET") {
    init.body = JSON.stringify(body);
  }

  // Get the response.
  try {
    const response = await fetch(url, init);
    const data = await response.json();
    // Convert the response the json.
    const status = response.status;

    return { data, status };
  } catch (error) {
    return {
      data: {},
      status: 501,
    }
  }

  return { data: {}, status: 500 };
}

// Just creates the HTML for the new task.
function createNewTask(name, itemId, taskId) {
  return `<div class="task" id=${"task_" + itemId}>
      <h5>${name}</h5 >
    <div>
      <button data-type="B" data-item=${itemId} data-task=${taskId}>Edit</button>
      <button data-type="D" data-item=${itemId} data-task=${taskId}>Delete</button>
    </div>
    </div >`
}

function getAllTasks() {
  makeRequest("/tasks", "GET", null).then(({ data }) => {
    let innerHTML = "";
    data.tasks.forEach((item, idx) => {
      innerHTML += createNewTask(item.name, task_id + idx, item._id);
    })

    task_id += data.tasks.length;
    taskContainer.innerHTML = innerHTML;
  })
}

// GET ALL
// When the DOM loads, make a get request and fetch all the tasks.
document.addEventListener("DOMContentLoaded", getAllTasks);
