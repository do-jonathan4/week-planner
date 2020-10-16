var selectDay = document.querySelector('.week');
var schedule = document.querySelector('.event-viewer');

selectDay.addEventListener('click', dayOfWeek);

function dayOfWeek(event) {
  if (event.target.className !== 'day') {
    return;
  }
  var sentence = event.target.textContent;
  schedule.textContent = 'Scheduled Events for ' + sentence;
}
