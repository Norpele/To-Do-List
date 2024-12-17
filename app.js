// Event untuk menambahkan tugas
document.getElementById("addTaskBtn").addEventListener("click", addTask);

// Fungsi untuk menambahkan tugas ke localStorage dan DOM
function addTask() {
    let heading = document.getElementById("heading").value;
    let content = document.getElementById("content").value;
    let time_do_task = document.getElementById("select-time").value;

    if (heading === "" || content === "") {
        alert("Form Harus Diisi");
    } else {
        const taskData = {
            content : content,
            time_do_task : time_do_task
        };

        localStorage.setItem(heading, JSON.stringify(taskData));

        // Tampilkan data terbaru ke daftar
        renderTask(heading, taskData);

        document.getElementById("heading").value = "";
        document.getElementById("content").value = "";
        document.getElementById("time_do_task").value = "";
    }
}

// Fungsi untuk menampilkan tugas di DOM
function renderTask(heading, taskData) {
    const taskList = document.getElementById("taskList");

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
        <h3>${heading}</h3>
        <p>${taskData.content}</p>
        <p>Akan Dilakukan pada jam : ${taskData.time_do_task}</p>
        <p>Hitung Mundur : </p>
        <button class= "heading-button" data-heading="${heading}"> Hapus </button>
    `;

    taskList.appendChild(taskItem);

    const delete_button = taskItem.querySelector(".heading-button");
    delete_button.addEventListener("click", () => delete_task(heading,taskItem));
}

function delete_task(heading) {
    localStorage.removeItem(heading);
    window.location.reload();
}

// Fungsi untuk mengambil semua data dari localStorage saat halaman dimuat
function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; 

    for (let i = 0; i < localStorage.length; i++) {
        const heading = localStorage.key(i);
        const taskData = JSON.parse(localStorage.getItem(heading));

        renderTask(heading, taskData);
    }
}

window.addEventListener("load", loadTasks);
