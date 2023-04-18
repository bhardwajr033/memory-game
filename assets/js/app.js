const cards = document.querySelectorAll(".memory-card");
const timerValue = document.querySelector(".timer-value");
const movesValue = document.querySelector(".moves-value");
const scoreValue = document.querySelector(".score-value");
const startEndBtn = document.querySelector(".start-end-button");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gameOn = false;
let gameScore = 0;

startEndBtn.addEventListener("click", (event) => {
  if (event.target.textContent === "Start") {
    startGame();
  } else {
    EndGame();
  }
});

function startGame() {
  shuffle();
  timerValue.textContent = 0;
  movesValue.textContent = 0;
  scoreValue.textContent = 0;
  gameScore = 0;
  startEndBtn.textContent = "End";
  gameOn = true;
  cards.forEach((card) => card.addEventListener("click", flipCard));
  timerUpdater();
}

function EndGame() {
  resetBoard();
  startEndBtn.textContent = "Start";
  gameOn = false;
  cards.forEach((card) => card.classList.remove("flip"));
  cards.forEach((card) => card.removeEventListener("click", flipCard));
}

function timerUpdater() {
  setTimeout(() => {
    if (gameOn) {
      timerValue.textContent = parseInt(timerValue.textContent) + 1;
      timerUpdater();
    }
  }, 1000);
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  // update moves
  movesValue.textContent = parseInt(movesValue.textContent) + 1;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;

  if (firstCard.dataset.nametag === secondCard.dataset.nametag) {
    // update score
    scoreValue.textContent = parseInt(scoreValue.textContent) + 1;
    gameScore += 1;
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();

  if (gameScore === 8) {
    setTimeout(() => {
        EndGame();
    }, 1000);
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    const randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}
