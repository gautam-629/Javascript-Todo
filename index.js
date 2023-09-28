const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskIdInput = document.getElementById("taskId");
const statusSelect = document.getElementById("statusSelect");
const taskList = document.getElementById("taskList");
const deleteModal = document.getElementById("deleteModal");
const confirmDeleteButton = document.getElementById("confirmDelete");
const cancelDeleteButton = document.getElementById("cancelDelete");
let tasks = [];

function generateTaskId() {
  return `task_${Date.now()}`;
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
                    <span>Task ID: ${task.id}</span>
                    <span>Task: ${task.task}</span>
                    <span>Status: ${task.status}</span>
                    <span>Created: ${task.createdAt}</span>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="openDeleteModal(${index})">Delete</button>
                `;
    taskList.appendChild(listItem);
  });
}

function addOrUpdateTask(event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  const taskId = taskIdInput.value || generateTaskId();
  const status = statusSelect.value;
  const createdAt = new Date().toLocaleString();

  if (taskText === "") return;

  if (taskIdInput.value) {
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks[index].task = taskText;
      tasks[index].status = status;
      renderTasks();
      taskForm.reset();
    }
  } else {
    const newTask = { id: taskId, task: taskText, status, createdAt };
    tasks.push(newTask);
    renderTasks();
    taskForm.reset();
  }
}

function editTask(index) {
  const task = tasks[index];
  taskInput.value = task.task;
  statusSelect.value = task.status;
  taskIdInput.value = task.id;
}

function openDeleteModal(index) {
  deleteModal.style.display = "block";

  confirmDeleteButton.onclick = function () {
    deleteTask(index);
    deleteModal.style.display = "none";
  };

  cancelDeleteButton.onclick = function () {
    deleteModal.style.display = "none";
  };
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

taskForm.addEventListener("submit", addOrUpdateTask);
renderTasks();
