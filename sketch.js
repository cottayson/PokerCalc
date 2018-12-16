var p, edit, btn;

function setup() {
	noCanvas();
	noLoop();
	edit = createInput('Qh 5c Td');
	btn = createButton("ввод");
	p = createP('введите строку карт');
	
	btn.mouseReleased(onPressBtn);
	edit.input(onInput);
}

function onPressBtn() {
	var obj = readHand(edit.value());
	if(obj.error) {
		p.html(obj.message);
	} else {
		p.html(getHandString(obj.hand));
	}
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

const compareConst = {
	EQUAL: 0,
	GREATER: 1,
	LOWER: 2,
	WRONG: 3
};

function compareHands(hand1, hand2) {
	var unionHand = hand1 + hand2; // объединяем два множества
	if(isWrongHand(unionHand)) {
		// руки не могут содержать одинаковые карты
		return compareConst.WRONG;
	}
	// hand1 = "5♥ 6♥ 7♥ 8♥ 9♥"
	// hand2 = "2♥ 3♥ 4♥ 5♥ 6♥"
	
	// в этой функции определяем какой набор из 5 карт лучше
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
	return -1;
}

function rankSuitToNumber(rank, suit) {
	return suit * ranks.length + rank;
}

function readHand(handString) {
	var hand = [];
	var rank, suit;
	const READ_RANK = 0;
	      READ_SUIT = 1;
	var q = READ_RANK;
	var obj = {error: true};
	for(var i = 0; i < handString.length; i++) {
		var ch = handString[i];
		if(ch == ' ') {
			continue;
		}
		
		if(q == READ_RANK) {
			rank = readFromArray(ranks, ch);
			if(rank == -1) {
				obj.message = ("Ошибка чтения rank в функции readHand: " + handString);
				return obj;
			}
		} else 
		if (q == READ_SUIT) {
			suit = readFromArray(suits, ch);
			if(suit == -1) {
				obj.message = ("Ошибка чтения suit в функции readHand: " + handString);
				return obj;
			}
			hand.push(rankSuitToNumber(rank, suit));
		}
		q = 1 - q; // q = (q + 1) % (READ_SUIT + 1);
	}
	
	if(q == READ_SUIT)
	{
		obj.message = "Требуется указать масть карты в функции readHand: " + handString;
		return obj;
	}
	
	return {hand: hand, error: false};
}