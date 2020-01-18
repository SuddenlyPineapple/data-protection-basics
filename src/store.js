import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    routes: [
      {
        text: "Home",
        to: "/"
      },
      {
        text: "Simple Substitution Cipher",
        to: "/simple_substitution_cipher"
      },
      {
        text: "Self Decimation Generator",
        to: "/self_decimation_generator"
      },
      {
        text: "Cipher Tester",
        to: "cipher_tester"
      },
      {
        text: "Steganography",
        to: "/steganography"
      },
      {
        text: "Visual Cryptography",
        to: "/visualcryptography"
      },
      {
        text: "About",
        to: "/about"
      }
    ]
  },
  getters: {
    routes: state => {
      return state.routes;
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {}
});
