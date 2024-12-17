// Event untuk menambahkan tugas
document.getElementById("addTaskBtn").addEventListener("click", addTask);

// Fungsi untuk menambahkan tugas ke localStorage dan DOM
function addTask() {
    let heading = document.getElementById("heading").value;
    let content = document.getElementById("content").value;

    if (heading === "" || content === "") {
        alert("Form Harus Diisi");
    } else {
        localStorage.setItem(heading, content);

        // Tampilkan data terbaru ke daftar
        renderTask(heading, content);

        document.getElementById("heading").value = "";
        document.getElementById("content").value = "";
    }
}

// Fungsi untuk menampilkan tugas di DOM
function renderTask(heading, content) {
    const taskList = document.getElementById("taskList");

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
        <h3>${heading}</h3>
        <p>${content}</p>
    `;

    taskList.appendChild(taskItem);
}

// Fungsi untuk mengambil semua data dari localStorage saat halaman dimuat
function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; 

    for (let i = 0; i < localStorage.length; i++) {
        const heading = localStorage.key(i);
        const content = localStorage.getItem(heading);

        renderTask(heading, content);
    }
}

window.addEventListener("load", loadTasks);
