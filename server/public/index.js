const URL = "http://localhost:3000/api/v1";

// DOM Element for creating tasks.
const taskSubmitButton = document.querySelector(".form_container button");
const taskInput = document.querySelector('.form_container input[type="text"]');
const errorContainer = document.getElementById("error_text");

// DOM Elements for showing tasks.
const taskContainer = document.querySelector(".task_container");
taskContainer.innerHTML = "";

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
  makeRequest("/tasks", "POST", body).then(() => {
    const newTask = createNewTask(taskName);

    // When the task is created, add it to the view.
    taskContainer.innerHTML += newTask;
  })
})


async function makeRequest(url, method, body) {
  console.log(JSON.stringify(body));
  url = URL + url;

  let init = {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": 'application/json',
    }
  }

  if (method != "GET") {
    init.body = JSON.stringify(body);
  }

  const response = await fetch(url, init);
  const data = await response.json();

  return data;
}

function createNewTask(name) {
  return `<div class="task">
      <h5>${name}</h5 >
    <div>
      <button>Edit</button>
      <button>Delete</button>
    </div>
    </div >`
}

document.addEventListener("DOMContentLoaded", () => {
  makeRequest("/tasks", "GET", null).then((data) => {
    let innerHTML = "";
    data.tasks.forEach(item => {
      innerHTML += createNewTask(item.name);
    })

    taskContainer.innerHTML = innerHTML;
  })
})
