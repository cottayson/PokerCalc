var p, edit, btn;

function setup() {
	noCanvas();
	noLoop();
	edit = createInput('');
	btn = createButton("show board");
	p = createP('please enter number of card');
	
	btn.mouseReleased(onPressBtn);
	edit.input(onInput);
}

// diamonds (♦), clubs (♣), hearts (♥) and spades (♠)
function getHandClass(hand) {
	// hand = "8♥ 5♣ 3♥ 2♠ 3♥" -> one pair
	// начинаем проверку с ROYAL_FLASH и идем назад
	var handSuits = hand.map(getSuit);
	for(var i = 0; i < hand.length; i++) {
		
	}
	console.log(handSuits);
}

function isWrongHand() {
	// если карты в множестве hand одинаковы, то true
}

function compareHands(hard1, hand2) {
	// hand1 = "5♥ 6♥ 7♥ 8♥ 9♥"
	// hand2 = "2♥ 3♥ 4♥ 5♥ 6♥"
	// руки не могут содержать одинаковые карты
	// в этой функции определяем какой набор из 5 карт лучше
}

function onPressBtn() {
	p.html(getHandString([0,1,2,3,51]));
}

function onInput() {
	var cardNumber = Number(edit.value());
	if(cardNumber < ALLCARDS) {
		p.html(getCardStringFromNumber(cardNumber) + " ");
	} else {
		p.html("wrong input");
	}
}

function getSuit(n) {
	return floor(n / ranks.length);
}

function getRank(n) {
	return n % ranks.length;
}

function getCardStringFromNumber(n) {
	var suit = getSuit(n);
	var rank = getRank(n);
	return getCardString(rank, suit);
}

function getCardString(rank, suit) {
	return ranks[rank] + suits[suit];
}

function getHandString(board) {
	var str = "";
	for(var i = 0; i < board.length; i++) {
		str += getCardStringFromNumber(board[i]) + " ";
	}
	return str;
}














