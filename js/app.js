
// Contains all cards
let newDeck = ["diamond", "diamond", "anchor", "anchor", "paper plane", "paper plane", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];
let counter = 0;
let cardsInPlay = [];
let timer = 0;




// TIMER AND CLICK DELAY

// Add 1 second to timer
function oneSec() {
	timer++;
	$('.time').text(timer);
}
let clock = setInterval(oneSec, 1000);

// Stop clock
function stopClock() {
	clearInterval(clock);
}





// BUILD DECK

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

// Create new gameboard
function createDeck(array) {
	for (let i = 0; i < newDeck.length; i++) {
		$( '.deck' ).append( '<li class="card clickable"><i class="fa fa-' + String(newDeck[i].replace(/ /g,"-")) + '"></i>' + newDeck[i] + '</li>');
	}
	return array;
}




// GUESS COUNTER

// Set counter to 0 on page load
$( '.moves' ).text(0);

// Add +1 for every click and display on page
function addCount() {
	counter++;
	$( '.moves' ).text(counter);
	if (counter === 28 || counter === 36 ) {
		$( '.stars li:last-child' ).remove();
	}
}




// MATCH CHECKERS

// Adds clicked element to list to check for matches
function addToList(clickedElement) {
	cardsInPlay.push(clickedElement);
	$( clickedElement ).addClass( 'open show' );
}

//  Check if list items match
function checkMatch() {
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0].innerText === cardsInPlay[1].innerText) {
			yesMatch();
		} else {
			noMatch();
		}
		cardsInPlay = [];
	}
}

// If match, add match class and remove open and show classes
function yesMatch() {
	$( '.show' ).addClass( 'match' ).removeClass( 'open show' );
}

// If no match, remove open and show classes after short delay
function noMatch() {
	setTimeout(function(){
		$( '.show' ).removeClass( 'open show' ).addClass( 'clickable' ); }, 300);
}

// Check to see if all matches have been found. If so, display win alert.
function allMatch() {
	let matches = $( 'li.match' ).length;
	let stars = $( '.stars li' ).length;
	if (newDeck.length === matches) {
		stopClock();
		alert("You win!" + "\nTotal guesses: " + counter + "\nStar ranking: " + stars + "\nTime: " + timer);
		let playAgain = prompt("Play again? Y/N?").toLowerCase();
		if 	(playAgain = "y" || "yes") {
			location.reload();
		}
	}
}



// NEW GAME

// New game operations
const newGame = function() {
	shuffle(newDeck);
	createDeck(newDeck);
}

// Initiate new game on page load 
newGame();



// GAME LISTENERS

// Listen for player to click on card and run functions
$( '.card' ).click(function() {
	var clickedElement = this;
	if (clickedElement.classList.contains('clickable')) {
		addToList(this);
		console.log(cardsInPlay);
		checkMatch();
		addCount();
		allMatch();
		$(this).removeClass('clickable');
	}
});

//  Load new game on click
$( '.restart' ).click(function(){
	location.reload();
})





