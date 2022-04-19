const cards = document.querySelectorAll('.card');
let flippedCards = document.querySelectorAll('.flip');
const currentScoreContainer = document.querySelector('.current-score-container')
const currentScore = document.querySelector('.current-score');
const congrats = document.querySelector('.congrats');
let hasFlippedCard = false;
let firstCard;
let secondCard;
let lock = false;
let counter = 0;

function flipCard() {
  if (lock) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    if (lock) return;
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  (firstCard.dataset.card === secondCard.dataset.card) ? disableCards() : unflipCards();
  counter++;
  currentScore.textContent = counter;

  checkCardsFlipped();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetCards();
}

function unflipCards() {
  lock = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetCards();
  }, 1000);
}

function checkCardsFlipped() {
  let flippedCards = document.querySelectorAll('.flip');

  if (flippedCards.length === cards.length) {
    congrats.textContent = `Вы прошли игру за ${counter} шагов`;
    currentScoreContainer.classList.add('hidden');
  }
}

function resetCards() {
  hasFlippedCard = false;
  lock = false;
  firstCard = null;
  secondCard = null;
}

function shuffleCards() {
  cards.forEach(card => {
    let randomNumber = Math.floor(Math.random() * cards.length);
    card.style.order = randomNumber;
  })
}
shuffleCards();

cards.forEach(card => card.addEventListener('click', flipCard));

console.log(`Оценка - 50 / 60 баллов\nКритерии:
[+] реализован интерфейс игры +5
[+] в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
[+] Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10
[+] Игра завершается, когда открыты все карточки +10
[+] По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10
[-] Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +0
[+] По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10
[-] Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +0
`)