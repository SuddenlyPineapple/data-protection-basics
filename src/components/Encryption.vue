<template>
  <v-col cols="12">
    <h1>Encryption</h1>
    <v-textarea
      color="deep-purple"
      clearable
      clear-icon="mdi-close-circle"
      label="Text to encrypt"
      rows="1"
      v-model="textToEncrypt"
      v-on:keyup="encrypt()"
      @click:clear="clear()"
    ></v-textarea>
    <p>{{ encryptedText }}</p>
  </v-col>
</template>

<script>
export default {
  name: "Encryption",
  props: ["encryptionKey"],
  data: () => ({
    textToEncrypt: "",
    encryptedText: ""
  }),
  watch: {
    $props: {
      handler() {
        this.encrypt();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    encrypt() {
      this.encryptedText = "";

      if (this.textToEncrypt) {
        this.textToEncrypt = this.textToEncrypt.toLowerCase();
        this.encryptionKey = this.encryptionKey //TODO: Fix encryption key uncontroled mutation
          .toLowerCase()
          .replace(/[^a-z]/g, "");

        if (
          this.textToEncrypt.length >= 1 &&
          this.encryptionKey.length === 26
        ) {
          let re = /[a-z]/;
          for (let i = 0; i < this.textToEncrypt.length; i++) {
            if (re.test(this.textToEncrypt.charAt(i)))
              this.encryptedText += this.encryptionKey.charAt(
                this.textToEncrypt.charCodeAt(i) - 97
              );
            else this.encryptedText += this.textToEncrypt.charAt(i);
          }
        }
      }
    },
    clear() {
      this.textToEncrypt = "";
      this.encryptedText = "";
    }
  }
};
</script>
