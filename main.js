var schedule = {
  Sunday: {
    task: []
  },
  Monday: {
    task: []
  },
  Tuesday: {
    task: []
  },
  Wednesday: {
    task: []
  },
  Thursday: {
    task: []
  },
  Friday: {
    task: []
  },
  Saturday: {
    task: []
  }
};

var selectDay = document.querySelector('.week');
var today = document.querySelector('.today');
var addEntry = document.querySelector('.addEntry');
var modal = document.querySelector('.modal');
var entrySubmit = document.getElementById('entrySubmit');
var entryTime = document.getElementById('entryTime');
var entryDescription = document.getElementById('entryDescription');
var tableBody = document.querySelector('tbody');
var updateButton = document.querySelector('table');
var modalTitle = document.querySelector('.modalTitle');
var entryWeek = document.getElementById('entryWeek');

selectDay.addEventListener('click', dayOfWeek);
addEntry.addEventListener('click', entryModal);
window.addEventListener('click', closeModal);
entrySubmit.addEventListener('click', addTask);
updateButton.addEventListener('click', updateTask);

function dayOfWeek(event) {
  if (event.target.className === 'week') {
    return;
  }
  var sentence = event.target.textContent;
  today.textContent = 'Scheduled Events for ' + sentence;
  viewDay(sentence);
}
function viewDay(forToday) {
  var todaySchedule = schedule[forToday].task;
  tableBody.innerHTML = '';

  for (var i = 0; i < todaySchedule.length; i++) {
    var row = document.createElement('tr');
    var cell1 = document.createElement('td');
    var cell2 = document.createElement('td');
    var updateButton = document.createElement('button');
    updateButton.className =
      'update' + ' ' +
      forToday + ' ' +
      todaySchedule[i].time
      ;
    updateButton.textContent = "Update";

    cell1.textContent = todaySchedule[i].time;
    cell2.textContent = todaySchedule[i].description;
    cell2.appendChild(updateButton);
    row.append(cell1, cell2);
    tableBody.appendChild(row);
  }
}

function entryModal() {
  modal.classList.remove('hidden');
}
function closeModal(event) {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
}

function addTask(event) {
  event.preventDefault();

  var newTask = {};
  newTask.day = entryWeek.value;
  newTask.time = entryTime.value;
  newTask.description = entryDescription.value;

  schedule[entryWeek.value].task.push(newTask);

  modal.classList.add('hidden');
  modalTitle.textContent = 'Add Entry';
  entryWeek.value = '';
  entryTime.value = '';
  entryDescription.value = '';
}

function updateTask(event) {
  if (event.target.className.indexOf('update') === -1) {
    return;
  }
  entryModal();
  var updateClass = event.target.classList;
  modalTitle.textContent = 'Update Entry';
  entryWeek.value = updateClass[1];
  entryTime.value = updateClass[2];

}
