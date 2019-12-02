<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Cipher Tester</h1>
      </v-col>

      <v-col cols="12" sm="12" md="6">
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

        <h2>Enter encrypted text (bits)</h2>
        <v-textarea
          color="deep-purple"
          counter
          clearable
          clear-icon="mdi-close-circle"
          prepend-icon="mdi-pen"
          label="Cipher"
          placeholder="0011001100"
          v-model="cipher"
          v-on:keyup="cipherTest"
          :rules="[rules.required, rules.size]"
        ></v-textarea>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <h2>Tests:</h2>

        <h3>
          Mono Bits Test:
          <span v-if="singleBitsTestRun == true">
            <v-icon class="deep-purple--text">mdi-spin mdi-loading</v-icon>
            In progress
          </span>
          <span
            v-else-if="singleBitsTestRun == false && singleBitsTest == null"
          >
            <v-icon class="grey--text">mdi-file-question</v-icon> Not started
          </span>
          <span v-else-if="singleBitsTest == false">
            <v-icon class="red--text">mdi-close-circle</v-icon>
            Not passed
          </span>
          <span v-else>
            <v-icon class="green--text">mdi-check-circle</v-icon> Passed
          </span>
        </h3>

        <h3>
          Poker Test:
          <span v-if="pokerTestRun == true">
            <v-icon class="deep-purple--text">mdi-spin mdi-loading</v-icon>
            In progress
          </span>
          <span v-else-if="pokerTestRun == false && pokerTest == null">
            <v-icon class="grey--text">mdi-file-question</v-icon> Not started
          </span>
          <span v-else-if="pokerTest == false">
            <v-icon class="red--text">mdi-close-circle</v-icon>
            Not passed
          </span>
          <span v-else>
            <v-icon class="green--text">mdi-check-circle</v-icon> Passed
          </span>
        </h3>

        <h3>
          Series Test:
          <span v-if="seriesTestRun == true">
            <v-icon class="deep-purple--text">mdi-spin mdi-loading</v-icon>
            In progress
          </span>
          <span v-else-if="seriesTestRun == false && seriesTest == null">
            <v-icon class="grey--text">mdi-file-question</v-icon> Not started
          </span>
          <span v-else-if="seriesTest == false">
            <v-icon class="red--text">mdi-close-circle</v-icon>
            Not passed
          </span>
          <span v-else>
            <v-icon class="green--text">mdi-check-circle</v-icon> Passed
          </span>
        </h3>

        <h3>
          Long Series Test:
          <span v-if="longSeriesTestRun == true">
            <v-icon class="deep-purple--text">mdi-spin mdi-loading</v-icon>
            In progress
          </span>
          <span
            v-else-if="longSeriesTestRun == false && longSeriesTest == null"
          >
            <v-icon class="grey--text">mdi-file-question</v-icon> Not started
          </span>
          <span v-else-if="longSeriesTest == false">
            <v-icon class="red--text">mdi-close-circle</v-icon>
            Not passed
          </span>
          <span v-else>
            <v-icon class="green--text">mdi-check-circle</v-icon> Passed
          </span>
        </h3>
      </v-col>

      <v-col cols="12">
        <h2>Test Statuses Legend:</h2>
        <p class="font-weight-bold">
          <v-icon class="red--text">mdi-close-circle</v-icon> Not passed <br />
          <v-icon class="green--text">mdi-check-circle</v-icon> Passed <br />
          <v-icon class="grey--text">mdi-file-question</v-icon> Not started
          <br />
          <v-icon class="deep-purple--text">mdi-spin mdi-loading</v-icon> In
          progress <br />
          <br />
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import { saveAs } from "file-saver";

export default {
  name: "CipherTester",

  components: {},

  data: () => ({
    cipher: null,
    singleBitsTest: null,
    pokerTest: null,
    seriesTest: null,
    longSeriesTest: null,

    singleBitsTestRun: false,
    pokerTestRun: false,
    seriesTestRun: false,
    longSeriesTestRun: false,

    fileToEncrypt: null,

    rules: {
      required: value => !!value || "Required!",
      size: value => {
        if (value)
          return (
            value.length >= 20000 ||
            "Cipher lenght must be at least 20 000 for some tests! More than 20k bits will be sliced to 20k bits!"
          );
        return true;
      }
    }
  }),

  methods: {
    cipherTest() {
      if (this.cipher.length > 20000) this.cipher = this.cipher.slice(0, 20000);

      const singleBitsTest = async () => {
        //console.log("Single Bits Test");
        this.singleBitsTestRun = true;
        let n = 0;
        let k = 0;
        for (let i = 0; i < this.cipher.length; i++) {
          if (this.cipher[i] == "1") n++;
          else k++;
        }

        console.log("Mono Bits Test: ", n);
        if (n > 9654 && n < 10346 && k > 9654 && k < 10346) return true;
        return false;
      };

      const pokerTest = async () => {
        //console.log("Poker Test");
        this.pokerTestRun = true;
        let tmp;
        let occurences = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let p;

        for (let i = 0; i < this.cipher.length; i += 4) {
          let tmp2 = 0;

          tmp = this.cipher.slice(i, i + 4);
          tmp2 = parseInt(tmp.toString(2), 2);

          occurences[tmp2]++;
        }

        //console.log(occurences);

        let sum = 0;
        occurences.forEach(number => {
          sum += number * number;
        });

        p = (16.0 / 5000.0) * sum - 5000;
        console.log("Poker Test", p);

        if (p < 46.17 && p > 2.16) return true;
        return false;
      };

      const seriesTest = async () => {
        //console.log("Series Test");
        this.seriesTestRun = true;

        let tmp = this.cipher[0];
        let series0 = [0, 0, 0, 0, 0, 0];
        let series1 = [0, 0, 0, 0, 0, 0];
        let n = 0;

        for (let i = 0; i < this.cipher.length; i++) {
          if (this.cipher[i] == tmp) n++;
          else {
            if (this.cipher[i] == 0) {
              n > 5 ? (series0[5] += 1) : (series0[n - 1] += 1);
            } else n > 5 ? (series1[5] += 1) : (series1[n - 1] += 1);
            n = 1;
            tmp = this.cipher[i];
          }
        }

        console.log("Runs Test:", series0, series1);

        if (
          series0[0] < 2685 &&
          series0[0] > 2315 &&
          (series0[1] < 1386 && series0[1] > 1114) &&
          (series0[2] < 723 && series0[2] > 527) &&
          (series0[3] < 384 && series0[3] > 240) &&
          (series0[4] < 209 && series0[4] > 103) &&
          (series0[5] < 209 && series0[5] > 103) &&
          series1[0] < 2685 &&
          series1[0] > 2315 &&
          (series1[1] < 1386 && series1[1] > 1114) &&
          (series1[2] < 723 && series1[2] > 527) &&
          (series1[3] < 384 && series1[3] > 240) &&
          (series1[4] < 209 && series1[4] > 103) &&
          (series1[5] < 209 && series1[5] > 103)
        ) {
          return true;
        }
        return false;
      };

      const longSeriesTest = async () => {
        //console.log("Long Series Test");
        this.longSeriesTestRun = true;
        let m = 0;
        let n = 0;

        for (let i = 0; i < this.cipher.length; i++) {
          if (m >= 36 || n >= 36) {
            console.log("Long Runs Test:", m, n);
            return false;
          } else if (this.cipher[i] == "1") {
            m = 0;
            n++;
          } else if (this.cipher[i] == "0") {
            n = 0;
            m++;
          }
        }
        console.log("Long Runs Test:", m, n);
        return true;
      };

      this.singleBitsTest = null;
      this.pokerTest = null;
      this.seriesTest = null;
      this.longSeriesTest = null;
      this.run = true;

      singleBitsTest()
        .then(result => {
          this.singleBitsTest = result;
          this.singleBitsTestRun = false;
        })
        .catch(err => {
          console.log("Error: ", err);
        });

      pokerTest()
        .then(result => {
          this.pokerTest = result;
          this.pokerTestRun = false;
        })
        .catch(err => {
          console.log("Error: ", err);
        });

      seriesTest()
        .then(result => {
          this.seriesTest = result;
          this.seriesTestRun = false;
        })
        .catch(err => {
          console.log("Error: ", err);
        });

      longSeriesTest()
        .then(result => {
          this.longSeriesTest = result;
          this.longSeriesTestRun = false;
        })
        .catch(err => {
          console.log("Error: ", err);
        });
    },
    loadTextFromFile() {
      if (this.fileToEncrypt) {
        const file = this.fileToEncrypt;
        const reader = new FileReader();

        //reader.onload = e => this.$emit("load", e.target.result);
        reader.onload = e => {
          this.cipher = e.target.result;
          this.cipherTest();
        };
        reader.readAsText(file);
      }
    }
  }
};
</script>
