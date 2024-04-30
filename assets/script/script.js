//A. CREATE DIV FUNCTION
function createDiv(type,parent,content,className) {
    const newDiv=document.createElement(type);
    if (content!=null) {
      newDiv.innerHTML=content;
    }
    if (className!=null) {
      newDiv.classList.add(className);
    }
    parent.appendChild(newDiv);
    return newDiv;
}

//B. ADDING TASKS
const taskField = document.getElementById('taskfield');
const addButton = document.getElementById('addbutton');
const ul = document.querySelector('ul');

let taskList = [];

//1. Load previously inputed tasks
let existingTasks = localStorage.getItem('todolist');
if (existingTasks) {
    let existingArray = JSON.parse(existingTasks);
    taskList = [...existingArray];
}

function createEntry(entry) {
    if (entry === null) {
        return
    };
    //you already have the checked variable for the entry here
    const {todo, checked} = entry;
    const task = createDiv('li', ul, '', 'task');
    const taskName = createDiv('span', task, todo, 'taskname');
    const check = createDiv('input', task, '', 'checkbox');
    check.setAttribute("type", "checkbox");
    check.setAttribute("name", "taskdone");

    checkTask(check, task, todo?.replace(' ', ''));

    //add the checked attribute to your checkbox if the checked variable above is true
    if(checked === true) {
        check.checked = true;
        task.style.textDecoration = 'line-through';
        task.style.color = 'grey';
    }

    const deleteTaskButton = createDiv('button', task, 'x', 'deletetask');

    deleteTaskFunction(task, deleteTaskButton, todo?.replace(' ', ''));
}

taskList.forEach(element => {
    createEntry(element);
});

//2. Add a new task
addButton.addEventListener("click", () => {
    let taskValue = taskField.value;
    let entryObject = {todo: taskValue, checked: false, id: taskValue.replace(' ', '')}
    taskList.push(entryObject);

    createEntry(entryObject);

    taskField.value = '';
});

//C. DELETING TASKS
function deleteTaskFunction(div, button, id) {
    button.addEventListener("click", () => {
        div.remove();
        taskList = taskList.filter(element => {
            return element && element?.id!==id;
        });
        console.log(taskList);
    });
};

function checkTask(check, task, id) {
    check.addEventListener('change', () => {
        if(check.checked) {
            task.style.textDecoration = 'line-through';
            task.style.color = 'grey';
        } else {
            task.style.textDecoration = 'none';
            task.style.color = 'inherit';
        }

        taskList = taskList.map((element) => {
            if(element && element?.id === id) {
                element.checked = !element.checked;
            }
            if(element && element != "null") {
                return element
            }
        });
    })
}

//D. SAVE TO LOCAL STORAGE
window.addEventListener("beforeunload", () => {
    localStorage.removeItem('todolist');
    localStorage.setItem('todolist', JSON.stringify(taskList));
});
