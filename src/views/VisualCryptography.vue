<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Visual Cryptography</h1>
      </v-col>
      <v-col cols="12">
        <vue-p5
          @setup="setup"
          @draw="draw"
          @mouseclicked="mouseClicked"
        ></vue-p5>
        <v-btn color="purple" class="white--text" @click="cipher">Cipher</v-btn>
        <v-btn color="purple" class="white--text ml-3" @click="overlay"
          >Overlay</v-btn
        >
        <v-btn
          color="purple"
          class="white--text ml-3"
          @click="
            () => {
              cleanShares();
              cleanInorout();
            }
          "
        >
          Clear
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueP5 from "vue-p5";

export default {
  name: "VisualCryptography",
  data: () => ({
    inorout: null,
    share1: null,
    share2: null,
    animValue: 0,
    c: 20,
    r: 20,
    size: 10,
    canva: null,
    address: window.location.href,
    cols: 20,
    rows: 20
  }),
  components: {
    VueP5
  },
  methods: {
    setup(sketch) {
      if (this.address.search("c=") != -1) {
        this.c = 0;
        let begin = this.address.search("c=") + 2;
        let end = this.address.search("&");
        let factor = 1;

        for (let i = end - 1; i >= begin; i--) {
          this.c += this.address[i] * factor;
          factor *= 10;
        }
      }

      if (this.address.search("&r=") != -1) {
        this.r = 0;
        let begin = this.address.search("r=") + 2;
        let end = this.address.length;
        let factor = 1;

        for (let i = end - 1; i >= begin; i--) {
          this.r += this.address[i] * factor;
          factor *= 10;
        }
      }

      //create background cavna
      this.canva = sketch.createCanvas(
        3 * this.c * this.size + 2 * this.size,
        this.r * this.size
      );

      //tables creation
      this.inorout = [...Array(this.c).keys()].map(() => Array(this.r));

      this.share1 = [...Array(2 * this.c).keys()].map(() => Array(2 * this.r));
      this.share2 = [...Array(2 * this.c).keys()].map(() => Array(2 * this.r));

      this.cleanInorout();
      this.cleanShares();
    },
    draw(sketch) {
      sketch.background(255);
      sketch.stroke(0);

      //drawing input/output
      for (let i = 0; i < this.c; i++) {
        for (let j = 0; j < this.r; j++) {
          //inorout
          let x = i * this.size;
          let y = j * this.size;

          if (this.inorout[i][j] == 1) {
            sketch.fill(0);
          } else {
            sketch.fill(255);
          }
          sketch.rect(x, y, this.size - 1, this.size - 1);
        }
      }

      //drawing shares
      for (let i = 0; i < this.c * 2; i++) {
        for (let j = 0; j < this.r * 2; j++) {
          //share1
          let x = i * (this.size / 2);
          let y = j * (this.size / 2);
          x += this.size * this.c + this.size;

          if (this.share1[i][j] == 1) {
            sketch.fill(0);
          } else {
            sketch.noFill();
          }
          sketch.rect(x, y, this.size / 2 - 1, this.size / 2 - 1);
        }
      }

      for (let i = 0; i < this.c * 2; i++) {
        for (let j = 0; j < this.r * 2; j++) {
          //share2
          let x = i * (this.size / 2);
          let y = j * (this.size / 2);
          x += 2 * this.size * this.c + 2 * this.size - this.animValue;

          if (this.share2[i][j] == 1) {
            sketch.fill(0);
          } else {
            sketch.noFill();
          }
          sketch.rect(x, y, this.size / 2 - 1, this.size / 2 - 1);
        }
      }
    },
    mouseClicked(sketch) {
      let xMatrixPos = Math.floor(sketch.mouseX / this.size);
      let yMatrixPos = Math.floor(sketch.mouseY / this.size);

      //marking pixels
      if (xMatrixPos < this.c && xMatrixPos >= 0) {
        if (yMatrixPos < this.r && yMatrixPos >= 0) {
          if (this.inorout[xMatrixPos][yMatrixPos] == 0) {
            this.inorout[xMatrixPos][yMatrixPos] = 1;
          } else {
            this.inorout[xMatrixPos][yMatrixPos] = 0;
          }
        }
      }
    },
    cleanShares() {
      //writing 'empty' values onto shares
      for (let i = 0; i < this.c * 2; i++) {
        for (let j = 0; j < this.r * 2; j++) {
          this.share1[i][j] = 0;
          this.share2[i][j] = 0;
        }
      }
    },
    cleanInorout() {
      //writing 'empty' values onto input/output
      for (let i = 0; i < this.c; i++) {
        for (let j = 0; j < this.r; j++) {
          this.inorout[i][j] = 0;
        }
      }
    },
    setColsRows() {
      let cIndex = this.address.search("c=");

      if (cIndex != -1) {
        window.location.href =
          this.address.slice(0, cIndex - 1) +
          "?c=" +
          this.cols +
          "&r=" +
          this.rows;
      } else {
        window.location.href =
          this.address + "?c=" + this.cols + "&r=" + this.rows;
      }
    },
    cipher() {
      this.cleanShares();

      // [x*2][y*2] //uleft
      // [x*2+1][y*2] //uright
      // [x*2][y*2+1] //bleft
      // [x*2+1][y*2+1] //bright

      //checking values of input/output and ciphering onto shares
      for (let i = 0; i < this.c; i++) {
        for (let j = 0; j < this.r; j++) {
          //black pixel
          if (this.inorout[i][j] == 1) {
            switch (Math.floor(Math.random() * 6)) {
              //lines
              //11
              //22
              case 0:
                this.share1[i * 2][j * 2] = this.share1[i * 2 + 1][j * 2] = 1;
                this.share2[i * 2][j * 2 + 1] = this.share2[i * 2 + 1][
                  j * 2 + 1
                ] = 1;
                break;

              //22
              //11
              case 1:
                this.share1[i * 2][j * 2 + 1] = this.share1[i * 2 + 1][
                  j * 2 + 1
                ] = 1;
                this.share2[i * 2][j * 2] = this.share2[i * 2 + 1][j * 2] = 1;
                break;

              //12
              //12
              case 2:
                this.share1[i * 2][j * 2] = this.share1[i * 2][j * 2 + 1] = 1;
                this.share2[i * 2 + 1][j * 2] = this.share2[i * 2 + 1][
                  j * 2 + 1
                ] = 1;
                break;

              //21
              //21
              case 3:
                this.share1[i * 2 + 1][j * 2] = this.share1[i * 2 + 1][
                  j * 2 + 1
                ] = 1;
                this.share2[i * 2][j * 2] = this.share2[i * 2][j * 2 + 1] = 1;
                break;

              //crosses
              //12
              //21
              case 4:
                this.share1[i * 2][j * 2] = this.share1[i * 2 + 1][
                  j * 2 + 1
                ] = 1;
                this.share2[i * 2 + 1][j * 2] = this.share2[i * 2][
                  j * 2 + 1
                ] = 1;
                break;

              //21
              //12
              case 5:
                this.share1[i * 2 + 1][j * 2] = this.share1[i * 2][
                  j * 2 + 1
                ] = 1;
                this.share2[i * 2][j * 2] = this.share2[i * 2 + 1][
                  j * 2 + 1
                ] = 1;
                break;
            }
          }

          //white pixel
          else {
            switch (Math.floor(Math.random() * 10)) {
              //every 2 px
              //lines
              //OO
              //xx
              case 0:
                this.share1[i * 2][j * 2] = this.share1[i * 2 + 1][
                  j * 2
                ] = this.share2[i * 2][j * 2] = this.share2[i * 2 + 1][
                  j * 2
                ] = 1;
                break;

              //xx
              //OO
              case 1:
                this.share1[i * 2][j * 2 + 1] = this.share1[i * 2 + 1][
                  j * 2 + 1
                ] = this.share2[i * 2][j * 2 + 1] = this.share2[i * 2 + 1][
                  j * 2 + 1
                ] = 1;
                break;

              //Ox
              //Ox
              case 2:
                this.share1[i * 2][j * 2] = this.share1[i * 2][
                  j * 2 + 1
                ] = this.share2[i * 2][j * 2] = this.share2[i * 2][
                  j * 2 + 1
                ] = 1;
                break;

              //xO
              //xO
              case 3:
                this.share1[i * 2 + 1][j * 2] = this.share1[i * 2 + 1][
                  j * 2 + 1
                ] = this.share2[i * 2 + 1][j * 2] = this.share2[i * 2 + 1][
                  j * 2 + 1
                ] = 1;
                break;

              //crosses
              //Ox
              //xO
              case 4:
                this.share1[i * 2][j * 2] = this.share1[i * 2 + 1][
                  j * 2 + 1
                ] = this.share2[i * 2][j * 2] = this.share2[i * 2 + 1][
                  j * 2 + 1
                ] = 1;
                break;

              //xO
              //Ox
              case 5:
                this.share1[i * 2 + 1][j * 2] = this.share1[i * 2][
                  j * 2 + 1
                ] = this.share2[i * 2 + 1][j * 2] = this.share2[i * 2][
                  j * 2 + 1
                ] = 1;
                break;

              //every 1 px
              //lines
              //12 21
              //xx xx
              case 6:
                if (Math.floor(Math.random() * 2)) {
                  this.share1[i * 2][j * 2] = this.share2[i * 2 + 1][j * 2] = 1;
                } else {
                  this.share2[i * 2][j * 2] = this.share1[i * 2 + 1][j * 2] = 1;
                }
                break;

              //xx xx
              //12 21
              case 7:
                if (Math.floor(Math.random() * 2)) {
                  this.share1[i * 2][j * 2 + 1] = this.share2[i * 2 + 1][
                    j * 2 + 1
                  ] = 1;
                } else {
                  this.share2[i * 2][j * 2 + 1] = this.share1[i * 2 + 1][
                    j * 2 + 1
                  ] = 1;
                }
                break;

              //1x 2x
              //2x 1x
              case 8:
                if (Math.floor(Math.random() * 2)) {
                  this.share1[i * 2][j * 2] = this.share2[i * 2][j * 2 + 1] = 1;
                } else {
                  this.share2[i * 2][j * 2] = this.share1[i * 2][j * 2 + 1] = 1;
                }
                break;

              //x1 x2
              //x2 x1
              case 9:
                if (Math.floor(Math.random() * 2)) {
                  this.share1[i * 2 + 1][j * 2] = this.share2[i * 2 + 1][
                    j * 2 + 1
                  ] = 1;
                } else {
                  this.share2[i * 2 + 1][j * 2] = this.share1[i * 2 + 1][
                    j * 2 + 1
                  ] = 1;
                }
                break;
            }
          }
        }
      }

      this.animValue = 0;
    },
    overlay() {
      this.animValue = this.c * this.size + this.size;
    }
  },
  mounted() {
    this.setColsRows();
  }
};
</script>
