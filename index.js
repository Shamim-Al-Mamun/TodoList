//Select DOM
const realTime = document.querySelector(".date");
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const filterOption = document.querySelector(".filter-todo");
const todoClear = document.querySelector(".todo-clear" );
const todoList = document.querySelector(".todo-list");
const error = document.querySelector('.error');

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);
todoClear.addEventListener("click", clearTodos);

//add button
function addTodo(e) {
  //Prevent natural behaviour
  e.preventDefault();
  if(todoInput.value){
    todos = JSON.parse(localStorage.getItem("todos"));
    if(todos=== null || todos.length < 5){
      const {timestamp} = TimeStamp();
      const time = document.createElement("div");
      const pre = document.createElement("pre");
      pre.innerHTML = "\n" + timestamp;
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create list
      const newTodo = document.createElement("li");
      //Save to local
      //Save to local - do this last
      newTodo.innerText = todoInput.value;
      // saveLocalTodos(timestamp);
      saveLocalTodos(todoInput.value, timestamp);
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoDiv.appendChild(time);
      time.appendChild(pre);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //attach final Todo
      todoList.appendChild(todoDiv);
      console.log(timestamp);
    }
    else{
      //validation
      error.innerHTML = "Maximum 5 inputs!";
      const errorMessage = () =>{error.innerHTML = ""}
      const nonVisible = setTimeout(errorMessage, 2000);
    }
  }
  else{
    error.innerHTML = "Input required!";
    const errorMessage = () =>{error.innerHTML = ""}
    const nonVisible = setTimeout(errorMessage, 2000);
  }
}

//trash button
function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();

    const todo = item.parentElement;
    if(todo.classList[1] === "completed"){
    //completed todo
    todo.classList.add("fallDone");
    }
    else{
      todo.classList.add("fall");
    }
    //at the end
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}

//filter button
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo, timestamp) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoTimeStamp = {todo,timestamp }
  todos.push(todoTimeStamp);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
  }
  todos.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.todo;
    //create timestamp
    const time = document.createElement("div");
    const pre = document.createElement("pre");
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(time);
    time.appendChild(pre);
    //fetching timestamp
    pre.innerHTML= todo.timestamp;
    console.log(todo.timestamp);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
  
  //get Curent Time
  const {day, date, month, year} = TimeStamp();
  realTime.innerHTML = `${day}, <br/>
  ${date} ${month} ${year}`;

}

//clear all button
function clearTodos(event){
  event.preventDefault();
  var todolists = document.querySelectorAll('.todo');

  for(i =todolists.length; i> 0; i--){
    todolists[i-1].classList.add("fall");
  }
  //remove every childs
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  //Empty todo lists
    todoList.addEventListener("transitionend", () => {
      removeAllChildNodes(todoList);
      console.log(todolists.length)
    });
      //reset local
      localStorage.clear();
}

//Toggle theme change
  function themeChanger() {
    var checkBox = document.getElementById("myCheck");
    var root = document.documentElement;
    
    if (checkBox.checked){
      const darkTheme ={
        background: "rgb(128, 128, 128, .9)",
        border :"rgb(128, 128, 128, .1)"
      };
      root.style.setProperty('--bgnborder', darkTheme.background);
      root.style.setProperty('--borderOp', darkTheme.border );
    } else {
      const Pinktheme ={
        background: "rgb(255, 130, 150)",
        border : "rgb(255, 130, 150, .1)"
      };
      root.style.setProperty('--bgnborder', Pinktheme.background);
      root.style.setProperty('--borderOp', Pinktheme.border );
    }
  }