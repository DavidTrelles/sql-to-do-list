$(onReady);

function onReady() {
  getTasks();
  $("#add").on("click", postTask);
  $("#list").on("click", ".completed", taskCompleted);
  $("#list").on("click", ".delete", deleteThis);
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
               <li class=${item.is_completed} data-id=${item.id}> <span class = "item" >Item: </span>${item.task}, <span class = "priority"> Priority: </span> ${item.priority} <button class="completed">Task Completed</button><button class="delete">Delete item</button></li> 
            `);
    }
  });
}

//gets data from inputs and sends it to server
function postTask() {
  if ($("#item").val() == "" || $("#priority").val() == "") {
    alert("Please fill in all fields");
  } else {
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
}
function deleteThis() {
  $(this).parent().remove();
  const id = $(this).parent().data("id");
  $.ajax({
    type: "DELETE",
    url: `/tasks.library/${id}`,
  })
    .then(function () {
      getTasks();
    })
    .catch(function (error) {
      console.log("error with deleting,", error);
    });
  //makes a delete request
}
function taskCompleted() {
  $(this).parent().addClass("done");
  const id = $(this).parent().data("id");
  $.ajax({
    type: "PUT",
    url: `/tasks.library/is_completed/${id}`,
    data: { is_completed: "true" },
  })
    .then(function () {
      getTasks();
    })
    .catch(function (error) {
      console.log("error with putting,", error);
    });
  //sends put request and changes css
}
