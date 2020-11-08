var todolist = {
  schedule: {
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
  },
  add: function(text) {
    this.schedule.push({text: text});
  },
  update: function(index, text) {
    var todo = this.schedule[index];
    todo.text = text;
  },
  delete: function(index) {
    this.schedule.splice(index, 1);
  }
};

var modal = {
  add: function() {
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

  },
  update: function() {
    var modalUpdate = document.querySelector('.modal-update');
    var updateWeek = document.getElementById('updateWeek');
    var updateTime = document.getElementById('updateTime');
    var updateDescription = document.getElementById('updateDescription');

    var updateButton = document.querySelector('tbody');
    updateButton.addEventListener('click', updateModal);

    var updateSubmit = document.getElementById('updateSubmit');
    updateSubmit.addEventListener('click', updateTask);

    function updateModal(event) {
      if (event.target.className.indexOf('update-button') === -1) {
        return;
      }
      modalUpdate.classList.remove('hidden');
      updateWeek.value = sentence;
      updateTime.value = schedule[sentence].task[event.target.classList[1]].time;
      updateDescription.value = schedule[sentence].task[event.target.classList[1]].description;
    }

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
  },
  // delete: function(index) {

  // }
};

var view = {
  displayTodos: function() {
    var tableBody = document.querySelector('tbody');
    var todaySchedule = schedule[sentence].task;

    tableBody.innerHTML = '';

    // for (var i = 0; i < todaySchedule.length; i++) {
    //   tdTime.textContent = todaySchedule[i].time;
    //   tdDesc.textContent = todaySchedule[i].description;

    tableBody.todaySchedule.forEach(function (todo, index) {
      var tr = document.createElement('tr');
      var tdTime = document.createElement('td');
      var tdDesc = document.createElement('td');

      tr.id = index;
      tdDesc.append(this.createUpdateButtton());
      tdDesc.append(this.createDeleteButton());
      tr.append(tdTime, tdDesc);
      tableBody.append(tr);
    }, this);
  },
  createUpdateButtton: function() {
    var updateButtton = document.createElement('button');
    updateButtton.textContent = 'Update';
    updateButtton.className = 'updateButtton';
    return updateButtton;
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setupEventListeners: function() {
    var tableBody = document.querySelector('tbody');
    tableBody.addEventListener('click', function(event) {
      var elementClicked = event.target;
      if (elementClicked === 'deleteButton') {
        var index = parseInt(elementClicked.parentNode.id);
        modal.delete(index);
      }
    });
  }
};

var selectDay = document.querySelector('.week');
var today = document.querySelector('.today');
var addEntry = document.querySelector('.addEntry');

selectDay.addEventListener('click', dayOfWeek);
function dayOfWeek(event) {
  if (event.target.className === 'week') {
    return;
  }
  var sentence = event.target.textContent;
  today.textContent = 'Scheduled Events for ' + sentence;
}

window.addEventListener('click', closeModal);
function closeModal(event) {
  if (event.target === modal || event.target === modalUpdate) {
    modal.classList.add('hidden');
    modalUpdate.classList.add('hidden');
  }
}
