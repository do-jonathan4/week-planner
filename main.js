var selectDay = document.querySelector('.week');
var schedule = document.querySelector('.event-viewer');
var addEntry = document.querySelector('.addEntry');
var modal = document.querySelector('.modal');

selectDay.addEventListener('click', dayOfWeek);
addEntry.addEventListener('click', entryModal);

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
