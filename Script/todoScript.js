function appendTask() {
    // Handle Create
    const input = document.querySelector(".user-input").value;
    if (input === "") {
        alert("Task Cannot Be Empty");
        return;
    }

    var element = document.createElement('div');
    element.classList.add("task");
    element.setAttribute("draggable", "true");
    
    element.innerHTML = `
        <div class="task-heading">
            Urgency:
            <div class="custom-dropdown">
                <div class="option default" data-urgency="default">No Urgency</div>
                <ul class="dropdown-options inactive">
                    <li class="option low">Low</li>
                    <li class="option medium">Medium</li>
                    <li class="option high">High</li>
                </ul>
            </div>
        </div>
        <h3 class="message">${input}</h3>
    `;

    document.querySelector(".todo.todo-block").appendChild(element);

    const dropdown = element.querySelector('.custom-dropdown');
    const defaultOpt = dropdown.querySelector('.default');
    const optionsList = dropdown.querySelector('.dropdown-options');

    defaultOpt.addEventListener('click', function () {
        optionsList.classList.toggle('inactive'); 
    });

    dropdown.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function (event) {
            setActive(event.target, event);
            optionsList.classList.add('inactive'); 
        });
    });

    element.addEventListener("dragstart", function () {
        element.classList.add("dragging");
    });

    element.addEventListener("dragend", function () {
        element.classList.remove("dragging");
    });

    document.querySelectorAll(".todo-block").forEach(container => {
        container.addEventListener("dragover", event => {
            event.preventDefault();
            const draggingTask = document.querySelector(".dragging");
            if (draggingTask) {
                container.appendChild(draggingTask);
            }
        });
    });
}

function setActive(option, event) {
    const dropdown = event.target.closest('.custom-dropdown');
    if (!dropdown) return;

    const defaultOpt = dropdown.querySelector('.default');
    const options = dropdown.querySelectorAll('.option');

    options.forEach(opt => opt.classList.remove('selected'));

    option.classList.add('selected');
    defaultOpt.textContent = option.textContent;
    defaultOpt.setAttribute("data-urgency", option.classList[1]); 

    const urgencyLevels = ["low", "medium", "high"];
    defaultOpt.classList.remove(...urgencyLevels);
    if (urgencyLevels.includes(option.classList[1])) {
        defaultOpt.classList.add(option.classList[1]);
    }
}
