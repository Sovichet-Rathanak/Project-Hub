function appendTask(){
    //Handle Create
    const input = document.querySelector(".user-input").value;
    if(input === ""){
        alert("Task Cannot Be Empty");
        return;
    }
    
    var element = document.createElement('div');
    element.innerHTML = `<div class="task" draggable="true"><div class="task-heading">Urgency:<div class="custom-dropdown"><div onclick="setActive('default')" class="option default">No Urgency</div><ul class="dropdown-options inactive"><li onclick="setActive('low')" class="option low">Low</li><li onclick="setActive('medium')" class="option medium">Medium</li><li onclick="setActive('high')" class="option high">High</li></ul></div></div><h3 class="message"></h3></div>`;
    
    let taskMessage = element.querySelector('.message');
    taskMessage.textContent = input;
    console.log(document.querySelector('.task.message'))

    document.querySelector(".todo.todo-block").appendChild(element);
    const dropDown = document.querySelector('.custom-dropdown');

    dropDown.addEventListener('click', function () {
        const options = document.querySelector('.dropdown-options');
        const defaultOpt = document.querySelector('.default');

        if (options.classList.contains("opt-active")) {
            options.classList.remove("opt-active");
            defaultOpt.classList.remove("hidden"); 
        } else {
            options.classList.add("opt-active");
            defaultOpt.classList.add("hidden"); 
        }
    });

    //Handle Dragging
    const draggable = element.querySelectorAll('.task');
    const containers = document.querySelectorAll('.todo-block');

    draggable.forEach(draggable => {
        draggable.addEventListener('dragstart', function(){
            draggable.classList.add("dragging")
        })

        draggable.addEventListener('dragend', function(){
            draggable.classList.remove("dragging")
        })
    });

    containers.forEach(container => {
        container.addEventListener('dragover', event =>{
            event.preventDefault();
            const draggable = document.querySelector('.dragging');
            container.appendChild(draggable);
        })
    })
}

function setActive(input) {
    const defaultOpt = document.querySelector('.default');
    const options = document.querySelectorAll('.custom-dropdown .option');
    options.forEach(option => option.classList.remove('selected'));

    const optionSelect = document.querySelector(`.custom-dropdown .option.${input}`);
    if (optionSelect) {
        optionSelect.classList.add('selected');
        defaultOpt.textContent = optionSelect.textContent;

        const urgencyLevels = ['low', 'medium', 'high'];
        defaultOpt.classList.remove(...urgencyLevels);
        if (urgencyLevels.includes(input)) {
            defaultOpt.classList.add(input);
        }
    }
}

