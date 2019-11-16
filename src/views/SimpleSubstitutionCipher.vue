<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Simple Substitution Cipher</h1>
      </v-col>
      <v-col cols="12">
        <h2>Encryption Key</h2>
        <v-text-field
          color="deep-purple"
          clearable
          clear-icon="mdi-close-circle"
          prepend-icon="mdi-pen"
          label="Base alphabet (Optional field - you can enter here other charsets)"
          placeholder="abcdefghijklmnopqrstuvwxyz"
          v-model="baseAlphabet"
          v-on:change="setAlphabetRules"
        ></v-text-field>
        <v-text-field
          color="deep-purple"
          clearable
          clear-icon="mdi-close-circle"
          prepend-icon="mdi-pen"
          label="Encryption key (Based on above alphabet)"
          :rules="[rules.required, rules.alphabet]"
          v-model="encryptionKey"
          v-on:keyup="genKey"
        ></v-text-field>
        <v-btn
          color="purple"
          class="white--text mr-5"
          v-on:click="generateRandomKey"
        >
          GENERATE KEY
        </v-btn>
        <v-btn
          color="purple"
          class="white--text"
          v-on:click="fillKey"
          v-bind:disabled="fillDisabled"
        >
          FILL KEY
        </v-btn>
      </v-col>
      <Encryption
        v-bind:encryptionKey="passedKey"
        :baseAlphabet="baseAlphabet"
      />
      <Decryption
        v-bind:decryptionKey="passedKey"
        :baseAlphabet="baseAlphabet"
      />
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2>How to use?</h2>
        <p>
          Simply generate key or type one of your own. Key is binded to
          textareas, so when you want to encrypt or decrypt message it will use
          the same decryption key. Then start encrypting or decrypting your
          messages just typing then in text areas.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2>How algorithm works?</h2>
        <p>
          The whole algorithm consists of changing the alphabet and is very
          simple. Let's assume we want to encrypt our message with key
          <code>tost</code><br />
          Soo our encrption alphabet look like this: <br />
        </p>
        <pre>
          <i>
    plain alphabet : abcdefghijklmnopqrstuvwxyz
    cipher alphabet: tosabcdefghijklmnpqruvwxyz
          </i>
        </pre>
        <p>
          As you can see we ommit duplicated letter and fill our key with next
          unused letters. An example encryption using the above key will be
          looking like this:
        </p>
        <pre>
          <i>
    plain text : defend the castle
    cipher text: abcbka reb stqrib
          </i>
        </pre>
        <p>
          Soo simple, now you can start encrypting messeges of your own 😉
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2>Specification & restrictions:</h2>
        <ul>
          <li>
            only english alphabet consisting of 26 chars (or you can define one
            of your own),
          </li>
          <li>you can also optionaly upload txt files</li>
          <li>
            it's possible to use special chars and chars specified for different
            languages but they won't be encrypted,
          </li>
          <li>
            whole application is executing in your browser and hosted from
            GitHub Pages, development happen on node server and with help of
            webpack and npm,
          </li>
          <li>
            ... whole project base is Vue framework with Vuetify as styling
            dependency,
          </li>
          <li>
            when it's comes to how much text you can encypt this is only limited
            by your browser and hardware possibilites, but in case of more than
            500 characters aplication performance pike down.
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SzyfrPodstawieniowyProsty",
  components: {
    Encryption: () => import("@/components/Encryption.vue"),
    Decryption: () => import("@/components/Decryption.vue")
  },
  data: () => ({
    encryptionKey: "",
    passedKey: "",
    baseAlphabet: "abcdefghijklmnopqrstuvwxyz",
    chars: "",
    fillDisabled: false,
    rules: {
      required: value => !!value || "Required!",
      alphabet: () => {
        return true;
      }
    }
  }),
  methods: {
    generateRandomKey() {
      var keychars = "abcdefghijklmnopqrstuvwxyz";
      var chars = keychars.split("");
      this.encryptionKey = "";
      let lim = chars.length;
      for (let i = 0; i < lim; i++) {
        let index = Math.floor(chars.length * Math.random());
        this.encryptionKey += chars[index];
        chars.splice(index, 1);
      }
      this.passedKey = this.encryptionKey;
      this.fillDisabled = true;
    },
    genKey() {
      var keychars = this.baseAlphabet;
      var chars = keychars.split("");

      console.log(this.encryptionKey.length);

      const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
      };

      var tmpKey = this.encryptionKey.split("").filter(distinct);

      for (let i = 0; i < this.encryptionKey.length; i++) {
        for (let g = 0; g < chars.length; g++) {
          if (this.encryptionKey[i] == chars[g]) {
            chars.splice(g, 1);
          }
        }
      }
      console.log(chars.join(""));
      console.log("Passed key: ", tmpKey.join("") + chars.join(""));

      this.passedKey = tmpKey.join("") + chars.join("");
      this.chars = chars.join("");
      this.fillDisabled = false;
    },
    fillKey() {
      //this.encryptionKey += this.chars;
      this.encryptionKey = this.passedKey;
      this.fillDisabled = true;
    },
    setAlphabetRules() {
      this.rules.alphabet = value => {
        if (this.baseAlphabet == "abcdefghijklmnopqrstuvwxyz") {
          const pattern = /^[abcdefghijklmnopqrstuvwxyz]+$/;
          return pattern.test(value) || "Invalid character!";
        } else {
          const pattern = new RegExp("^[" + this.baseAlphabet + "]+$");
          return pattern.test(value) || "Character out of alphabet!";
        }
      };
    }
  }
};
</script>
