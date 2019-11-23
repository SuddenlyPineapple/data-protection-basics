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

      <v-col cols="12">
        <h2>Encryption using generated hash</h2>

        <v-textarea
          color="deep-purple"
          clearable
          clear-icon="mdi-close-circle"
          label="Text to encrypt"
          rows="2"
          prepend-icon="mdi-pen"
          v-model="textToEncrypt"
          v-on:keyup="encrypt()"
          @click:clear="clear()"
        ></v-textarea>

        <template>
          <v-file-input
            v-model="fileToEncrypt"
            placeholder="Upload your txt file"
            label="File input (Optional)"
            accept=".txt"
            prepend-icon="mdi-paperclip"
            show-size
            @change="loadTextFromFile"
          >
            <template v-slot:selection="{ text }">
              <v-chip small label color="purple">
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
        </template>

        <v-textarea
          color="deep-purple"
          readonly
          label="Encrypt output"
          prepend-icon="mdi-eye"
          placeholder="Encrypted text (readonly)..."
          v-model="encryptedText"
        ></v-textarea>
      </v-col>

      <v-col cols="12">
        <h2>Decryption using generated hash</h2>

        <v-textarea
          color="deep-purple"
          clearable
          clear-icon="mdi-close-circle"
          label="Text to decrypt"
          rows="2"
          prepend-icon="mdi-pen"
          v-model="textToDecrypt"
          v-on:keyup="decrypt()"
          @click:clear="clearDecryption()"
        ></v-textarea>

        <template>
          <v-file-input
            v-model="fileToDecrypt"
            placeholder="Upload your txt file"
            label="File input (Optional)"
            accept=".txt"
            prepend-icon="mdi-paperclip"
            show-size
            @change="loadTextFromFile"
          >
            <template v-slot:selection="{ text }">
              <v-chip small label color="purple">
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
        </template>

        <v-textarea
          color="deep-purple"
          readonly
          label="Decrypt output"
          prepend-icon="mdi-eye"
          placeholder="Decrypted text (readonly)..."
          v-model="decryptedText"
        ></v-textarea>
      </v-col>

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
            don't want to crash your browser generate maximum 10 000 bits,
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
            more than 10 000 bits aplication performance pike down on almost
            every computer.
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
    },
    loadTextFromFile() {
      const file = this.fileToEncrypt;
      const reader = new FileReader();

      //reader.onload = e => this.$emit("load", e.target.result);
      reader.onload = e => {
        this.textToEncrypt = e.target.result;
        this.encrypt();
      };
      reader.readAsText(file);
    },
    encrypt() {
      this.encryptedText = "";

      if (this.output !== "") {
        let hashCounter = 0;

        for (let i = 0; i < this.textToEncrypt.length; i++) {
          const charBits = this.textToEncrypt[i].charCodeAt(0).toString(2);

          const hashSlice = this.output.slice(hashCounter, hashCounter + 8);
          hashCounter += 8;

          // For Debugging Purpose
          // console.log(
          //   charBits,
          //   hashSlice,
          //   (parseInt(charBits, 2) ^ parseInt(hashSlice, 2)).toString(2),
          //   parseInt(charBits, 2) ^ parseInt(hashSlice, 2),
          //   String.fromCharCode(parseInt(charBits, 2) ^ parseInt(hashSlice, 2))
          // );

          this.encryptedText += String.fromCharCode(
            parseInt(charBits, 2) ^ parseInt(hashSlice, 2)
          );
        }
      }
    },
    decrypt() {
      this.decryptedText = "";

      if (this.output !== "") {
        let hashCounter = 0;

        for (let i = 0; i < this.textToDecrypt.length; i++) {
          const charBits = this.textToDecrypt[i].charCodeAt(0).toString(2);

          const hashSlice = this.output.slice(hashCounter, hashCounter + 8);
          hashCounter += 8;

          // For Debugging Purpose
          // console.log(
          //   charBits,
          //   hashSlice,
          //   (parseInt(charBits, 2) ^ parseInt(hashSlice, 2)).toString(2),
          //   parseInt(charBits, 2) ^ parseInt(hashSlice, 2),
          //   String.fromCharCode(parseInt(charBits, 2) ^ parseInt(hashSlice, 2))
          // );

          this.decryptedText += String.fromCharCode(
            parseInt(charBits, 2) ^ parseInt(hashSlice, 2)
          );
        }
      }
    },
    clear() {
      this.textToEncrypt = "";
      this.encryptedText = "";
    },
    clearDecryption() {
      this.textToDecrypt = "";
      this.decryptedText = "";
    }
  }
};
</script>
