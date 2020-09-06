const todoForm = document.querySelector('.todo-form');
const input = document.querySelector('.input');
const todoItemsList = document.querySelector('.todo-items');

let todos = [];

//add an eventListener on form and listen for submit event
todoForm.addEventListener('submit', function(event){
    //prevent the page from reloading when submitting the form
    event.preventDefault();
    addTodo(input.value);
});

//function to add todo
function addTodo(item){
    if (item !== ''){
        const todo = {
            id: Date.now(), //o que é isso?
            name: item,
            completed: false //pq?
        };
        todos.push(todo);
        addToLocalStorage(todos);
        //clear the input box value
        input.value = '';
    }
}

//function to render given todos to screen - o que?
function renderTodos(todos){
    //clear everything inside <ul> with class=todo-items
    todoItemsList.innerHTML = '';
    todos.forEach(function(item) {
        const checked = item.completed ? 'checked': null; //o que?
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);

        //if item is completed, the add a class to <li> called 'checked'
        if (item.completed === true){
            li.classList.add('checked');
        }

        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>
        `;
        //finally add the <li> to the <ul>
        todoItemsList.append(li);
    });
}

//function to add todos to local storage
function addToLocalStorage(todos){
    //convert the array to string and then store it
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

//function to get everything from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');

    if (reference) {
        //converts back to array and store it in todos array
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

function toggle(id){
    todos.forEach(function(item){
        if (item.id == id){
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}

//deletes a todo from todos array, the updates local storage and render it
function deleteTodo(id){
    todos = todos.filter(function(item){
        return item.id != id;
    });
    addToLocalStorage(todos);
}
getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox'){
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('delete-button')){
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});

