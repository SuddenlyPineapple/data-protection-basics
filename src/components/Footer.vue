<template>
  <v-footer dark>
    <v-card flat tile class="grey darken-4 white--text text-center">
      <v-card-text>
        <v-btn
          v-for="link in socialMedia"
          :key="link.icon"
          class="mx-4 white--text"
          icon
          :href="link.link"
        >
          <v-icon size="24px">{{ link.icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-row>
        <v-col cols="12" md="9" class="px-5">
          <v-card-text class="white--text pt-0 text-left">
            Projekt na zajęcia z Podstaw Ochrony Danych na Politechnice
            Poznańskiej. Materiał obejmuje w głównej mierze zagadnienia z
            dziedziny jaką jest kryptografia i kryptoanaliza.
          </v-card-text>
        </v-col>
        <v-col cols="12" md="3" class="max-height pt-0">
          <v-img
            :src="ppLogo"
            alt="Politechnika Poznańska Logo"
            height="80"
            contain
          />
        </v-col>
      </v-row>

      <v-divider />

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>&copy;Wojciech Kasperski </strong
        ><a
          href="mailto:wojciech.kasperski97@gmail.com"
          class="font-weight-light white--text"
          >&lt;wojciech.kasperski97@gmail.com&gt;</a
        >
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    socialMedia: [
      {
        icon: "mdi-github-circle",
        link: "https://github.com/SuddenlyPineapple"
      },
      {
        icon: "mdi-facebook",
        link: "https://www.facebook.com/wojciech.kasperski.900"
      },
      {
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/in/wojciech-kasperski-83782b111"
      }
    ],
    ppLogo: require("../assets/PolitechnikaPoznanska.png")
  })
};
</script>
