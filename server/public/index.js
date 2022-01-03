const URL = "http://localhost:3000/api/v1";

const taskSubmitButton = document.querySelector(".form_container button");
const taskInput = document.querySelector('.form_container input[type="text"]');
let errorContainer = document.getElementById("error_text");

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
    console.log("created task");
  })
})


async function makeRequest(url, method, body) {
  url = URL + url;

  const init = {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(body)
  }

  const response = await fetch(url, init);
  const data = await response.json();

  return data;
}
