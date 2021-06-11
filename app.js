const input = document.querySelector(".task");
const submit = document.querySelector(".submit");
const clear = document.getElementById("clrAll");
const ul = document.getElementById("ulList");
const filter = document.getElementById('filter');

loadEventLister();

function loadEventLister() {
    document.addEventListener('DOMContentLoaded', getTasks);
    submit.addEventListener("click", addTask); 
    clear.addEventListener("click", clearAll); 
    ul.addEventListener('click', del); 
    filter.addEventListener('keyup', filterList);
}

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        
     //Create li with class name taskList
    const li = document.createElement("li");
    li.classList = "listCollections";
    //Put value into li
    li.appendChild(document.createTextNode(task));


    //Create a with class name taskListLink
    const a = document.createElement('a');
    a.classList = "taskListLink delete-item";
    a.innerHTML = '<i class="far fa-trash-alt"></i>';
    
 
    li.appendChild(a);

    ul.appendChild(li);

    });
}


function addTask(e) {

    //Check empty task
    if(input.value === '') {
        alert('Please enter a task.');
    }

    //Create li with class name taskList
    const li = document.createElement("li");
    li.classList = "listCollections";
    //Put value into li
    li.appendChild(document.createTextNode(input.value));


    //Create a with class name taskListLink
    const a = document.createElement('a');
    a.classList = "taskListLink delete-item";
    a.innerHTML = '<i class="far fa-trash-alt"></i>';
    
 
    li.appendChild(a);

    ul.appendChild(li);

    //Store in LocalStorage
    storeTaskInLocalStorage(input.value);

console.log(ul);
// Empty task
input.value = "";
e.preventDefault();

}


//Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


function clearAll() {
   ul.innerHTML = '';

   clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}
//Remove items
function del(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        removeTasksFromLocalStorge(e.target.parentElement.parentElement);
    }
    console.log(e.target);
}

function removeTasksFromLocalStorge(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    }); 

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterList(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.listCollections').forEach 
    (function(task) {

        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'flex';
        }else {
            task.style.display = 'none';
        }

    });

}