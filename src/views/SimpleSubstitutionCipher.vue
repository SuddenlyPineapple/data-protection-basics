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
        ></v-text-field>
        <v-btn color="purple" class="white--text" v-on:click="GenRandKey"
          >GENERATE KEY</v-btn
        >
      </v-col>
      <Encryption v-bind:encryptionKey="encryptionKey" />
      <Decryption v-bind:decryptionKey="encryptionKey" />
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
    encryptionKey: ""
  }),
  methods: {
    GenRandKey() {
      var keychars = "abcdefghijklmnopqrstuvwxyz";
      var chars = keychars.split("");
      this.encryptionKey = "";
      let lim = chars.length;
      for (let i = 0; i < lim; i++) {
        let index = Math.floor(chars.length * Math.random());
        this.encryptionKey += chars[index];
        chars.splice(index, 1);
      }
    }
  }
};
</script>
