<template>
  <v-col cols="12">
    <h1>Encryption</h1>
    <v-text-field
      color="deep-purple"
      clearable
      clear-icon="mdi-close-circle"
      counter="24"
      label="Encryption key"
      v-model="encryptionKey"
    ></v-text-field>
    <v-textarea
      color="deep-purple"
      clearable
      clear-icon="mdi-close-circle"
      label="Text to encrypt"
      v-model="textToEncrypt"
    ></v-textarea>
  </v-col>
</template>

<script>
export default {
  name: "Encryption",
  data: () => ({
    encryptionKey: null,
    textToEncrypt: null
  })
};
</script>
