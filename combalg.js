// комбинаторные алгоритмы
function comb(m, n) {
  // сочетания из m по n элементов
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

function combSet(m, n) {
  /*
  combSet(2, 5) = [
          00011, 
          00101, 
          00110,
          01001,
          01010,
          01100,
          10001,
          10010,
          10100,
          11000
        ]
  */
  
}

function div(val, by) {
    return (val - val % by) / by;
}