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

var view = {
  displayTodos: function(day) {
    var tableBody = document.querySelector('tbody');
    var today = document.querySelector('.today');
    var sentence = day.textContent;

    today.textContent = 'Scheduled Events for ' + sentence;

    var todaySchedule = schedule[sentence].task;
    tableBody.innerHTML = '';

    todaySchedule.forEach(function (row, index) {
      var tr = document.createElement('tr');
      var tdTime = document.createElement('td');
      var tdDesc = document.createElement('td');
      tr.id = index;

      tdTime.textContent = todaySchedule[index].time;
      tdDesc.textContent = todaySchedule[index].description;

      tdDesc.append(this.createDeleteButton(), this.createUpdateButton());
      tr.append(tdTime, tdDesc);
      tableBody.append(tr);
    }, this);
  },
  createUpdateButton: function() {
    var updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.className = 'updateButton';
    return updateButton;
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  buttonListener: function() {
    var tableBody = document.querySelector('tbody');

    tableBody.addEventListener('click', function(event) {
      var elementClicked = event.target;
      var position = elementClicked.parentNode.parentNode.id;
      if (elementClicked.className === 'deleteButton') {
        console.log(position);
      }
      if (elementClicked.className === 'updateButton') {
        console.log(position);
      }
    });
  },
  tableListener: function() {
    var selectDay = document.querySelector('.week');

    selectDay.addEventListener('click', function (event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'week') {
        return;
      }
      view.displayTodos(elementClicked);
    });
  }
};

view.buttonListener();
view.tableListener();


//temp
var addEntry = document.querySelector('.addEntry');

var modal = document.querySelector('.modal');
var entryWeek = document.getElementById('entryWeek');
var entryTime = document.getElementById('entryTime');
var entryDescription = document.getElementById('entryDescription');
var entrySubmit = document.getElementById('entrySubmit');

addEntry.addEventListener('click', entryModal);
entrySubmit.addEventListener('click', addTask);

function entryModal() {
  modal.classList.remove('hidden');
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
//delete for next function
