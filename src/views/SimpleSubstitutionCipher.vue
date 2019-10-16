<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Encryption Key</h1>
        <v-text-field
          color="deep-purple"
          clearable
          clear-icon="mdi-close-circle"
          counter="26"
          label="Encryption key"
          v-model="encryptionKey"
          v-on:keyup="genKey"
        ></v-text-field>
        <v-btn
          color="purple"
          class="white--text mr-5"
          v-on:click="generateRandomKey"
        >
          GENERATE KEY
        </v-btn>
        <v-btn
          color="purple"
          class="white--text"
          v-on:click="fillKey"
          v-bind:disabled="fillDisabled"
        >
          FILL KEY
        </v-btn>
      </v-col>
      <Encryption v-bind:encryptionKey="passedKey" />
      <Decryption v-bind:decryptionKey="passedKey" />
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1>How to use?</h1>
        <p>
          Simply generate key or type one of your own. Key is binded to
          textareas, so when you want to encrypt or decrypt message it will use
          the same decryption key. Then start encrypting or decrypting your
          messages just typing then in text areas.
        </p>
      </v-col>
    </v-row>
    <code class="pa-2">
      <pre>
    Szyfr Podstawieniowy Prosty - z wybranym kluczem (najpierw dodawany jest klucz potem alfabet)
    3.5 - str.75 w skrypcie z numerkiem (gdzieś będzie skan):
        1) Szyfrator
        2) Deszyfrator
        3) Zabezpiecznie wejścia
    opis algorytmu w README - na stronie
      </pre>
    </code>
  </v-container>
</template>

<script>
export default {
  name: "SzyfrPodstawieniowyProsty",
  components: {
    Encryption: () => import("@/components/Encryption.vue"),
    Decryption: () => import("@/components/Decryption.vue")
  },
  data: () => ({
    encryptionKey: "",
    passedKey: "",
    chars: "",
    fillDisabled: false
  }),
  methods: {
    generateRandomKey() {
      var keychars = "abcdefghijklmnopqrstuvwxyz";
      var chars = keychars.split("");
      this.encryptionKey = "";
      let lim = chars.length;
      for (let i = 0; i < lim; i++) {
        let index = Math.floor(chars.length * Math.random());
        this.encryptionKey += chars[index];
        chars.splice(index, 1);
      }
      this.passedKey = this.encryptionKey;
      this.fillDisabled = true;
    },
    genKey() {
      var keychars = "abcdefghijklmnopqrstuvwxyz";
      var chars = keychars.split("");

      console.log(this.encryptionKey.length);

      const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
      };

      var tmpKey = this.encryptionKey.split("").filter(distinct);

      for (let i = 0; i < this.encryptionKey.length; i++) {
        for (let g = 0; g < chars.length; g++) {
          if (this.encryptionKey[i] == chars[g]) {
            chars.splice(g, 1);
          }
        }
      }
      console.log(chars.join(""));
      console.log("Passed key: ", tmpKey.join("") + chars.join(""));

      this.passedKey = tmpKey.join("") + chars.join("");
      this.chars = chars.join("");
      this.fillDisabled = false;
    },
    fillKey() {
      this.encryptionKey += this.chars;
      this.fillDisabled = true;
    }
  }
};
</script>
