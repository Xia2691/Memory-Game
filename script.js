const cards = document.querySelectorAll('.card');
const winMessage = document.getElementById('winMessage');
const loseMessage = document.getElementById('loseMessage');
const restartButton = document.getElementById('restartButton');
const mistakeCounter = document.getElementById('mistakeCounter');

let flippedCards = [];
let mistakeCount = 0;
const maxMistakes = 12;
const totalPairs = cards.length / 2; // Total number of pairs

// Update mistake counter display
function updateMistakeCounter() {
  mistakeCounter.textContent = `Mistakes: ${mistakeCount}`;
}

// Reset the game
function resetGame() {
  cards.forEach(card => {
    card.classList.remove('flipped');
    card.style.order = ''; // Reset card order
  });

  winMessage.style.display = 'none';
  loseMessage.style.display = 'none';
  restartButton.style.display = 'none';

  flippedCards = [];
  mistakeCount = 0;
  updateMistakeCounter();

  shuffleCards();
}

// Shuffle cards randomly
function shuffleCards() {
  cards.forEach(card => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
  });
}

// Check if the player has won
function checkWin() {
  const flippedCardsCount = document.querySelectorAll('.card.flipped').length;
  if (flippedCardsCount === cards.length) {
    winMessage.style.display = 'block';
    restartButton.style.display = 'block';
  }
}

// Check if the player has lost
function checkLose() {
  if (mistakeCount >= maxMistakes) {
    loseMessage.style.display = 'block';
    restartButton.style.display = 'block';
  }
}

// Add event listener to each card
cards.forEach(card => {
  card.addEventListener('click', () => {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.dataset.card === secondCard.dataset.card) {
          flippedCards = [];
          checkWin();
        } else {
          mistakeCount++;
          updateMistakeCounter();
          checkLose();

          setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
          }, 1000);
        }
      }
    }
  });
});

// Add event listener to the restart button
restartButton.addEventListener('click', resetGame);

// Shuffle cards at the start
shuffleCards();
