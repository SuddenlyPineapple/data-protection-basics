<template>
  <v-col cols="12">
    <h1>Encryption</h1>
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
    <p>{{ encryptedText }}</p>
  </v-col>
</template>

<script>
export default {
  name: "Encryption",
  props: ["encryptionKey"],
  data: () => ({
    textToEncrypt: "",
    encryptedText: "",
    file: null
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
    },
    loadTextFromFile() {
      const file = this.file;
      const reader = new FileReader();

      //reader.onload = e => this.$emit("load", e.target.result);
      reader.onload = e => {
        this.textToEncrypt = e.target.result;
        this.encrypt();
      };
      reader.readAsText(file);
    }
  }
};
</script>
