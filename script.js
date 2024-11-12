const words = [
    { english: "Apple", arabic: "تفاحة" },
    { english: "Car", arabic: "سيارة" },
    { english: "House", arabic: "منزل" },
    { english: "Book", arabic: "كتاب" },
    { english: "Tree", arabic: "شجرة" },
    { english: "Sun", arabic: "شمس" },
    { english: "Water", arabic: "ماء" },
    { english: "Food", arabic: "طعام" }
];

// Create a shuffled deck with both English and Arabic words
const deck = shuffle([...words.flatMap(word => [word.english, word.arabic])]);

const gameBoard = document.getElementById("game-board");
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Function to create cards
deck.forEach(word => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.word = word;

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.textContent = word;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
});

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        // If this is the first card flipped
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = isMatchingPair(firstCard.dataset.word, secondCard.dataset.word);

    if (isMatch) {
        // If it's a match, keep them flipped
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    } else {
        // If not a match, flip them back after a delay
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
}

function isMatchingPair(word1, word2) {
    const pair = words.find(pair => pair.english === word1 || pair.arabic === word1);
    return pair && (pair.english === word2 || pair.arabic === word2);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
