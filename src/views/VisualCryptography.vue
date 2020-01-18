<template>
  <v-container>
    <VisualEncryptTwoOne />
    <VisualEncryptTwoTwo />
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
