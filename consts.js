// https://en.wikipedia.org/wiki/Pip_(counting)
const ALLCARDS = 52;
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const suits = ["c♣", "d♦", "h♥", "s♠"];
// diamonds (♦), clubs (♣), hearts (♥) and spades (♠)
const pokerHandClass = [
    "NOTHING",
	"HIGH_CARD",
	"ONE_PAIR",
	"TWO_PAIR",
	"THREE_OF_A_KIND",
	"STRAIGHT",
	"FLUSH",
	"FULL_HOUSE",
	"FOUR_OF_A_KIND",
	"STRAIGHT_FLUSH",
	"ROYAL_FLUSH"
];

const NOTHING = 0,
	HIGH_CARD = 1,
	ONE_PAIR = 2,
	TWO_PAIR = 3,
	THREE_OF_A_KIND = 4,
	STRAIGHT = 5,
	FLUSH = 6,
	FULL_HOUSE = 7,
	FOUR_OF_A_KIND = 8,
	STRAIGHT_FLUSH = 9,
	ROYAL_FLUSH = 10;