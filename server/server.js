const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve "static assets" (html, css, client-side js)
// from the server/public folder
app.use(express.static("server/public"));

//router information is going to go here - I"m going to have a taskRouter
let tasksRouter = require("./routes/tasks.router");
app.use("/tasks", tasksRouter);
let tasksLibraryRouter = require("./routes/tasks.library");
app.use("/tasks.library", tasksLibraryRouter);
// Start express
const PORT = 5001;
app.listen(PORT, () => {
  console.log("up and running on port", PORT);
});
