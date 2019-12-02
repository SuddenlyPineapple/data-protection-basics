<template>
  <v-col cols="12">
    <h2>Decryption</h2>
    <v-textarea
      color="deep-purple"
      clearable
      counter
      clear-icon="mdi-close-circle"
      label="Text to decrypt"
      rows="2"
      prepend-icon="mdi-pen"
      v-model="textToDecrypt"
      v-on:keyup="decrypt()"
      @click:clear="clear()"
    ></v-textarea>
    <template>
      <v-file-input
        v-model="file"
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
    <p>{{ decryptedText }}</p>
  </v-col>
</template>

<script>
export default {
  name: "Decryption",
  props: ["decryptionKey", "baseAlphabet"],
  data: () => ({
    textToDecrypt: "",
    decryptedText: "",
    file: null
  }),
  watch: {
    $props: {
      handler() {
        this.decrypt();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    decrypt() {
      this.textToDecrypt = this.textToDecrypt.toLowerCase();

      if (this.baseAlphabet == "abcdefghijklmnopqrstuvwxyz") {
        this.decryptionKey = this.decryptionKey
          .toLowerCase()
          .replace(/[^a-z]/g, "");

        if (
          this.textToDecrypt.length >= 1 &&
          this.decryptionKey.length === 26
        ) {
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
      } else {
        this.decryptedText = "";
        let re = new RegExp("[" + this.baseAlphabet + "]");
        for (let i = 0; i < this.textToDecrypt.length; i++) {
          if (re.test(this.textToDecrypt.charAt(i)))
            this.decryptedText += this.baseAlphabet.charAt(
              this.decryptionKey.indexOf(this.textToDecrypt.charAt(i))
            );
          else this.decryptedText += this.textToDecrypt.charAt(i);
        }
      }
    },
    clear() {
      this.textToDecrypt = "";
      this.decryptedText = "";
    },
    loadTextFromFile() {
      const file = this.file;
      const reader = new FileReader();

      //reader.onload = e => this.$emit("load", e.target.result);
      reader.onload = e => {
        this.textToDecrypt = e.target.result;
        this.decrypt();
      };
      reader.readAsText(file);
    }
  }
};
</script>
