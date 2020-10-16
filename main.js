var day = document.querySelector('.week');
var schedule = document.querySelector('.event-viewer');

day.addEventListener('click', dayOfWeek);

function dayOfWeek() {
  var sentence = event.target.textContent;
  if (event.target.className === 'week') {
    return;
  }
  schedule.textContent = 'Scheduled Events for ' + sentence;
}
