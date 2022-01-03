const URL = "http://localhost:3000/api/v1";
let task_id = 0;

// DOM Element for creating tasks.
const taskSubmitButton = document.querySelector(".form_container button");
const taskInput = document.querySelector('.form_container input[type="text"]');
const errorContainer = document.getElementById("error_text");

// DOM Elements for showing tasks.
const taskContainer = document.querySelector(".task_container");
taskContainer.innerHTML = "";

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

  } else {
    // Edit Task.
  }
})

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
  makeRequest("/tasks", "POST", body).then((data) => {
    const newTask = createNewTask(taskName, task_id, data._id);
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
  const response = await fetch(url, init);
  // Convert the response the json.
  const data = await response.json();

  return data;
}

// Just creates the HTML for the new task.
function createNewTask(name, itemId, taskId) {
  return `<div class="task"}>
      <h5>${name}</h5 >
    <div>
      <button data-type="B" data-item=${itemId} data-task=${taskId}>Edit</button>
      <button data-type="D" data-item=${itemId} data-task=${taskId}>Delete</button>
    </div>
    </div >`
}

// When the DOM loads, make a get request and fetch all the tasks.
document.addEventListener("DOMContentLoaded", () => {
  makeRequest("/tasks", "GET", null).then((data) => {
    let innerHTML = "";
    data.tasks.forEach((item, idx) => {
      innerHTML += createNewTask(item.name, task_id + idx, item._id);
    })

    task_id += data.tasks.length;
    taskContainer.innerHTML = innerHTML;
  })
})
