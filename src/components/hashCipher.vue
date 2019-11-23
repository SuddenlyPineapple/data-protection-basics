<template>
  <v-col cols="12">
    <h2>Encrypt/decrypt using generated hash</h2>

    <v-textarea
      color="deep-purple"
      clearable
      clear-icon="mdi-close-circle"
      label="Text to encrypt/decrypt"
      rows="2"
      prepend-icon="mdi-pen"
      v-model="textToEncrypt"
      v-on:keyup="encrypt()"
      @click:clear="clear()"
      :rules="[rules]"
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
      label="Encrypt/decrypt output"
      prepend-icon="mdi-eye"
      placeholder="Encrypted/decrypted text (readonly)..."
      v-model="encryptedText"
    ></v-textarea>
  </v-col>
</template>

<script>
export default {
  name: "hashCipher",
  props: ["rules", "hash"],
  data: () => ({
    //Logs
    logs: false,

    //Encryption Variables
    fileToEncrypt: null,
    textToEncrypt: "",
    encryptedText: ""
  }),

  methods: {
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

      if (this.hash !== "") {
        let hashCounter = 0;

        for (let i = 0; i < this.textToEncrypt.length; i++) {
          const charBits = this.textToEncrypt[i].charCodeAt(0).toString(2);

          const hashSlice = this.hash.slice(hashCounter, hashCounter + 8);
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

    clear() {
      this.textToEncrypt = "";
      this.encryptedText = "";
    }
  }
};
</script>
