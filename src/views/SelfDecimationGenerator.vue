<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Self-Decimation (Rueppel's) Generator</h1>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <h2>LFSR Starting Values</h2>
        <v-text-field
          color="deep-purple"
          clearable
          clear-icon="mdi-close-circle"
          prepend-icon="mdi-pen"
          label="LFSR Starting Values"
          placeholder="0011001100"
          v-model="LFSRstartValues"
          v-on:keyup="setLFSRstartValues"
          :rules="[rules.required, rules.zeroOnes]"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <h2>LFSR XOR Positions</h2>
        <v-text-field
          color="deep-purple"
          clearable
          clear-icon="mdi-close-circle"
          prepend-icon="mdi-pen"
          label="LFSR XOR Positions"
          placeholder="1010101010"
          v-model="XORpositions"
          v-on:change="setXORpositions"
          :rules="[rules.required, rules.sizing, rules.zeroOnes]"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <h2>Rueppel's <em>d</em> value:</h2>
        <v-text-field
          color="deep-purple"
          clearable
          clear-icon="mdi-close-circle"
          prepend-icon="mdi-pen"
          label="Rueppels d ticks value (recomended max. 10 - huge imapct on performance)"
          placeholder="for ex. 8"
          v-model="dValue"
          v-on:keyup="calcPeriod"
          :rules="[rules.required, rules.numbers]"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <h2>Rueppel's <em>k</em> value:</h2>
        <v-text-field
          color="deep-purple"
          clearable
          clear-icon="mdi-close-circle"
          prepend-icon="mdi-pen"
          label="Rueppels k ticks value (recomended max. 10 - huge imapct on performance)"
          placeholder="for ex. 5"
          v-model="kValue"
          v-on:keyup="calcPeriod"
          :rules="[rules.required, rules.numbers]"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <h2>Number of generated bits:</h2>
        <v-text-field
          color="deep-purple"
          clearable
          clear-icon="mdi-close-circle"
          prepend-icon="mdi-pen"
          label="Amount of bits to generate (this filed is activated while it's loose focus due performace issues)"
          placeholder="for ex. 50"
          v-model="numberOfBits"
          v-on:change="runGenerator"
          :rules="[rules.required, rules.numbers]"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <h2>Output</h2>
        <v-textarea
          color="deep-purple"
          readonly
          label="Output"
          prepend-icon="mdi-pen"
          v-model="output"
        ></v-textarea>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <h2>File Output</h2>
        <v-row class="mt-2">
          <v-btn color="deep-purple" class="white--text" @click="saveOutput">
            Download Output
          </v-btn>
          <v-checkbox
            color="deep-purple"
            v-model="binary"
            label="Binary (default is text)"
            class="mt-1 ml-3"
          />
        </v-row>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <h2>Zero/One Count: {{ zeros + "/" + ones }}</h2>
        <h2>Period: {{ period }}</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import { saveAs } from "file-saver";

export default {
  name: "SelfDecimationGenerator",

  data: () => ({
    LFSRstartValues: "",
    XORpositions: "",
    numberOfBits: "",
    kValue: null,
    dValue: null,
    period: "",
    zeros: 0,
    binary: false,
    ones: 0,
    rules: {
      required: value => !!value || "Required!",
      sizing: () => {
        return true;
      },
      zeroOnes: value =>
        (!!value && !!value.match(new RegExp(/^[0-1]*$/g))) ||
        "Only zero and one numbers are allowed in string!",
      numbers: value =>
        (!!value && !!value.match(new RegExp(/^[1-9][0-9]*$/g))) ||
        "Only decimal numbers allowed!"
    },
    generator: null,
    output: "Your output is empty, because of empty fields above!"
  }),

  methods: {
    setLFSRstartValues() {
      this.rules.sizing = value => {
        return (
          (!!value && value.length == this.LFSRstartValues.length) ||
          "XOR list must be the same length as LSFR register"
        );
      };
    },
    setXORpositions() {},
    calcPeriod() {
      if (parseInt(this.dValue) > 0 && parseInt(this.kValue) > 0) {
        this.period = Math.floor(
          (parseInt(this.kValue) + parseInt(this.dValue)) / 3
        );
        this.runGenerator();
      }
    },
    runGenerator() {
      if (!!this.numberOfBits && this.rules.numbers(this.numberOfBits)) {
        this.generator = this.initGenerator();
        let i = parseInt(this.numberOfBits);
        this.output = "";

        this.zeros = 0;
        this.ones = 0;
        const d = this.dValue;
        const k = this.kValue;
        let start = this.generator.next().value;
        console.log("start: ", start);

        while (i > 0) {
          let out = null;
          if (start == 1) {
            for (let g = k; g > 0; g--) {
              out = this.generator.next().value;
            }
          } else {
            for (let g = d; g > 0; g--) {
              out = this.generator.next().value;
            }
          }
          this.output += out;
          start = out;
          out == 1 ? this.ones++ : this.zeros++;
          console.log("get: ", out);
          i--;
        }
      }
    },
    //Only LFSR Register Generator
    *initGenerator() {
      const getOnesPositions = arr =>
        arr
          .split("")
          .map((element, pos) => {
            if (element == "1") return pos;
          })
          .filter(pos => pos != undefined);

      let LFSR = this.LFSRstartValues.split("").map(element =>
        parseInt(element)
      );
      let XORs = getOnesPositions(this.XORpositions);

      console.log("LFSR: ", LFSR);
      console.log("XORpos: ", XORs);

      while (true) {
        let XorSum = 0;

        XORs.forEach(xor => {
          XorSum += LFSR[xor];
        });

        LFSR.pop();
        LFSR.unshift(XorSum % 2);
        console.log(LFSR);

        yield XorSum % 2;
      }
    },
    saveOutput() {
      var FileSaver = require("file-saver");
      var blob = null;

      if (this.binary) {
        let char = null;
        var binaryOut = "";

        for (let i = 0; i < this.output.length; i += 8) {
          if (i + 8 > this.output.length)
            char = this.output.slice(i, this.output.length - 1);
          else char = this.output.slice(i, i + 8);

          binaryOut += String.fromCharCode(parseInt(char, 2));
          //console.log(char);
        }
        console.log(binaryOut);
        blob = new Blob([binaryOut], {
          type: "text/plain;charset=utf-8"
        });
      } else {
        blob = new Blob([this.output], {
          type: "text/plain;charset=utf-8"
        });
      }

      FileSaver.saveAs(blob, "output.txt");
    }
  }
};
</script>
