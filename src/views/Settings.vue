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
                    'http://service-raw-data:8889/vote',
                    'http://service-serving-layer:8080/vote',
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
        "http://service-raw-data:8889/vote",
        "http://service-serving-layer:8080/vote",
      ],
      alert: false,
    };
  },
  methods: {
    submit() {
      if (this.radioGroup === this.options[0]) {
        this.$store.commit("setZero");
        console.log("print zero");
      } else {
        this.$store.commit("setOne");
        console.log("print one");
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
