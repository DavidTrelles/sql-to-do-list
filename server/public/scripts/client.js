$(onReady);

function onReady() {
  getTasks();
  $("#add").on("click", postTask);
}
// get tasks from the server
function getTasks() {
  $("#output").empty();
  $.ajax({
    type: "GET",
    url: "/tasks",
  }).then(function (response) {
    console.log("GET /tasks response", response);
    // append data to the DOM
    for (let item of response) {
      $("#output").append(`
               <li> Item: ${item.task} Urgency ${item.urgency} <button id="completed">Task Completed</button><button id="delete">Delete item</button></li> 
            `);
    }
  });
}
function postTask() {
  let newTask = {
    artist: $("#item").val(),
    track: $("#urgency").val(),
    isCompleted: "false",
  };
  $.ajax({
    type: "POST",
    url: "/tasks",
    data: newTask,
  }).then(function (response) {
    $("#task").val("");
    $("#urgency").val("");
    getTasks();
  });
}
