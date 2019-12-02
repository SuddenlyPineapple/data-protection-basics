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
        <h2>Rueppel's <em>d</em> value</h2>
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
        <h2>Rueppel's <em>k</em> value</h2>
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
        <h2>Number of generated bits</h2>
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

      <v-col cols="12" sm="12" md="6">
        <h2>Step-by-step process</h2>
        <v-row class="mt-2">
          <v-checkbox
            color="deep-purple"
            v-model="logs"
            label="Step-by-step process (available in browser console, CAN CRUSH YOUR BROWSER!!!)"
            class="mt-1 ml-3"
          />
        </v-row>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <h2>Output</h2>
        <v-textarea
          color="deep-purple"
          readonly
          label="Output"
          prepend-icon="mdi-eye"
          placeholder="Your output is empty, because of empty fields above!"
          v-model="output"
          counter
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
        <h2>
          Zero/One Count:
          <span class="deep-purple--text">{{ zeros + "/" + ones }}</span>
        </h2>
        <!-- <h2>
          Period: <span class="deep-purple--text">{{ period }}</span>
        </h2> -->
      </v-col>

      <HashCipher
        header="Decryption using generated hash"
        v-bind:hash="output"
        v-bind:rules="rules.cipherMax"
      ></HashCipher>

      <v-col cols="12">
        <h2>Schematic</h2>
        <v-img
          :src="require('../assets/schema.png')"
          contain
          height="200"
        ></v-img>
        <p>Period formula: T = Floor(2/3 * T<sub>0</sub>)</p>

        <h2>How to use?</h2>
        <p>
          Enter LFSR starting values (only 0 and 1 are allowed), then set XOR
          logical gates on selected LFSR fields, by typing 0/1 string, which
          must be the same lenght as LFSR register. For ex. if we set FLSR to
          0101 and we want to have XOR on last two register fields, then XOR
          Positions will be 0011. Then input d and k values (see at Schematic to
          understand). Then you only must input number of bits to generate
          (important info: Output will be refreshed when you lose focus on this
          field).
        </p>

        <p>
          To encrypt or decrypt something, first generate long hash using
          Ruppel's generator. Then enter text to decrypt. If you want to pass
          encrypted text to other person for decipher, you can pass also LFSR
          register state, XOR and d,k setup. Then other person can decipher
          message.
        </p>

        <h2>How it works?</h2>
        <p>
          How LFSR Register work:
          <a href="https://www.youtube.com/watch?v=8fhNPXus4-s">link</a><br />
          Everything else is like on schema
        </p>

        <h2>Specification & restrictions:</h2>
        <ul>
          <li>
            for lager amount of bits generation is much longer soo please if you
            don't want to crash your browser generate maximum 10 000 000 bits,
          </li>
          <li>
            you can also optionaly download txt files in binary and 0/1 txt
            format
          </li>
          <li>
            whole application is executing in your browser and hosted from
            GitHub Pages, development happen on node server and with help of
            webpack and npm,
          </li>
          <li>
            when it's comes to how much bits you can generate this is only
            limited by your browser and hardware possibilites, but in case of
            more than 10 000 000 bits aplication performance pike down on almost
            every computer.
          </li>
          <li>
            if you want to see step-by-step process please generate no more than
            10 000 bits. Otherwise your browser will crash.
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import { saveAs } from "file-saver";

export default {
  name: "SelfDecimationGenerator",

  components: {
    HashCipher: () => import("@/components/hashCipher.vue")
  },

  data: () => ({
    //LFSR Generator Variables
    LFSRstartValues: "",
    XORpositions: "",
    numberOfBits: "",
    kValue: null,
    dValue: null,
    period: "",
    zeros: 0,
    binary: false,
    ones: 0,

    //Logs
    logs: false,

    //Encryption Variables
    fileToEncrypt: null,
    textToEncrypt: "",
    encryptedText: "",

    //Decryption Variables
    fileToDecrypt: null,
    decryptedText: "",
    textToDecrypt: "",

    //Validation
    rules: {
      required: value => !!value || "Required!",
      sizing: () => {
        return true;
      },
      cipherMax: () => {
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
    output: ""
  }),

  methods: {
    setLFSRstartValues() {
      this.rules.sizing = value => {
        return (
          (!!value && value.length == this.LFSRstartValues.length) ||
          "XOR list must be the same length as LSFR register"
        );
      };

      this.runGenerator();
    },
    setXORpositions() {
      this.runGenerator();
    },
    calcPeriod() {
      if (parseInt(this.dValue) > 0 && parseInt(this.kValue) > 0) {
        this.period = Math.floor(
          (parseInt(this.kValue) + parseInt(this.dValue)) / 3
        );
        this.runGenerator();
      }
    },
    runGenerator() {
      if (
        !!this.numberOfBits &&
        this.rules.numbers(this.numberOfBits) &&
        this.LFSRstartValues.length == this.XORpositions.length
      ) {
        this.generator = this.initGenerator();
        let i = parseInt(this.numberOfBits);
        this.output = "";

        this.zeros = 0;
        this.ones = 0;
        const d = this.dValue;
        const k = this.kValue;
        let start = this.generator.next().value;
        if (this.logs) console.log("start: ", start);

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

          if (this.logs) console.log("get: ", out);

          i--;
        }

        this.rules.cipherMax = value => {
          return (
            (!!value && value.length < this.output.length / 8) ||
            "Entered text has more bits than generated hash. Generate longer hash!"
          );
        };
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

      if (this.logs) console.log("LFSR: ", LFSR);
      if (this.logs) console.log("XORpos: ", XORs);

      while (true) {
        let XorSum = 0;

        XORs.forEach(xor => {
          XorSum += LFSR[xor];
        });

        LFSR.pop();
        LFSR.unshift(XorSum % 2);
        if (this.logs) console.log(LFSR);

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
        //console.log(binaryOut);
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
