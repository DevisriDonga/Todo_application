let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoElement = document.getElementById("saveTodoElement");

function getTodoListFromLocalStorage() {
  let stringFieldTodoList = localStorage.getItem("todoList");
  let parsedTodoItem = JSON.parse(stringFieldTodoList);
  if (parsedTodoItem === null ){
    return [];
  } else {
      return parsedTodoItem;
  
    }
  }

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoElement.onclick = function() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};


function onTodoStatusChange(checkboxId,labelId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
   labelElement.classList.toggle("checked");
}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);
let deleteIndex = todoList.findIndex(function(eachTodo){
   let eachTodoId = "todo"+eachTodo.uniqueNo;
   if(eachTodoId === todoId) {
    return true;
   } else {
    return false;
   }
});
todoList.splice(deleteIndex,1);
}

function createAndAppendTodo(todo) {
  
  let checkboxId = "checkbox"+todo.uniqueNo;
  let labelId = "label"+todo.uniqueNo;
  let todoId = "todo"+todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container","d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.classList.add("checkbox-input");
  inputElement.onclick = function() {
    onTodoStatusChange(checkboxId,labelId);
  };
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for",checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function() {
    onDeleteTodo(todoId);
  }
  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}

function onAddTodo() {

  let userInputElement = document.getElementById("todoUserInput");
  let userInputValue = userInputElement.value;

  if(userInputValue === "") {
    alert("Enter valid input");
    return;
  }
  todosCount = todosCount+1;

  let newTodo ={
      text: userInputValue, 
      uniqueNo: todosCount,
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value= "";

}

addTodoButton.onclick = function () {
  onAddTodo();
}


