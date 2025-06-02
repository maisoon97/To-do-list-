   let tasks = [{
        "title": "book reading",
        "date": "1/6/2025",
        "isDone": true,
    },
    {
        "title": "end project",
        "date": "19/7/2025",
        "isDone": true,
    },
    {
        "title": "course teaching",
        "date": "19/8/2025",
        "isDone": false,
    }
    ];


    function getTasksFromStorage() {
        let tasksArray = JSON.parse(localStorage.getItem("tasks"));
        tasks=tasksArray ?? [];//= // if (tasks == null) {tasks = []}; else {tasks=tasksArray}
    }
    getTasksFromStorage();


    function displaytask() {
        document.getElementById("tasks").innerHTML = "";
        let index = 0;
        for (element of tasks) {
            let content = `   <!-- task -->
                    <div class="task ${element.isDone ? '' : 'done'}">
                        <!-- task info -->
                        <div style="width: 70%; padding-left: 8px;">
                            <h2>${element.title}</h2>
                            <div>
                                <span class="material-symbols-outlined">
                                    calendar_month
                                </span><span>${element.date}</span>
                            </div>
                        </div>
                        <!-- //task info// -->
                        <!-- task action -->
                        <div style="display: flex; justify-content: space-between;align-items: center; width: 20%;">
                            <button onclick="deleteTask(${index})" class="button-style" style="background-color: red; color:white"><span
                                    class="material-symbols-outlined">
                                    delete
                                </span></button>
                                ${element.isDone ? `<button onclick="toggleTaskCompletion(${index})" class="button-style" style="background-color:green  ; color:white"><span
                                    class="material-symbols-outlined">
                                    check
                                </span></button>`: `
                                <button onclick="toggleTaskCompletion(${index})" class="button-style " style="background-color:rgb(255, 94, 94); color:white">
                                    <span class="material-symbols-outlined">
                                    cancel
                                    </span></button>`}
                                      
                            <button onclick="(editTask(${index}))" class="button-style" style="background-color: blue; color:white"><span
                                    class="material-symbols-outlined">
                                    edit
                                </span></button>

                        </div>
                        <!-- //task action// -->
                    </div>
                    <!-- //task// -->`
            document.getElementById("tasks").innerHTML += content;
            index++;

        }

    }
    displaytask();
    document.getElementById("add").addEventListener("click", function () {
        let titletask = window.prompt("Enter your task name:", "");
        let now = new Date();
        let date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
        console.log(date);
        let task = {
            "title": titletask,
            "date": date,
            "isDone": false
        };
        tasks.push(task);
        storgeTasks();
        displaytask();
    });


    function deleteTask(index) {
        let isconfermed = confirm(`are ypu want to delete ${tasks[index].title} task?`);
        if (isconfermed) {
            tasks.splice(index, 1);
            storgeTasks();
            displaytask();
        }


    }


    function editTask(index) {
        let editingTask = window.prompt("please Enter the new title of task.", tasks[index].title);
        if (editingTask != null && editingTask != "") {
            tasks[index].title = editingTask;
            storgeTasks();
        }
        displaytask();
    }



    function toggleTaskCompletion(index) {
        let task = tasks[index];
        task.isDone = !task.isDone;
        storgeTasks();
        displaytask();
    }
    //  ++++++++++++++Storge function
    function storgeTasks() {
        let tasksString = JSON.stringify(tasks);
        localStorage.setItem("tasks", tasksString);
    }
