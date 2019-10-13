<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4 mt-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Data Protection Basics
        </h1>
        <p class="subheading font-weight-regular">
          Project for classes on the Basics of Data Protection at the Poznan
          University of Technology. The material mainly covers issues in the
          field of cryptography and cryptanalysis. It is also good code base &
          user interface example for other projects from that subject.
        </p>
      </v-flex>

      <v-flex mb-5 xs12>
        <h2 class="headline font-weight-bold mb-3">How to run?</h2>

        <v-layout justify-center>
          <p>
            You will need few things first:<br />
            <i>Node >= 12.6</i><br />
            <i>Chrome >= 75.0.0</i><br />
            <i>Some cli knowledge</i><br />
            Then type in your console command for developing purpose:
            <code>npm run serve</code><br />
            Or <code>npm run build</code> for case if you want to host
            application on some web server.
          </p>
        </v-layout>
      </v-flex>

      <v-flex mb-5 xs12>
        <h2 class="headline font-weight-bold mb-3">
          How I should use application?
        </h2>

        <v-layout justify-center>
          <p>
            I think that user interface is simply enought in use and easy to
            understand, that it doesn't need explanation. It was also created
            with using the best UX & Design patterns. Just simply clicks
            throught it and you will easy figure it out how it works.
            Additionaly whole project was parted on components which ones are
            easy to maitain and what's comes from that, the whole project is
            easy to extend.
          </p>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({})
};
</script>
