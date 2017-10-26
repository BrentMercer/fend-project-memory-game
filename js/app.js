
// Contains all cards
var newDeck = ["diamond", "diamond", "anchor", "anchor", "paper plane", "paper plane", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function createDeck(array) {
	for (let i = 0; i < newDeck.length; i++) {
		$( '.deck' ).append( '<li class="card">' + newDeck[i] + ' </li> ');
	}
	return array;
}


// New game operations
const playGame = function() {
	shuffle(newDeck);
	createDeck(newDeck);
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



// Add clicked card to pair checker
let cardsInPlay = [];

// Toggle 'show' class on card click, add to pair-checker
function openedCards() {
	const opener = this;
	$(opener).addClass('show');
	cardsInPlay.push(opener); // ### This line is no good. Needs to push one class per 'show' match.
	console.log(cardsInPlay);
}

// Run function that adds up to 2 cards to check against each other
function checkCards() {
	const checker = this;
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0] === cardsInPlay[1]) {
			$('show').addClass('match').removeClass('show');
		}
		cardsInPlay = [];
	}
}





// Initiate new game on page load
playGame();

// Listen for player to click on card and run functions
$( '.card' ).click(function() {
	openedCards();
	checkCards();
});






