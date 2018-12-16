var p, p2, edit, btn;

function setup() {
	noCanvas();
	noLoop();
	edit = createInput('2c 2dAh   As');
	btn = createButton("ввод");
	p = createP('введите строку карт');
	p2 = createP('');
	
	btn.mouseReleased(onPressBtn);
	edit.input(onInput);
}

function onPressBtn() {
	p.html("Какая-то ошибка");
	var hand = readHand(edit.value());
	p.html(getHandString(hand));
	p2.html(hand.join(', '));
}

function onInput() {
	// var cardNumber = Number(edit.value());
	// if(cardNumber < ALLCARDS) {
		// p.html(getCardStringFromNumber(cardNumber) + " ");
	// } else {
		// p.html("wrong input");
	// }
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

function isWrongHand(hand) {
	// если карты в множестве hand одинаковы, то true
	return false;
}

function compareHands(hand1, hand2) {
	var unionHand = hand1 + hand2; // объединяем два множества
	
	if(isWrongHand(unionHand)) {
		// руки не могут содержать одинаковые карты
		return compareConst.WRONG;
	}
	// hand1 = "5♥ 6♥ 7♥ 8♥ 9♥"
	// hand2 = "2♥ 3♥ 4♥ 5♥ 6♥"
	
	// в этой функции определяем какой набор из 5 карт лучше
	// return compareConst.something
}

// ********** CARDS TO STRING **************

function getSuit(n) {
	return floor(n / ranks.length);
}

function getRank(n) {
	return n % ranks.length;
}

function getCardStringFromNumber(n) {
	var rank = getRank(n);
	var suit = getSuit(n);
	return getCardString(rank, suit);
}

function getCardString(rank, suit) {
	return ranks[rank] + suits[suit];
}

function getHandString(hand, options) {
	var str = "";
	for(var i = 0; i < hand.length; i++) {
		str += getCardStringFromNumber(hand[i]) + " ";
	}
	return str;
}
// ********** READ CARDS **************
function readFromArray(arr, ch) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == ch) {
			return i;
		}
	}
	return NOT_FOUND;
}

function readRank(ch) {
	return readFromArray(ranks, ch);
}

function readSuit(ch) {
	return readFromArray(suits, ch);
}

function rankSuitToNumber(rank, suit) {
	return suit * ranks.length + rank;
}

function deleteSpaces(handString) {
	return handString.split(' ').join('');
}

function readHand(handString) {
	var handArray = readHandToArray(handString);
	return handArrayToNumbers(handArray);
}

function rankAndSuitToPair(rankAndSuit) {
	var rank = readRank(rankAndSuit[0]);
	var suit = readSuit(rankAndSuit[1]);
	return {rank, suit};
}

function handArrayToNumbers(handArray) {
	var hand = [];
	for(var i = 0; i < handArray.length; i++) {
		var rankAndSuit = handArray[i];
		var err = checkRankAndSuit(rankAndSuit);
		if(err) {
			throw new Error("Ошибка чтения в функции handArrayToNumbers: " + handArray);
		}
		var pair = rankAndSuitToPair(rankAndSuit);
		hand.push(rankSuitToNumber(pair.rank, pair.suit));
	}
	return hand;
}

function checkRankAndSuit(rankAndSuit) {
	var pair = rankAndSuitToPair(rankAndSuit);
	if(pair.rank == NOT_FOUND || pair.suit == NOT_FOUND) {
		return true;
	}
	return false;
}

function readHandToArray(handString) {
	var handArray = [];
	handString = deleteSpaces(handString);
	
	if(handString.length % 2 == 1) {
		throw new Error("Требуется указать масть карты в функции readHandToArray: " + handString);
	}
	
	for(var i = 0; i < handString.length; i += 2) {
		var rankAndSuit = handString.substring(i, i + 2);
		var err = checkRankAndSuit(rankAndSuit);
		if(err) {
			throw new Error("Ошибка чтения в функции readHandToArray: " + handString);
		}
		handArray.push(rankAndSuit);
	}
	return handArray;
}