<template>
  <v-col cols="12">
    <h1>Decryption</h1>
    <v-textarea
      color="deep-purple"
      clearable
      clear-icon="mdi-close-circle"
      label="Text to decrypt"
      rows="1"
      v-model="textToDecrypt"
      v-on:keyup="decrypt()"
      @click:clear="clear()"
    ></v-textarea>
    <p>{{ decryptedText }}</p>
  </v-col>
</template>

<script>
export default {
  name: "Decryption",
  props: ["decryptionKey"],
  data: () => ({
    textToDecrypt: "",
    decryptedText: ""
  }),
  methods: {
    decrypt() {
      this.textToDecrypt = this.textToDecrypt.toLowerCase();
      this.decryptionKey = this.decryptionKey
        .toLowerCase()
        .replace(/[^a-z]/g, "");

      if (this.textToDecrypt.length >= 1 && this.decryptionKey.length === 26) {
        this.decryptedText = "";
        var re = /[a-z]/;
        for (let i = 0; i < this.textToDecrypt.length; i++) {
          if (re.test(this.textToDecrypt.charAt(i)))
            this.decryptedText += String.fromCharCode(
              this.decryptionKey.indexOf(this.textToDecrypt.charAt(i)) + 97
            );
          else this.decryptedText += this.textToDecrypt.charAt(i);
        }
      }
    },
    clear() {
      this.textToDecrypt = "";
      this.decryptedText = "";
    }
  }
};
</script>
