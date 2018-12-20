// комбинаторные алгоритмы
function combSet(m, n) {
  /*
  combSet(m, n) = 
    combSet(m, n - 1) ++ combSet(m - 1, n - 1)
    
  combSet(2, 5) = [
          '0' + combSet(2, 4)
          00011, 
          00101, 
          00110,
          01001,
          01010,
          01100,
          
          '1' + combSet(1, 4)
          10001,
          10010,
          10100,
          11000
        ]
  */
  if(m < 0 || n < 0 || m > n) {
    throw new Error("неверные аргументы функции combSet");
  }
  if(m == 0) {
    return [(new Array(n)).fill(0)]; // n = 3 => [[0, 0, 0]]
  }
  if(n == m) {
    return [(new Array(n)).fill(1)]; // n = 3 => [[1, 1, 1]]
  }
  
  var left = combSet(m, n - 1);
  var right = combSet(m - 1, n - 1);
  left = left.map(arr => [0].concat(arr));
  right = right.map(arr => [1].concat(arr));
  return left.concat(right);
}

function combSetString(m, n) {
  if(m < 0 || n < 0 || m > n) {
    throw new Error("неверные аргументы функции combSetString");
  }
  if(m == 0) {
    return [(new Array(n)).fill(0).join('')]; // n = 3 => ['000']
  }
  if(n == m) {
    return [(new Array(n)).fill(1).join('')]; // n = 3 => ['111']
  }
  
  var left = combSetString(m, n - 1);
  var right = combSetString(m - 1, n - 1);
  left = left.map(s => '0' + s);
  right = right.map(s => '1' + s);
  return left.concat(right);
}

function comb(m, n) {
  // сочетания из n по m элементов
  // набор m элементов, выбранных из данного множества, содержащего n различных элементов.
  if(m < 0 || n < 0 || m > n) {
    throw new Error("неверные аргументы функции comb");
  }
  if(m == n || m == 0) {
    return 1;
  }
  if(m > div(n, 2)) {
    m = n - m;
  }
  // c(m, n) = [ n! / (n - m)! ] / m! = 
  // = n * (n - 1) * ... * (n - m + 1)  /  [ 1 * 2 * 3 * ... * (m - 1) * m ] = 
  // = n / 1 * (n - 1) / 2 * (n - 2) / 3 * ... * (n - m + 1) / m
  var res = 1;
  for(var i = 1; i <= m; i++) {
    res *= (n - i + 1);
    res = div(res, i);
  }
  return res;
}

function div(val, by) {
  return (val - val % by) / by;
}