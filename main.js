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
var entryWeek = document.getElementById('entryWeek');
var entryTime = document.getElementById('entryTime');
var entryDescription = document.getElementById('entryDescription');
var entrySubmit = document.getElementById('entrySubmit');

var modalUpdate = document.querySelector('.modal-update');
var updateWeek = document.getElementById('updateWeek');
var updateTime = document.getElementById('updateTime');
var updateDescription = document.getElementById('updateDescription');

var tableBody = document.querySelector('tbody');

addEntry.addEventListener('click', entryModal);
selectDay.addEventListener('click', dayOfWeek);
window.addEventListener('click', closeModal);
entrySubmit.addEventListener('click', addTask);

function entryModal() {
  modal.classList.remove('hidden');
}
function closeModal(event) {
  if (event.target === modal || event.target === modalUpdate) {
    modal.classList.add('hidden');
    modalUpdate.classList.add('hidden');
  }
}

function dayOfWeek(event) {
  if (event.target.className === 'week') {
    return;
  }
  var sentence = event.target.textContent;
  today.textContent = 'Scheduled Events for ' + sentence;

  var todaySchedule = schedule[sentence].task;
  tableBody.innerHTML = '';


  todaySchedule.forEach(function(row, index) {
    var tr = document.createElement('tr');
    var tdTime = document.createElement('td');
    var tdDesc = document.createElement('td');
    tr.id = index;

    tdTime.textContent = todaySchedule[index].time;
    tdDesc.textContent = todaySchedule[index].description;

    tr.append(tdTime, tdDesc);
    tableBody.append(tr);
  }, this);

  // for (var i = 0; i < todaySchedule.length; i++) {
  //   var tr = document.createElement('tr');
  //   var tdTime = document.createElement('td');
  //   var tdDesc = document.createElement('td');

  //   var updateBtn = document.createElement('button');
  //   updateBtn.className = 'update-button ' + i;
  //   updateBtn.textContent = "Update";



  // tdDesc.append(updateBtn);
  //   tr.append(tdTime, tdDesc);
  //   tableBody.append(tr);
  // }

  var updateButton = document.querySelector('tbody');
  updateButton.addEventListener('click', updateModal);

  function updateModal(event) {
    if (event.target.className.indexOf('update-button') === -1) {
      return;
    }
    modalUpdate.classList.remove('hidden');
    updateWeek.value = sentence;
    updateTime.value = schedule[sentence].task[event.target.classList[1]].time;
    updateDescription.value = schedule[sentence].task[event.target.classList[1]].description;
  }

  var updateSubmit = document.getElementById('updateSubmit');
  updateSubmit.addEventListener('click', updateTask);

  function updateTask(event) {
    event.preventDefault();

    var newTask = {
      day: updateWeek.value,
      time: updateTime.value,
      description: updateDescription.value,
    };

    schedule[updateWeek.value].task.push(newTask);

    modalUpdate.classList.add('hidden');
    updateWeek.value = '';
    updateTime.value = '';
    updateDescription.value = '';

  }
}

function addTask(event) {
  event.preventDefault();

  var newTask = {
    day: entryWeek.value,
    time: entryTime.value,
    description: entryDescription.value,
  };

  schedule[entryWeek.value].task.push(newTask);

  modal.classList.add('hidden');
  entryWeek.value = '';
  entryTime.value = '';
  entryDescription.value = '';
}
