// https://en.wikipedia.org/wiki/Pip_(counting)
const ALLCARDS = 52;
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const suits = ["c", "d", "h", "s"];
const suitsWithUnicode = ["c♣", "d♦", "h♥", "s♠"];
// diamonds (♦), clubs (♣), hearts (♥) and spades (♠)
const handClassString = {
  "-1": "WRONG_HAND",
  0: "HIGH_CARD",
  1: "ONE_PAIR",
  2: "TWO_PAIR",
  3: "THREE_OF_A_KIND",
  4: "STRAIGHT",
  5: "FLUSH",
  6: "FULL_HOUSE",
  7: "FOUR_OF_A_KIND",
  8: "STRAIGHT_FLUSH",
  9: "ROYAL_FLUSH"
};

const handClassConst = {
  WRONG_HAND: -1,
  HIGH_CARD: 0,
  ONE_PAIR: 1,
  TWO_PAIR: 2,
  THREE_OF_A_KIND: 3,
  STRAIGHT: 4,
  FLUSH: 5,
  FULL_HOUSE: 6,
  FOUR_OF_A_KIND: 7,
  STRAIGHT_FLUSH: 8,
  ROYAL_FLUSH: 9
};

const NOT_FOUND = -1;

const compareConst = {
  EQUAL: 0,
  GREATER: 1,
  LOWER: 2,
  WRONG: 3
};