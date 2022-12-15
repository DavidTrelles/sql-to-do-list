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
    url: "/tasks.library",
  }).then(function (response) {
    console.log("GET /tasks.library response", response);
    // append data to the DOM
    for (let item of response) {
      $("#output").append(`
               <li data-id=${item.id}> Item: ${item.task}, Priority: ${item.priority} <button class="completed">Task Completed</button><button class="delete">Delete item</button></li> 
            `);
    }
  });
}

//gets data from inputs and sends it to server
function postTask() {
  let newTask = {
    task: $("#item").val(),
    priority: $("#priority").val(),
    is_completed: "false", //this is probably wrong and needs to be fixed
  };
  $.ajax({
    type: "POST",
    url: "/tasks.library",
    data: newTask,
  }).then(function (response) {
    $("#item").val("");
    $("#priority").val("");
    getTasks();
  });
}
function deleteThis() {
    $(this).parent().remove();
    const id = $(this).parent().data("id");
    $.ajax({
      type: "DELETE",
      url:`/tasks.library/${id}`,
    })
    .then(function() {
      getTasks();
    })
    .catch(function (error) {
      console.log('error with deleting,', error);
    })
    //needs to make a delete request
  }
function taskCompleted(){
    $(this).parent().addClass('done')
    //needs to send update request and change css
}