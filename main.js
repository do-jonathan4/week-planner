var schedule = {
  Sunday: [],
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: []
};

var todoList = {
  addEntry: function(day, newTask) {
    if (schedule[day]) {
      var num = schedule[day].length;
      schedule[day][num] = newTask;
    }
  },
  updateEntry: function(day, position, newTask) {
    if (schedule[day]) {
      schedule[day][position] = newTask;
    }
  },
  deleteEntry: function (day, position) {
    schedule[day].splice(position, 1);
  }
};

var handlers = {
  addEntry: function() {
    var modal = document.getElementById('modal-entry');
    var entryWeek = document.getElementById('entryWeek');
    var entryTime = document.getElementById('entryTime');
    var entryDescription = document.getElementById('entryDescription');
    var entrySubmit = document.getElementById('entrySubmit');

    modal.classList.remove('hidden');

    entrySubmit.addEventListener('click', function (event) {
      event.preventDefault();

      var newTask = {
        day: entryWeek.value,
        time: entryTime.value,
        description: entryDescription.value,
      };

      todoList.addEntry(entryWeek.value, newTask);
      view.displayTodos(entryWeek.value);

      modal.classList.add('hidden');
      entryWeek.value = '';
      entryTime.value = '';
      entryDescription.value = '';
    });
  },
  updateEntry: function(day, position) {
    var modalUpdate = document.getElementById('modal-update');
    var updateWeek = document.getElementById('updateWeek');
    var updateTime = document.getElementById('updateTime');
    var updateDescription = document.getElementById('updateDescription');
    var updateSubmit = document.getElementById('updateSubmit');

    modalUpdate.classList.remove('hidden');

    updateWeek.value = schedule[day][position].day;
    updateTime.value = schedule[day][position].time;
    updateDescription.value = schedule[day][position].description;

    updateSubmit.addEventListener('click', function(event) {
      event.preventDefault();

      var newTask = {
        day: updateWeek.value,
        time: updateTime.value,
        description: updateDescription.value,
      };

      if (day === updateWeek.value) {
        todoList.updateEntry(updateWeek.value, position, newTask);
      } else {
        todoList.addEntry(updateWeek.value, newTask);
        if (schedule[day]) {
          schedule[day].splice(position, 1);
        }
      }

      view.displayTodos(updateWeek.value);

      modalUpdate.classList.add('hidden');
      updateWeek.value = '';
      updateTime.value = '';
      updateDescription.value = '';
    });
  },
  deleteEntry: function(day, position) {
    var modalDelete = document.getElementById('modal-delete');
    modalDelete.classList.remove('hidden');

    modalDelete.addEventListener('click', function(event) {
      if (event.target.className === 'delete-yes') {
        todoList.deleteEntry(day, position);
        modalDelete.classList.add('hidden');
        view.displayTodos(day);
      } else {
        modalDelete.classList.add('hidden');
      }
    });
  }
};

var view = {
  displayTodos: function(day) {
    if (schedule[day]) {
      var tableBody = document.querySelector('tbody');
      var today = document.querySelector('.today');

      today.textContent = 'Scheduled Events for ' + day;

      var todaySchedule = schedule[day];
      tableBody.innerHTML = '';

      todaySchedule.forEach(function (row, index) {
        var tr = document.createElement('tr');
        var tdTime = document.createElement('td');
        var tdDesc = document.createElement('td');
        var divTime = document.createElement('div');
        var divDesc = document.createElement('div');
        var tdSpan = document.createElement('span');
        tr.className = index + ' ' + day;

        divTime.textContent = todaySchedule[index].time;
        divDesc.textContent = todaySchedule[index].description;

        tdSpan.append(this.createDeleteButton(), this.createUpdateButton());
        divDesc.append(tdSpan);
        tdDesc.append(divDesc);
        tdTime.append(divTime);
        tr.append(tdTime, tdDesc);
        tableBody.append(tr);
      }, this);
    }

    view.countTasks();
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
  countTasks: function() {
    var sunCount = document.querySelector('.sun-count');
    var monCount = document.querySelector('.mon-count');
    var tueCount = document.querySelector('.tue-count');
    var wedCount = document.querySelector('.wed-count');
    var thurCount = document.querySelector('.thur-count');
    var friCount = document.querySelector('.fri-count');
    var satCount = document.querySelector('.sat-count');

    sunCount.textContent = schedule.Sunday.length;
    monCount.textContent = schedule.Monday.length;
    tueCount.textContent = schedule.Tuesday.length;
    wedCount.textContent = schedule.Wednesday.length;
    thurCount.textContent = schedule.Thursday.length;
    friCount.textContent = schedule.Friday.length;
    satCount.textContent = schedule.Saturday.length;
  },
  entryListener: function () {
    window.addEventListener('click', function (event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'addEntry') {
        handlers.addEntry();
      }
    });
  },
  buttonListener: function() {
    var tableBody = document.querySelector('tbody');

    tableBody.addEventListener('click', function(event) {
      var elementClicked = event.target;
      var position = elementClicked.parentNode.parentNode.parentNode.parentNode.classList[0];
      var day = elementClicked.parentNode.parentNode.parentNode.parentNode.classList[1];
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteEntry(day, position);
      }
      if (elementClicked.className === 'updateButton') {
        handlers.updateEntry(day, position);
      }
    });
  },
  modalListener: function() {
    window.addEventListener('click', function(event) {
      if (event.target.className === 'modal') {
        event.target.classList.add('hidden');
      }
    });
  },
  weekListener: function() {
    var selectDay = document.querySelector('.week');

    selectDay.addEventListener('click', function (event) {
      var elementClicked = event.target;
      if (elementClicked.className === 'week') {
        return;
      }
      var day = elementClicked.innerText.split('\n\n')[0];
      if (Number.isInteger(parseFloat(day))) {
        return;
      }
      view.displayTodos(day);
    });
  }
};

view.entryListener();
view.buttonListener();
view.modalListener();
view.weekListener();
