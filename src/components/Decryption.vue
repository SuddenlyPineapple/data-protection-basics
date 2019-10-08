<template>
  <v-col cols="12">
    <h1>Decryption</h1>
    <v-text-field
      color="deep-purple"
      clearable
      clear-icon="mdi-close-circle"
      counter="24"
      label="Decryption key"
      v-model="encryptionKey"
    ></v-text-field>
    <v-textarea
      color="deep-purple"
      clearable
      clear-icon="mdi-close-circle"
      label="Text to decrypt"
      v-model="textToEncrypt"
    ></v-textarea>
  </v-col>
</template>

<script>
export default {
  name: "Decryption",
  data: () => ({
    encryptionKey: null,
    textToEncrypt: null
  })
};
</script>
