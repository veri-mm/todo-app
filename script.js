const todoForm = document.querySelector(".todo-form");
const input = document.querySelector(".input");
const todoItems = document.querySelector(".todo-items");

todoForm.addEventListener("submit", function(event){
    event.preventDefault();

    const li = document.createElement("li");
    li.setAttribute("class","item"); //<li> class="item">

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox"); //<input type="checkbox">
    checkbox.setAttribute("class","checkbox"); //<input type="checkbox" class="checkbox"
    checkbox.addEventListener("change", function(event){
        const checked = event.target.checked;

        if(checked === true){
            li.classList.add("checked");
        }else{
        li.classList.remove("checked");
        }
    });

    const span = document.createElement("span");
    span.innerText = input.value;

    const button = document.createElement("button");
    button.setAttribute("class","delete-button"); //<button class="delete-button">
    button.innerText = "X"
    button.addEventListener("click",function(){
        todoItems.removeChild(li);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);

    todoItems.appendChild(li);
});

