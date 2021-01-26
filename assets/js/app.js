let cards = ["apple", "apple", "banana", "banana", "orange", "orange", "ananas", "ananas", "strawberry", "strawberry", "cherry", "cherry"];
const card_deck = document.querySelectorAll(".card-box-inner");
let alreadyFlipped = false;
let firstCard, secondCard;

// target and flip the card when clicked
function flipCard() {
    this.classList.add("flip");
    
    if (!alreadyFlipped) {
        alreadyFlipped = true;
        firstCard = this;
        
    } else {
        alreadyFlipped = false;
        secondCard = this;
        
        if (firstCard.dataset.card === secondCard.dataset.card) {
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard);
            console.log("match")
        } else {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            console.log("not a match")

        }
        
    };
}

  


// check if there is a match between two cards


card_deck.forEach(currentValue => currentValue.addEventListener("click", flipCard));

// Shuffle all 12 cards
// Fisher-Yates shuffle algorithm logic
function shuffle(cards) {
    let random, temp;
    for (let i = cards.length - 1; i > 0; i--) {
        random = Math.floor(Math.random() * (i + 1));
        temp = cards[i];
        cards[i] = cards[random];
        cards[random] = temp;
        assignCardDeck();
    }
    return cards;
};
shuffle(cards);
console.log(cards);

function assignCardDeck() {
    $(".card-box-inner").each(function(index) {
        $(this).attr("data-card", cards[index]);
    });

}


