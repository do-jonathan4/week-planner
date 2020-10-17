var selectDay = document.querySelector('.week');
var schedule = document.querySelector('.event-viewer');
var addEntry = document.querySelector('.addEntry');
var modal = document.querySelector('.modal');
var entryWeek = document.getElementById('entryWeek');
var entrySubmit = document.getElementById('entrySubmit');
var entryTime = document.getElementById('entryTime');
var entryDescription = document.getElementById('entryDescription');
var tableRow = document.querySelectorAll('tr');

selectDay.addEventListener('click', dayOfWeek);
addEntry.addEventListener('click', entryModal);
entrySubmit.addEventListener('click', addTask);

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
window.onclick = function (event) {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
};

function addTask(event) {
  for (var i = 1; i < tableRow.length; i++) {
    if (!tableRow[i].firstElementChild.textContent && !tableRow[i].lastElementChild.textContent) {
      tableRow[i].firstElementChild.textContent = entryTime.value;
      tableRow[i].lastElementChild.textContent = entryDescription.value;

      event.preventDefault();
      modal.classList.add('hidden');
      entryTime.value = '';
      entryDescription.value = '';
    }
  }
}
