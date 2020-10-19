var selectDay = document.querySelector('.week');
var schedule = document.querySelector('.event-viewer');
var addEntry = document.querySelector('.addEntry');
var modal = document.querySelector('.modal');
var entryWeek = document.getElementById('entryWeek');
var entrySubmit = document.getElementById('entrySubmit');
var entryTime = document.getElementById('entryTime');
var entryDescription = document.getElementById('entryDescription');
var tableRow = document.querySelectorAll('tr');
var tableBody = document.querySelector('tbody');
var updateButton = document.querySelector('.update');
var modalUpdate = document.querySelector('.modalUpdate');

selectDay.addEventListener('click', dayOfWeek);
addEntry.addEventListener('click', entryModal);
window.addEventListener('click', closeModal);
entrySubmit.addEventListener('click', addTask);
updateButton.addEventListener('click', updateModal);

function dayOfWeek(event) {
  if (event.target.className !== 'day') {
    return;
  }
  var sentence = event.target.textContent;
  schedule.textContent = 'Scheduled Events for ' + sentence;
}

function entryModal() {
  modal.classList.remove('hidden');
}
function updateModal() {
  modalUpdate.classList.remove('hidden');
}
function closeModal(event) {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
}

function addTask(event) {
  event.preventDefault();
  var row = tableBody.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);

  cell1.textContent = entryTime.value;
  cell2.textContent = entryDescription.value;
  cell2.appendChild(updateBtn());

  modal.classList.add('hidden');
  entryTime.value = '';
  entryDescription.value = '';
}

function updateBtn() {
  var update = document.createElement('button');
  update.textContent = 'Update';
  update.className = 'update';
  return update;
}
