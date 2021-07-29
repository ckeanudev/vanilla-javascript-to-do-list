//Declaring Variables
const todoEnter = document.querySelector(".todo-enter");
const todoDate = document.querySelector(".todo-date");
const todoTime = document.querySelector(".todo-time");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");

//Event Listener
document.addEventListener("DOMContentLoaded", loadTodoList);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", todoCheckDelete);

function addTodo(e) {
  e.preventDefault();

  //Create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");

  //Create child div
  const todoChildDiv = document.createElement("div");
  todoChildDiv.classList.add("todo-child");

  //Create li date & time
  const todoDateTime = document.createElement("li");
  todoDateTime.textContent = `Date: ${todoDate.value} | Time: ${todoTime.value}`;
  todoDateTime.classList.add("todo-date-time");
  todoChildDiv.appendChild(todoDateTime);

  //Create li task
  const newTodoTask = document.createElement("li");
  newTodoTask.textContent = todoEnter.value;
  newTodoTask.classList.add("todo-task");
  todoChildDiv.appendChild(newTodoTask);

  todoDiv.appendChild(todoChildDiv);

  saveTodoList(todoDate.value, todoTime.value, todoEnter.value);

  //Create check button
  const todoCheck = document.createElement("button");
  todoCheck.innerHTML = '<i class="fas fa-check"></i>';
  todoCheck.classList.add("check-btn");
  todoDiv.appendChild(todoCheck);

  //Create delete button
  const todoDelete = document.createElement("button");
  todoDelete.innerHTML = '<i class="fas fa-trash"></i>';
  todoDelete.classList.add("delete-btn");
  todoDiv.appendChild(todoDelete);

  //Append to the List
  todoList.appendChild(todoDiv);

  todoEnter.value = "";
  todoDate.value = "";
  todoTime.value = "";
}

//Function to Check and Delete
function todoCheckDelete(e) {
  const list = e.target;

  //Check
  if (list.classList[0] === "check-btn") {
    const todo = list.parentElement;
    todo.classList.toggle("completed");
  }
  //Delete
  if (list.classList[0] === "delete-btn") {
    const todo = list.parentElement;
    todo.classList.add("slide");
    deleteTodoList(todo.children[0]);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
}

//Function save to the local storage
function saveTodoList(todoDate, todoTime, todoTask) {
  let todoItem;
  if (localStorage.getItem("todolist") === null) {
    todoItem = [];
  } else {
    todoItem = JSON.parse(localStorage.getItem("todolist"));
  }

  todoItem.push([todoDate, todoTime, todoTask]);
  localStorage.setItem("todolist", JSON.stringify(todoItem));
}

//Function load from the local storage
function loadTodoList() {
  let todoItem;
  if (localStorage.getItem("todolist") === null) {
    todoItem = [];
  } else {
    todoItem = JSON.parse(localStorage.getItem("todolist"));
  }

  //Load Content
  todoItem.forEach(function (todo) {
    //Create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    //Create child div
    const todoChildDiv = document.createElement("div");
    todoChildDiv.classList.add("todo-child");

    //Create li date & time
    const todoDateTime = document.createElement("li");
    todoDateTime.textContent = `Date: ${todo[0]} | Time: ${todo[1]}`;
    todoDateTime.classList.add("todo-date-time");
    todoChildDiv.appendChild(todoDateTime);

    //Create li task
    const newTodoTask = document.createElement("li");
    newTodoTask.textContent = todo[2];
    newTodoTask.classList.add("todo-task");
    todoChildDiv.appendChild(newTodoTask);

    todoDiv.appendChild(todoChildDiv);

    //Create check button
    const todoCheck = document.createElement("button");
    todoCheck.innerHTML = '<i class="fas fa-check"></i>';
    todoCheck.classList.add("check-btn");
    todoDiv.appendChild(todoCheck);

    //Create delete button
    const todoDelete = document.createElement("button");
    todoDelete.innerHTML = '<i class="fas fa-trash"></i>';
    todoDelete.classList.add("delete-btn");
    todoDiv.appendChild(todoDelete);

    //Append to the List
    todoList.appendChild(todoDiv);
  });
}

//Function delete list from the local storage
function deleteTodoList(todo) {
  let todoItem;
  if (localStorage.getItem("todolist") === null) {
    todoItem = [];
  } else {
    todoItem = JSON.parse(localStorage.getItem("todolist"));
  }

  const todoIndex = todo.children[1].innerText;
  let todoBlock;
  for (let i = 0, j; i < todoItem.length; i++) {
    for (j = 0; j < todoItem[i].length; j++) {
      if (todoItem[i][j] === todoIndex) {
        todoBlock = i;
        break;
      }
    }
    if (todoItem[i][j] === todoIndex) {
      break;
    }
  }

  todoItem.splice(todoBlock, 1);
  localStorage.setItem("todolist", JSON.stringify(todoItem));
}
