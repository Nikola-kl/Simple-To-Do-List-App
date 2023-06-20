//necessary references from the DOM
const taskInput = document.getElementById('taskInput');
const taskButton = document.getElementById('addTextButton');
const taskList = document.getElementById('taskUL');
let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
// const tasks = [];

localStorage.setItem("tasks", JSON.stringify(tasks))

//add an event listener to the Add button
taskButton.addEventListener('click', () => addTask(false));

window.addEventListener("load",() => {
    tasks.forEach((item) => {
       
    addTask(item);
    })
console.log(JSON.stringify(tasks)) 
})


// Create a new list item when clicking on the "Add" button
function addTask(newTask = false) {
    
    console.log(newTask)
    if (taskInput.value === '' && !newTask) {
        alert('Write a new task');
    } else {
        const task = newTask ? newTask : {
            id: Date.now(), //generates a unique id
            text: taskInput.value, //.value property sets or returns the value of the value attribute of a text field
            completed: false
        };
        tasks.push(task); //adds the task object to the tasks array

        console.log(task.text)
        const taskItem = document.createElement('li');
        taskItem.innerText = task.text;
        taskItem.dataset.id = task.id;
        taskList.appendChild(taskItem);
        taskInput.value = '';

        // Create a "close" button and append it to each list item

        let close = document.createElement('span');
        close.innerHTML = '\u00d7';
        taskItem.appendChild(close);

        console.log(taskItem.innerText)
       
        // taskItem.addEventListener('click', function() {
        //     if (!task.completed) {}
        //     taskItem.classList.toggle('completed');
        //     task.completed = task.completed ? false : true;
        // });

        // Add event listeners for the list items and close button

        taskItem.addEventListener('click', handleTaskClick)
        console.log(task)

        close.addEventListener('click', removeTask)
        console.log(task)

        // after add, we save whole list

        if(!newTask){
            console.log('munuo sam ga')
            const serializedArrayOfTasks = JSON.stringify(tasks);
            localStorage.setItem("tasks", serializedArrayOfTasks);
        }
    };
}

// Toggles the completion of tasks

function handleTaskClick(event) {
        const taskItem = event.target;
        taskItem.classList.toggle('completed');
        const taskId = tasks.findIndex((task) => {
            return task.id.toString() === taskItem.dataset.id
        });

        if(taskId){
            tasks[taskId].completed = tasks[taskId].completed ? false : true;
        };
}



// Add code here to remove the task

const removeTask = (event) => {   
    /**
     * // Ovo koristi kad ne zelis da okines event u parent elementu
     * The stopPropagation() method of the Event interface prevents further propagation of the current event in the capturing and bubbling phases.
     */
    event.stopPropagation();
    const taskItem = event.target.parentNode; // Ovo se koristi da bi imao referencu na parent element <LI> od <span> elementa koji se klikne
    taskItem.remove();
    console.log(taskItem.dataset.id);
    
    tasks = tasks.filter((task) => { 
        return task.id.toString() !== taskItem.dataset.id
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}




// Add a "checked" symbol when clicking on a list item