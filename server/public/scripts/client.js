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

//gets data from inputs and sends it to server
function postTask() {
  let newTask = {
    task: $("#item").val(),
    urgency: $("#urgency").val(),
    isCompleted: "false",
  };
  $.ajax({
    type: "POST",
    url: "/tasks",
    data: newTask,
  }).then(function (response) {
    $("#item").val("");
    $("#urgency").val("");
    getTasks();
  });
}
