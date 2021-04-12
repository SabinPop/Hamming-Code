var app = new Vue({
  el: "#hamming-encoder",
  data: {
    dataBits: [],
    status: "",
    numberOfDataBits: 0,
  },
  methods: {
    addBits({ target }) {
      const input = {
        target: {
          value: target.value,
        },
      };
      this.dataBits = input.target.value;
      this.numberOfDataBits = this.dataBits.length;
    },
    getN() {
      return `${this.numberOfDataBits}`;
    },
    getBits() {
      return `${this.dataBits}`;
    },

    send: function () {
      if (this.validate(this.dataBits) === true) {
        var encodedMessage = this.encode(this.dataBits);
        // this.status = encodedMessage + ' encoded sent to server ';
        console.log(encodedMessage, this.dataBits);
        return axios
          .put("http://localhost:3000/message", { bits: encodedMessage })
          .then((response) => (this.status = response.data));
      }
    },

    encode: function (bits) {
      var r = 1;
      var nr = parseInt(this.numberOfDataBits);
      while (Math.pow(2, r) < parseInt(nr) + parseInt(r) + 1) {
        r = r + 1;
      }
      var code = [];
      var i = 0,
        k = 0;
      for (i = 0; i < r; i++) {
        code[Math.pow(2, i) - 1] = -1;
      }
      for (i = 0; i < nr + r; i++) {
        if (code[i] != -1) {
          code[i] = parseInt(bits[k].data);
          k++;
        }
      }
      console.log("Hamming : ", code);
      var j = 0;
      k = 0;
      for (i = 0; i < nr + r; i++) {
        if (code[i] == -1) {
          code[i] = 0;
          for (j = i; j < nr + r; j = j + 2 * (i + 1)) {
            for (k = j; k < j + i + 1; k++) {
              if (k != i && k < nr + r) {
                code[i] = this.parity(parseInt(code[i]) + parseInt(code[k]));
              }
            }
          }
        }
      }
      return code;
    },
    parity: function (number) {
      return number % 2;
    },
    validate: function (bits) {
      for (var i = 0; i < bits.length; i++) {
        if (this.validateBit(bits[i].data) === false) return false;
      }
      return true;
    },
    validateBit: function (character) {
      if (character === null) return false;
      return parseInt(character) === 0 || parseInt(character) === 1;
    },
  },
});
