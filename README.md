# Task API using Mongo DB and Express

- Simple project to demonstrate how to perform CRUD operations using ExpressJS and Mongodb.
- Allows creating tasks, editing them and deleting them.
- The UI has been developed using plain HTML and CSS with major focus on the backend.

## API

- GET "/api/v1/tasks"             => get all tasks
- POST "/api/v1/tasks"            => create new task
- GET "/api/v1/tasks/:id"         => get single task
- PATCH "/api/v1/tasks/:id"       => update task
- DELETE "/api/v1/tasks/:id"      => delete task

## Front End

![](https://user-images.githubusercontent.com/64722310/147952533-45e3f69d-ef46-4d30-adec-de29468529f8.png)

## How to Use

- Clone this repo. Don't forget to star it :)
- Change directory into the project, then into the server folder.
- Install all dependencies using 
```yarn install```
or
```npm install```
- Create a new config.env file using the .env.example file. Add your own mongo db url.
- Start the server using
```yarn dev```
or
```npm run dev```
