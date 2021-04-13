var api = require("./api.js").app;
var hamming = require("./hamming.js");

api.put("/message", function (request, response) {
  var bits = request.body.bits;
  var err = rand(0, request.body.length);
  var decoded = hamming.decode(distortBit(bits, err));
  console.log("error: ", err);
  if (decoded.errorCorrected) {
    return response.json("One error corrected on position: " + decoded.errorPosition);
  }
  return response.json("Message received without errors");
});
api.listen(3000, function () {
  console.log("CORS-enabled web server is listening on port 3000...");
});

function distortBit(bits, index) {
  bits[index] = (bits[index] + 1) % 2;
  return bits;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}