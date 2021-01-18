<template>
  <div class="about">
    <h1 class="subheading grey--text">Settings</h1>

    <v-container class="my-5">
      <v-layout column wrap justify-space-around>
        <v-card>
          <v-card-title>
            <h2>Network</h2>
          </v-card-title>
          <v-card-text>
            <v-form class="px-3" ref="form">
              <h4 class="mt-5">Which post-url shall be used?</h4>
              <v-radio-group v-model="radioGroup">
                <v-radio
                  v-for="n in [
                    'http://voting-app.com/vote',
                    'http://voting-app.com/',
                    'http://192.168.64.2:31117/vote',
                  ]"
                  :key="n"
                  :label="`${n}`"
                  :value="n"
                  :color="n"
                ></v-radio>
              </v-radio-group>
              <v-btn text class="success mt-3" @click="submit"
                >Save settings</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-layout>
      <v-alert
        :value="alert"
        elevation="8"
        type="success"
        transition="scale-transition"
        max-width="300"
        >Settings saved
      </v-alert>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radioGroup: null,
      options: [
        "http://voting-app.com/vote",
        "http://voting-app.com/",
        "http://192.168.64.2:31117/vote",
      ],
      alert: false,
    };
  },
  methods: {
    submit() {
      if (this.radioGroup === this.options[0]) {
        this.$store.commit("setZero");
        console.log("print zero");
      } else if (this.radioGroup === this.options[1]) {
        this.$store.commit("setOne");
        console.log("print one");
      } else if (this.radioGroup === this.options[2]) {
        this.$store.commit("setTwo");
        console.log("print two");
      }
      console.log(this.$store.state.count);
      this.alert = true;
      setTimeout(() => {
        console.log("time out set");
        this.alert = false;
      }, 5000);
    },
  },
  created() {
    this.radioGroup = this.options[this.$store.state.count];
  },
};
</script>
