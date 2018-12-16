// https://en.wikipedia.org/wiki/Pip_(counting)
const ALLCARDS = 52;
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["♥", "♣", "♦", "♠"];
// diamonds (♦), clubs (♣), hearts (♥) and spades (♠)
const pokerHands = [
    "NOTHING",
	"HIGH_CARD",
	"ONE_PAIR",
	"TWO_PAIR",
	"THREE_OF_A_KIND",
	"STRAIGHT",
	"FLASH",
	"FULL_HOUSE",
	"FOUR_OF_A_KIND",
	"STRAIGHT_FLASH",
	"ROYAL_FLASH"
];

var p, edit, btn;

function setup() {
  noCanvas();
  noLoop();
  edit = createInput('');
  btn = createButton("show board");
  p = createP('please enter number of card');
  
  btn.mousePressed(onPressBtn);
  edit.input(onInput);
}

function onPressBtn() {
	p.html(getBoardString([0,1,2,3,51]));
}

function onInput() {
	var cardNumber = Number(edit.value());
	if(cardNumber < ALLCARDS) {
		p.html(getCardStringFromNumber(cardNumber) + " ");
	} else {
		p.html("wrong input");
	}
}

function getCardStringFromNumber(n) {
	var suit = floor(n / ranks.length);
	var rank = n % ranks.length;
	return getCardString(rank, suit);
}

function getCardString(rank, suit) {
	return ranks[rank] + suits[suit];
}

function getBoardString(board) {
	var str = "";
	for(var i = 0; i < board.length; i++) {
		str += getCardStringFromNumber(board[i]) + " ";
	}
	return str;
}














