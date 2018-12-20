'use strict'
var p0, p1, p2, pBoard, pClass,
    edit1, edit2, editBoard, 
    btn;
// !!! сравнить одинаковые комбинации compareEqualClasses()
function setup() {
  noCanvas();
  noLoop();
	
  p0 = createP('c♣, d♦, h♥, s♠');
  
  p1 = createP('игрок 1'); 
  edit1 = createInput('Ts Jc');
  
  p2 = createP('игрок 2');
  edit2 = createInput('Kh As');
  
  pBoard = createP('стол');
  editBoard = createInput('3h 4s Qs Kh Ad');
  
  createElement('br');
  btn = createButton('ввод');
  createElement('br');
  pClass = createP('класс');
  
  btn.mouseReleased(onPressBtn);
}

function onPressBtn() {
  pClass.html("ошибка чтения hand1");
  var hand1 = readHand(edit1.value());
  
  pClass.html("ошибка чтения hand2");
  var hand2 = readHand(edit2.value());
  
  pClass.html("ошибка чтения Board");
  var handBoard = readHand(editBoard.value());
  
  var numberOfClass = getHandClass(handBoard);
  
  if(numberOfClass == undefined) {
    var str = "numberOfClass = undefined";
  } else {
    var str = handClassString[numberOfClass];
  }
  pClass.html("на столе " + str);
}

function isWrongHand(hand) {
  // если карты в множестве hand одинаковы, то true
  var copyHand = [];
  for(var i = 0; i < hand.length; i++) {
    copyHand.push(hand[i]);
  }
  copyHand.sort(sortNumber);
  for(var i = 0; i < copyHand.length - 1; i++) {
    if(copyHand[i] == copyHand[i + 1]) {
      return true;
    }
  }
  return false;
}

// ФЛЕШ
function isFlushSuits(handSuits) {
  var s = handSuits[0];
  for(var i = 0; i < handSuits.length; i++) {
    if(handSuits[i] != s) {
      return false;
    }
  }
  return true;
}

// СТРАЙТ
function isStraightRanks(handRanks) {
  // ['2', '3', '4', '5', 'A'] = [0, 1, 2, 3, 12]
  if(handRanks[4] == ranks.length - 1 &&
     handRanks[0] == 0 &&
     handRanks[1] == 1 &&
     handRanks[2] == 2 &&
     handRanks[3] == 3)
  {
    return true;
  }
    
  var r = handRanks[0];
  for(var i = 0; i < handRanks.length; i++) {
    if(handRanks[i] != r++) {
      return false;
    }
  }
  return true;
}

function getIndexOf(elem, countArr) {
  for(var i = 0; i < countArr.length; i++) {
    var pair = countArr[i];
    if(elem == pair.elem) {
      return i;
    }
  }
  return NOT_FOUND;
}

function rankArrayToCounts(rankArray) {
/*[1, 2, 3, 4, 5] => [1, 1, 1, 1, 1] => NOTHING or HIGH_CARD 
  [1, 2, 10, 10, 5] => [1, 1, 1, 2] => ONE_PAIR
  [2, 2, 10, 10, 5] => [1, 2, 2] => TWO_PAIR
  [7, 7, 7, 8, 9] => [1, 1, 3] => THREE_OF_A_KIND
  [7, 7, 7, 8, 8] => [2, 3] => FULL_HOUSE
  [3, 3, 3, 3, 2] => [1, 4] => FOUR_OF_A_KIND
  */
  var b = [];
  for(var i = 0; i < rankArray.length; i++) {
    var elem = rankArray[i];
    var elemIndexInB = getIndexOf(elem, b);
    if(elemIndexInB != NOT_FOUND) {
      b[elemIndexInB].count++;
    } else {
      b.push({elem, count: 1});
    }
  }
  var b2 = b.map(pair => pair.count);
  
  b2.sort(sortNumber);
  
  return b2;
}

function sortNumber(a, b) {
  return a - b;
}

function getFiveHandClass(hand) {
  var handSuits = hand.map(getSuit);
  var handRanks = hand.map(getRank);
  
  handRanks.sort(sortNumber);
  
  console.log("handRanks = ", handRanks);
  
  var aceIsExist = (handRanks[4] == ranks.length - 1);
  var isStraight = isStraightRanks(handRanks);
  var isFlush = isFlushSuits(handSuits);
  
  
  if(isStraight && isFlush && aceIsExist) {
    return handClassConst.ROYAL_FLUSH;
  }
  
  if(isStraight && isFlush) {
    return handClassConst.STRAIGHT_FLUSH;
  }

  var counts = rankArrayToCounts(handRanks);
  console.log("counts = ", counts);
  
  if(counts[1] == 4) {
    return handClassConst.FOUR_OF_A_KIND;
  }
  if(counts[1] == 3) {
    return handClassConst.FULL_HOUSE;
  }
  
  if(isFlush) {
    return handClassConst.FLUSH;
  }
  if(isStraight) {
    return handClassConst.STRAIGHT;
  }
  
  if(counts[2] == 3) {
    return handClassConst.THREE_OF_A_KIND;
  }
  if(counts[1] == 2) {
    return handClassConst.TWO_PAIR;
  }
  if(counts[3] == 2) {
    return handClassConst.ONE_PAIR;
  }
  
  return handClassConst.HIGH_CARD;
}

// diamonds (♦), clubs (♣), hearts (♥) and spades (♠)
function getHandClass(hand) {
  if(hand.length < 5) {
    return handClassConst.NOTHING;
  }
  if(isWrongHand(hand)) {
    return handClassConst.WRONG_HAND;
  }
  // hand = "8♥ 5♣ 3♥ 2♠ 3♥" -> one pair
  // начинаем проверку с ROYAL_FLASH и идем назад
  

  
  if(hand.length == 5) {
    // одна возможная комбинация
    return getFiveHandClass(hand);
  }
  
  if(hand.length == 6) {
    // comb(5, 6) = comb(1, 6) = шесть возможных комбинаций
    // (6) / (1) = 6
    return undefined;
  }
  
  if(hand.length == 7) {
    // comb(5, 7) = comb(2, 7) = (7*6) / (1*2) = 21 комбинаций
    return undefined;
  }
}

// !!! сравнить одинаковые комбинации compareEqualClasses()
function compareHands(hand1, hand2) {
  var unionHand = hand1.concat(hand2); // объединяем два множества
	
  if(isWrongHand(unionHand)) {
    // руки не могут содержать одинаковые карты
    return compareConst.WRONG;
  }
  // hand1 = "5♥ 6♥ 7♥ 8♥ 9♥"
  // hand2 = "2♥ 3♥ 4♥ 5♥ 6♥"
	
  // в этой функции определяем какой набор из 5 карт лучше
  // return compareConst.something
}