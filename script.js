'use strict'

const arrowWithHint = document.querySelector('.arrow');
const buttonStart = document.querySelector('.button__start');
const enterHint = document.querySelector('.enter');
const input = document.querySelector('.hide-number');
const attemptsText = document.querySelector('.attempts');
const modal = document.querySelector('.modal');
const modalMessage = document.querySelector('.modal-message');
const message = document.querySelector('.message');
const closeModalButton = document.querySelector('.close-modal');
let bestResultText = document.querySelector('.best-result');
let gessingFigure;
let attempts;
let bestResult = +localStorage.getItem('bestRes') || 0;
let step = 0;

buttonStart.addEventListener('click', startNewGame);
closeModalButton.addEventListener('click', closeModal);
input.addEventListener('focus', showEnterHint);
input.addEventListener('keyup', inputProcessing);

setTimeout(showArrowWithHint, 2000);

init();

function startNewGame() {
  init();
}

function init() {
  gessingFigure = createGessingFigure();
  attempts = 10;
  attemptsText.textContent = attempts;
  step = 0;

  if(bestResult === 0) {
    bestResultText.textContent = 'none';
  } else {
    showmessage(bestResult);
  }
}

function showArrowWithHint() {
  arrowWithHint.style.display = 'flex';
}

function createGessingFigure() {
  return Math.ceil(Math.random() * 20);
}

function showEnterHint() {
  enterHint.style.display = 'block';
}

function inputProcessing(event) {
  if(event.key === 'Enter') {
    compareFigures(+input.value);
    input.value = '';
  }
}

function showModal(text) {
  modal.style.display = 'block';
  modalMessage.style.display = 'flex';
  message.textContent = text;
}

function closeModal() {
  modal.style.display = 'none';
  modalMessage.style.display = 'none';
  message.textContent = '';
  modalMessage.style.backgroundColor = '#000000';
  closeModalButton.style.backgroundColor = '#000000';
}

function compareFigures(value) {

  if(isNaN(value)) {
    showModal('Введите число!');
    return;
  }

  if(value > 20 || value < 1) {
    showModal('Число должно находится в пределах от 1 до 20!');
    return;
  }

  if(value < gessingFigure) {
    attempts--;
    step++;
    attemptsText.textContent = attempts;
    showModal(`Не верно! Скрытое число больше ${value}!`);
    checkatAtempts();
    return;
  }

  if(value > gessingFigure) {
    attempts--;
    step++;
    attemptsText.textContent = attempts;
    showModal(`Не верно! Скрытое число меньше ${value}!`);
    checkatAtempts();
    return;
  }

  if(gessingFigure === value) {
    attempts--;
    step++;
    attemptsText.textContent = attempts;
    showModal(`Поздравляем! Вы угадали! Вам потребовалось ${step} попыток!`);
    modalMessage.style.backgroundColor = '#ff0000';
    closeModalButton.style.backgroundColor = '#ff0000';
    changebestResult();
    startNewGame();
    return;
  }

}

function checkatAtempts() {
  if (attempts === 0) {
    showModal(`Вы проиграли! Верное число - ${gessingFigure}!`);
    startNewGame();
  }
}

function changebestResult() {
  if(bestResult === 0) {
    bestResult = step;
    setbestResult();
    showmessage(step);
    return;
  }

  if(bestResult > step) {
    bestResult = step;
    setbestResult();
    showmessage(step);
    return;
  }
}

function setbestResult() {
  localStorage.setItem('bestRes', bestResult);
}

function showmessage(step) {
  if(step === 1) {
    bestResultText.textContent = `решение задачи за 1 шаг!`
  }

  if(step > 1 && step < 5) {
    bestResultText.textContent = `решение задачи за ${step} шагa!`
  }

  if(step >= 5 && step <= 10) {
    bestResultText.textContent = `решение задачи за ${step} шагов!`
  }
}



