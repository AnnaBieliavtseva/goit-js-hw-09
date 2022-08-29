import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePickerRef = document.querySelector('#datetime-picker');
const startTimerRef = document.querySelector('button[data-start]');
const daysSpanRef = document.querySelector('span[data-days]');
const hoursSpanRef = document.querySelector('span[data-hours]');
const minutesSpanRef = document.querySelector('span[data-minutes]');
const secondsSpanRef = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr('input#datetime-picker', options);

let selectedTime = new Date().getTime();
console.log(selectedTime);

function onStartTimer() {
  setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTime - currentTime;
    console.log(deltaTime);
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysSpanRef.textContent = days;
    hoursSpanRef.textContent = hours;
    minutesSpanRef.textContent = minutes;
    secondsSpanRef.textContent = seconds;
    console.log(days, hours, minutes, seconds);
  }, 1000);
}

startTimerRef.addEventListener('click', onStartTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
