<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Visual Cryptography</h1>
      </v-col>
      <VisualEncryptTwoOne />
      <VisualEncryptTwoTwo />
      <v-col cols="12">
        <h2>How to use?</h2>
        <p>
          Just click on left side of picture and make some image, then cipher
          it. You can also save image and overlay cipher pictures. By using
          <code>?c=40&r=40</code> in application URL you can specify numer of
          columns and rows.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "VisualCryptography",
  data: () => ({}),
  components: {
    VisualEncryptTwoOne: () => import("@/components/VisualEncryptTwoOne.vue"),
    VisualEncryptTwoTwo: () => import("@/components/VisualEncryptTwoTwo.vue")
  }
};
</script>
