var api = require("./api.js").app;
var hamming = require("./hamming.js");

api.put("/message", function (request, response) {
  var bits = request.body.bits;

  console.log(bits)

  var decoded = hamming.decode(distortBit(bits, 4));
  if (decoded.errorCorrected) {
    response.json("One error corrected on position: " + decoded.errorPosition);
  }
  response.json("Message received without errors");
});
api.listen(3000, function () {
  console.log("CORS-enabled web server is listening on port 3000...");
});

function distortBit(bits, index) {
  bits[index] = (bits[index] + 1) % 2;
  return bits;
}