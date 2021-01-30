let cards = ["apple", "apple", "banana", "banana", "orange", "orange", "ananas", "ananas", "strawberry", "strawberry", "cherry", "cherry"];
let deckCard = document.querySelectorAll(".card-box-inner");
let alreadyFlipped = false;
let firstCard, secondCard;
let matchWin = 0;
let stopRotation = false;
let timer = document.getElementById("countdown");
let levelMoves = 4;   // number of moves allowed
let moves = 0;
let counterMoves = document.querySelector('.moves');


// Type a new user name
$("#saveName").on("click", function() {
  $("#user_name").text( $("#username").val());
});


// Wait-Listen for click
deckCard.forEach(currentValue => currentValue.addEventListener("click", flipCard));
// flip the card only after these conditions
function flipCard() {
    if (moves < levelMoves) {
       
    if (stopRotation) return;
    if (this === firstCard) return;
    this.classList.add("flip");
    
// first click    
    if (!alreadyFlipped) {        
        alreadyFlipped = true;
        firstCard = this;
        console.log(firstCard);
        
        return;
    };
// second click     
        
        secondCard = this;
        console.log(secondCard);
        moveCounter();
        ceckMatch();               
} else {resetGameBtn()
youLose();
};
};

function noClickEvent() {
$(".card-box-inner").each(function() {
    $(this).off("click")
});
};

// The cards are not clickable, both first and second card
function disableClick() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    stopRotation = false;
    alreadyFlipped = false;
    firstCard = null;
    secondCard = null;
}    

// check if there is a match between two cards
        function ceckMatch() {
        if (firstCard.dataset.card === secondCard.dataset.card) {
            matchWin++;
            console.log(matchWin);
            disableClick();
        } else {
            stopFlippinCard();
            
        }
        

        youWin();
        
    };
function stopFlippinCard() {
    stopRotation = true; 

    setTimeout(function() {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        stopRotation = false;
        alreadyFlipped = false;
        firstCard = null;
        secondCard = null;
    }, 1400);
}
  
// timeout helps to see the rotation of the second card






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

// after the shuffle, re-assign the cards data attribute to the new cards deck
function assignCardDeck() {
    $(".card-box-inner").each(function(index) {
        $(this).attr("data-card", cards[index]);
    });
}

//  Toast you win
function youWin() {
    
    if (matchWin == 6) {setTimeout(function() {
        console.log("wiiinnnnnnnnn");
        $("#toastWin").toast('show');
        }, 800);            
    };
};

//  Toast you lose
function youLose() { 
    deckCard.forEach(currentValue => currentValue.removeEventListener("click", flipCard));    
        setTimeout(function() {
        console.log("lose");
        
        $("#toastLose").toast('show');
        }, 300); 
         
    };             
    


$("#resetBtn").click(function() {
    resetGameBtn();
});
function resetGameBtn() {
    console.log("resetttaaaaa");
    matchWin = 0;

    deckCard.forEach(currentValue => currentValue.classList.remove("flip"));
    
    deckCard.forEach(currentValue => currentValue.addEventListener("click", flipCard));
    stopRotation = false;
    alreadyFlipped = false;
    firstCard = null;
    secondCard = null;
    secondsLeft = 30;
    
    moves = 0;
    $(".moves").text("0");
    setTimeout(function() {
        shuffle(cards);
    }, 400);    
};


function moveCounter() {
    if (moves <= levelMoves) {
    moves++;
    counterMoves.innerHTML = moves;
    } else {
        console.log("fuori conteggio");
        youLose();
    }    
};