const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

btnStartRef.addEventListener('click', onStartInterval);
btnStopRef.addEventListener('click', onStopInterval);

let intervalID = 0;

function onStartInterval() {
  btnStartRef.setAttribute('disabled', true);
  intervalID = setInterval(onChangeColor, 1000);
}

function onStopInterval() {
  btnStartRef.removeAttribute('disabled');
  clearInterval(intervalID);
}

function onChangeColor() {
  let randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
