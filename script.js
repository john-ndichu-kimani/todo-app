
let light = document.querySelector('.moon');
let container = document.querySelector('.container');
let todoLink = document.querySelector('.todo-links');
let todoInput = document.getElementById('txt-todo');
let dark = document.querySelector('.sun');

let hero = document.querySelector('.hero');
let todoList = document.getElementById('todo-list');








const toggleDarkTheme = () =>{
  container.classList.toggle('dark-theme');
  todoLink.classList.toggle('dark-theme');
  todoList.classList.toggle('dark-theme');
  todoInput.classList.toggle('dark-theme');
  hero.classList.toggle('dark-theme');
  light.classList.toggle('dark-theme')
  dark.classList.toggle('dark-theme');

  
};

// const toggleDarkTheme = () =>{

//  light.classList.toggle('light-theme');
// };




light.addEventListener('click',toggleDarkTheme);
// dark.addEventListener('click',toggleDarkTheme);

  


document.addEventListener('DOMContentLoaded', loadTodos);

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(todo => displayTodo(todo));
  updateItemsLeft();
}

function addTodo() {
 
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    const todo = {
      id: Date.now().toString(),
      text: todoText,
      complete: false
    };
    displayTodo(todo);
    saveTodoToLocalStorage(todo);
    todoInput.value = '';
  }
}

document.querySelector('.createTodoForm').addEventListener('submit', addTodo);

function displayTodo(todo) {
 
  const item = document.createElement('div');
  item.className = 'item';
  item.id = todo.id;

  const itemText = document.createElement('div');
  itemText.className = 'item-text';
  itemText.onclick = () => toggleComplete(todo.id);

  const checkIcon = document.createElement('ion-icon');
  checkIcon.name = todo.complete ? 'checkmark-circle' : 'checkmark-circle-outline';
  checkIcon.className = 'check';

  const p = document.createElement('p');
  p.textContent = todo.text;
  if (todo.complete) {
    p.classList.add('complete');
  }

  const deleteIcon = document.createElement('img');
  deleteIcon.src = 'images/icon-cross.svg';
  deleteIcon.alt = 'cross icon';
  deleteIcon.className = 'delete';
  deleteIcon.onclick = () => deleteTodo(todo.id);

  itemText.appendChild(checkIcon);
  itemText.appendChild(p);
  item.appendChild(itemText);
  item.appendChild(deleteIcon);
  todoList.appendChild(item);
}

function saveTodoToLocalStorage(todo) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  updateItemsLeft();
}

function toggleComplete(id) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const todo = todos.find(todo => todo.id === id);
  todo.complete = !todo.complete;
  localStorage.setItem('todos', JSON.stringify(todos));

  const todoItem = document.getElementById(id);
  const p = todoItem.querySelector('p');
  const icon = todoItem.querySelector('ion-icon');
  p.classList.toggle('complete');
  icon.name = todo.complete ? 'checkmark-circle' : 'checkmark-circle-outline';

  updateItemsLeft();
}

function deleteTodo(id) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(todos));
  document.getElementById(id).remove();
  updateItemsLeft();
}

function updateItemsLeft() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const itemsLeft = todos.filter(todo => !todo.complete).length;
  document.getElementById('items-left').textContent = itemsLeft;
}

function filterTodos(filter) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  let filteredTodos = todos;
  if (filter === 'active') {
    filteredTodos = todos.filter(todo => !todo.complete);
  } else if (filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.complete);
  }

  filteredTodos.forEach(todo => displayTodo(todo));
  
  document.querySelectorAll('.todo-links ul li').forEach(li => li.classList.remove('active'));
  document.querySelector(`.todo-links ul li:contains(${filter.charAt(0).toUpperCase() + filter.slice(1)})`).classList.add('active');
}

function clearCompleted() {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => !todo.complete);
  localStorage.setItem('todos', JSON.stringify(todos));
  filterTodos('all');
}
