function decode(bits) {
  parity = function (number) {
    return number % 2;
  };
  console.log("Bitii: ", bits);
  var r = 1;
  var nr = bits.length;
  while (Math.pow(2, r) < parseInt(nr) + 1) {
    r = r + 1;
  }
  var i = 0,
  k = 0,
  j = 0,
  t = 0;
  var z = [];
  for (i = 0; i < nr; i++) {
    if (i == Math.pow(2, t) - 1) {
      z[t] = 0;
      for (j = i; j < nr; j = j + 2 * (i + 1)) {
        for (k = j; k < j + i + 1; k++) {
          if (k < nr) {
            z[t] = parity(z[t] + parseInt(bits[k]));
          }
        }
      }
      t++;
    }
  }
  var errorPosition = 2;
  for (i = 0; i < r; i++) {
    errorPosition = errorPosition + parseInt(z[i]) * Math.pow(2, i);
    console.log("err = ", errorPosition);
  }
  var errorDetected = false;

  if (errorPosition != 0) errorDetected = true;
  if (errorDetected) {
    bits[errorPosition - 1] = parity(bits[errorPosition - 1] + 1);
  }

  return {
    errorCorrected: errorDetected,
    errorPosition: errorPosition - 1,
    bits: bits,
  };
}
exports.decode = decode;
