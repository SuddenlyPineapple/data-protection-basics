<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Steganography</h1>
      </v-col>
      <ImageEncryption />
      <ImageDecryption />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Steganography",
  components: {
    ImageEncryption: () => import("@/components/ImageEncryption.vue"),
    ImageDecryption: () => import("@/components/ImageDecryption.vue")
  },
  data: () => ({}),
  methods: {}
};
</script>
