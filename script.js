//THIS IS THE GENERAL LISTING ALL THE TODOS!
var counter = false;
var xhttp = new XMLHttpRequest();

functioncall();

function functioncall() {
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var todos = JSON.parse(this.responseText);
            console.log(todos);
            console.log(todos.length);
            for (let i = 0; i < todos.length; i++) {
                //create an item and append it to the div inside the html, call on another display function. Do the post function before putting stuff in here.
                counter = todos[i].completed;
                // console.log(counter);
                listItem(todos[i]);

                // if (deleteTask(todos[i]) == true) {
                //     todos[i].innerHTML = todos[i+1];
                //     todos.length = todos.length - 1;
                // }
    
                // console.log(todos[i]);
                // if (completeTask(todos[i]) == true) {
                //     completeTask(todos[i]).style.textDecoration = "line-through";
                // }
                // if (todos[i].completed == true) {
                //     todos.checked = true;
                //     todos.style.textDecoration = "line-through";
                // }
                // else {
                //     todos.checked = false;
                //     todos.style.textDecoration = "none";
                // }
            }
        }
    };

xhttp.open("GET", "https://cse204.work/todos", true);
xhttp.setRequestHeader("x-api-key", "7d5d3e-7dd4c6-2603c1-6fd303-e4ae19");
xhttp.send();
}


function listItem(eachTask) {
    var item = document.createElement("p");
    item.setAttribute("text", eachTask.text);
    item.setAttribute("id", eachTask.id);

    if (eachTask.completed == true ) {
        item.style.textDecoration = "line-through";
    }
    else {
        item.style.textDecoration = "none";
    }

    item.appendChild(document.createTextNode(eachTask.text));
    item.style.position = "relative";
    item.style.left = "-2%";
    item.style.marginTop = "2%";
    item.style.border = "2px solid grey";
    item.style.paddingTop = "3px";
    item.style.paddingBottom = "7px";
    item.style.backgroundColor = "lightgrey"
    item.style.borderRadius = "5px";
    

    var complete = document.createElement("input");
    complete.setAttribute("type", "checkbox");
    complete.style.position = "relative";
    complete.style.float = "left";
    complete.style.width = "20px";
    complete.style.border = "2px solid green";
    complete.style.cursor = "pointer";

    var deleteThis = document.createElement("button");
    deleteThis.innerHTML = "Delete";
    deleteThis.style.position = "relative";
    deleteThis.style.float = "right";
    deleteThis.style.backgroundColor = "red";
    deleteThis.style.borderColor = "maroon";
    deleteThis.style.borderRadius = "5px";
    deleteThis.style.marginRight = "3px";
    deleteThis.style.cursor = "pointer";
   

    var element = document.getElementById("things");
   
    element.appendChild(item);
    // console.log(element);
    item.appendChild(complete);
    item.appendChild(deleteThis);

    complete.addEventListener("click", completeTask);
    deleteThis.addEventListener("click", deleteTask);
};

// console.log("something");

////////////////////////////////////////////////////////////////////////////////////////////////

// THIS IS THE POST FUNCTION! 
document.getElementById("add").addEventListener("click", post);

// Trigger enter key
document.getElementById("task").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("add").click();
    }
  });

function post(event) {
    event.preventDefault();
    // Setting variable for form input (get from HTML form)
    
    var data = {
        text: document.getElementById("task").value //getting the text from the input box in html
    }

    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();

    // Response handler
    xhttp2.onreadystatechange = function () {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            //actually displaying the todos.
            // parse JSON response
            var todo = JSON.parse(this.responseText);

            var item = document.createElement("li");
            // item.setAttribute("text", todo.text);
            
            listItem(todo);
            
            // console.log(todo);

        } else if (this.readyState == 4) {

            // this.status !== 200, error from server
            console.log(this.responseText);

        }
    }
    xhttp2.open("POST", "https://cse204.work/todos", true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "7d5d3e-7dd4c6-2603c1-6fd303-e4ae19");
    xhttp2.send(JSON.stringify(data));
    document.getElementById("task").value = "";
};
    // document.getElementById("add").addEventListener("click", post);

    function completeTask(event) {
        event.preventDefault();
        
        var xhttp4 = new XMLHttpRequest();
        var data = {
            completed: true
    }
  xhttp4.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    //   console.log(document.getElementById(complete_id));
    //   document.getElementById(complete_id).style.textDecoration = "line-through";
    // functioncall();
    document.getElementById(event.target.parentNode.id).style.textDecoration = "line-through";
    // document.getElementById(event.target.parentNode.id).checked = true;
    console.log("success");
    } else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  };

//   console.log(event.target.parentNode.id);
  xhttp4.open("PUT", "https://cse204.work/todos/" + event.target.parentNode.id, true);
  xhttp4.setRequestHeader("Content-type", "application/json");
  xhttp4.setRequestHeader("x-api-key", "7d5d3e-7dd4c6-2603c1-6fd303-e4ae19");
  xhttp4.send(JSON.stringify(data));

  }

    function deleteTask(event) {
        // var remove_id = id;
        var xhttp3 = new XMLHttpRequest();
        
        xhttp3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // functioncall();
            event.target.parentNode.remove();
            console.log("here");
            // document.getElementById(remove_id).remove();

        } else if (this.readyState == 4) {

            console.log(this.responseText);
        }
    };
    xhttp3.open("DELETE", "https://cse204.work/todos/" + event.target.parentNode.id, true);
    
    xhttp3.setRequestHeader("Content-type", "application/json");
    xhttp3.setRequestHeader("x-api-key","7d5d3e-7dd4c6-2603c1-6fd303-e4ae19");
    xhttp3.send();

    }
