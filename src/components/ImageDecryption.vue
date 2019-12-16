<template>
  <v-container>
    <h2>Decryption</h2>
    <v-row>
      <v-col cols="12">
        <template>
          <v-file-input
            v-model="file"
            placeholder="Upload your txt file"
            label="File input"
            accept=".png, .jpg, .bmp"
            prepend-icon="mdi-camera"
            show-size
            @change="loadImageFromFile"
          >
            <template v-slot:selection="{ text }">
              <v-chip small label color="purple">
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
        </template>
      </v-col>

      <v-col cols="6" sm="12" md="6" v-if="originalImage">
        <h5>Image with encrypted message</h5>
        <img height="100%" width="100%" :src="originalImage" />
      </v-col>

      <v-col cols="6" sm="12" md="6">
        <v-textarea
          color="deep-purple"
          readonly
          counter
          label="Decrypt output"
          prepend-icon="mdi-eye"
          placeholder="Decrypted text (readonly)..."
          v-model="decryptedText"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from "lodash";

export default {
  name: "ImageDecrypiton",
  data: () => ({
    imageToDecrypt: null,
    file: null,
    originalImage: "",
    decryptedText: ""
  }),
  methods: {
    async decryptImage() {
      let canvas = document.createElement("canvas");
      let originalImage = new Image();
      originalImage.src = this.imageToDecrypt;
      await originalImage;

      canvas.width = originalImage.width;
      canvas.height = originalImage.height;

      this.originalImage = originalImage.src;
      let canvasContext = canvas.getContext("2d");
      canvasContext.drawImage(
        originalImage,
        0,
        0,
        originalImage.width,
        originalImage.height
      );

      let canvasData = canvasContext.getImageData(
        0,
        0,
        originalImage.width,
        originalImage.height
      );

      //console.log(canvasData);

      let binaryString = "";

      for (let i = 0; i < canvasData.data.length; i += 4) {
        let red = _.padStart(canvasData.data[i].toString(2), 8, 0);
        //console.log("Red: ", red);

        let green = _.padStart(canvasData.data[i + 1].toString(2), 8, 0);
        //console.log("Green: ", green);

        let blue = _.padStart(canvasData.data[i + 2].toString(2), 8, 0);
        //console.log("Blue: ", blue);

        binaryString += red.charAt(7) + green.charAt(7) + blue.charAt(7);
      }

      //console.log(binaryString);

      for (let i = 0; i < binaryString.length; i += 8) {
        //console.log(binaryString.substring(i, i + 8));
        this.decryptedText += String.fromCharCode(
          parseInt(binaryString.substring(i, i + 8), 2)
        );
      }
    },
    loadImageFromFile() {
      const file = this.file;
      const reader = new FileReader();

      //reader.onload = e => this.$emit("load", e.target.result);
      reader.onload = e => {
        this.imageToDecrypt = e.target.result;
        this.decryptImage();
      };
      if (this.file) reader.readAsDataURL(file);
      else {
        this.originalImage = "";
        this.processedImage = "";
      }
    }
  }
};
</script>
