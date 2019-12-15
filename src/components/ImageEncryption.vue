<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Encryption</h2>
        <v-textarea
          color="deep-purple"
          clearable
          counter
          clear-icon="mdi-close-circle"
          label="Text to encrypt"
          rows="2"
          prepend-icon="mdi-pen"
          v-model="textToEncrypt"
          @click:clear="clear()"
        ></v-textarea>
        <p class="red--text" v-if="error">{{ error }}</p>
      </v-col>

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

      <v-col cols="12">
        <v-btn color="deep-purple" class="white--text" @click="encryptToImage()"
          >Encrypt Image</v-btn
        >
        <v-btn
          color="deep-purple"
          class="white--text ml-3"
          @click="saveProcessedImage()"
          >Save Processed Image</v-btn
        >
      </v-col>

      <v-col cols="6" sm="12" md="6" v-if="originalImage">
        <h5>Original Image</h5>
        <img height="100%" width="100%" :src="originalImage" />
      </v-col>

      <v-col cols="6" sm="12" md="6" v-if="processedImage">
        <h5>Image with encrypted text</h5>
        <img height="100%" width="100%" :src="processedImage" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from "lodash";

export default {
  name: "ImageEncrypiton",
  data: () => ({
    imageToEncrypt: null,
    file: null,
    originalImage: "",
    processedImage: "",
    textToEncrypt: "",
    error: ""
  }),
  methods: {
    loadImageToObject() {},
    async encryptToImage() {
      let canvas = document.createElement("canvas");
      let originalImage = new Image();
      originalImage.src = this.imageToEncrypt;
      await originalImage;

      canvas.width = originalImage.width;
      canvas.height = originalImage.height;

      this.error = "";
      if (
        originalImage.width * originalImage.height <
        this.textToEncrypt.length * 8
      )
        this.error = "Error: Text is to long to encrypt on this image.";

      if (this.file) this.originalImage = originalImage.src;

      if (this.textToEncrypt && this.file) {
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

        let binaryText = "";
        for (let i = 0; i < this.textToEncrypt.length; i++) {
          binaryText += _.padStart(
            this.textToEncrypt[i].charCodeAt(0).toString(2),
            8,
            0
          );
        }

        console.log(binaryText);

        String.prototype.replaceAt = function(index, replacement) {
          return (
            this.substr(0, index) +
            replacement +
            this.substr(index + replacement.length)
          );
        };

        let binaryCounter = 0;

        for (var i = 0; i < canvasData.data.length; i += 4) {
          let red = _.padStart(canvasData.data[i].toString(2), 8, 0);
          red = red.replaceAt(7, binaryText[binaryCounter++]);
          canvasData.data[i] = parseInt(red, 2); // red
          //console.log("Red: ", red);
          if (binaryCounter >= binaryText.length) break;

          let green = _.padStart(canvasData.data[i + 1].toString(2), 8, 0);
          green = green.replaceAt(7, binaryText[binaryCounter++]);
          canvasData.data[i + 1] = parseInt(green, 2); // green
          //console.log("Green: ", green);
          if (binaryCounter >= binaryText.length) break;

          let blue = _.padStart(canvasData.data[i + 2].toString(2), 8, 0);
          blue = blue.replaceAt(7, binaryText[binaryCounter++]);
          canvasData.data[i + 2] = parseInt(blue, 2); // blue
          //console.log("Blue: ", blue);
          if (binaryCounter >= binaryText.length) break;
        }

        //console.log("Inverted", canvasData);
        await canvasContext.putImageData(canvasData, 0, 0);
        this.processedImage = canvas.toDataURL();
      }
    },
    loadImageFromFile() {
      const file = this.file;
      const reader = new FileReader();

      //reader.onload = e => this.$emit("load", e.target.result);
      reader.onload = e => {
        this.imageToEncrypt = e.target.result;
        this.encryptToImage();
      };
      if (this.file) reader.readAsDataURL(file);
      else {
        this.originalImage = "";
        this.processedImage = "";
      }
    },
    clear() {
      this.textToEncrypt = "";
      this.processedImageUrl = "";
    },
    saveProcessedImage() {
      let link = document.createElement("a");
      link.setAttribute("href", this.processedImage);
      link.setAttribute(
        "download",
        "outImage-r" + this.textToEncrypt.length + ".png"
      );
      link.click();
    }
  }
};
</script>
