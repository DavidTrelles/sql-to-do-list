$(onReady);

function onReady() {
  getTasks();
  $("#add").on("click", postTask);
  $('#list').on('click','.completed', taskCompleted)
  $('#list').on('click', '.delete', deleteThis);
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
               <li> Item: ${item.task} Urgency ${item.urgency} <button class="completed">Task Completed</button><button class="delete">Delete item</button></li> 
            `);
    }
  });
}

//gets data from inputs and sends it to server
function postTask() {
  let newTask = {
    task: $("#item").val(),
    urgency: $("#urgency").val(),
    isCompleted: "false", //this is probably wrong and needs to be fixed
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
function deleteThis() {
    $(this).parent().remove();
    //needs to make a delete request
  }
function taskCompleted(){
    $(this).parent().addClass('done')
    //needs to send update request and change css
}