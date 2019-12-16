<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Steganography</h1>
      </v-col>
      <ImageEncryption />
      <ImageDecryption />
      <v-col cols="12">
        <h2>How to use?</h2>
        <p>
          Enter message to encrypt onto image. Then upload your image. Message
          will be encypted automatically. If you want to change your secret
          message, then just type new message and click Encrypt Image. Then you
          can download image with encrypted message and send it to someone. To
          decyrpt message, just upload you image in decyprtion section.
        </p>

        <h2>How it works?</h2>
        <p>
          How algorithm works:
          <a
            href="http://ekryptografia.pl/steganografia/metoda-najmniej-znaczacego-bitu/"
            >link
          </a>
          <br />
          In this app, bits are encrypted on the last bits of RGB canals (Alfa
          canal is omitted). Image is always saved in PNG format.
        </p>

        <h2>Specification & restrictions:</h2>
        <ul>
          <li>
            for larger amount of text, image encyption is verry time consuming
            for CPU, soo short messages are the best ones,
          </li>
          <li>
            the same is for large images when it comes to decryption, the more
            pixels your image has, the longer will be decrypted,
          </li>
          <li>
            algorithm implementation is based on Canvas and plain Java Script
            code (More about
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas"
            >
              canvas
            </a>
            ... and about
            <a
              href="http://ekryptografia.pl/steganografia/metoda-najmniej-znaczacego-bitu/"
            >
              algorithm [PL]
            </a>
            ),
          </li>
          <li>
            allowed image formats are <i>.bmp</i>, <i>.png</i>, <i>.jpg</i> and
            dowloaded encrypted file is saved in <i>.png</i> format.
          </li>
        </ul>
      </v-col>
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
