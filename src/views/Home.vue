<template>
  <div class="home">
    <h1 class="subheading grey--text">HomePage</h1>

    <v-container class="my-5">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
        laboriosam qui corrupti veritatis! Rerum quia neque quidem et amet
        ducimus quisquam atque, architecto aliquam mollitia itaque praesentium
        assumenda! Perferendis, ab. Currently there are a total of
        {{ totalVuePackages }} available.
      </p>

      <v-layout row wrap justify-space-around>
        <v-card>
          <v-card-title>
            <h2>Whats the best color?</h2>
          </v-card-title>
          <v-card-text>
            <v-form class="px-3" ref="form">
              <v-text-field
                label="Your Name"
                v-model="voterName"
                :rules="inputRules"
              ></v-text-field>
              <v-radio-group v-model="radioGroup" :rules="radioRules">
                <v-radio
                  v-for="n in ['red','green', 'blue']"
                  :key="n"
                  :label="`${n}`"
                  :value="n"
                  :color="n"
                ></v-radio>
              </v-radio-group>
              <v-btn flat class="success mt-3" @click="submit">Vote</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      voterName: "",
      radioGroup: null,
      totalVuePackages: 0,
      inputRules: [(w) => w.length > 5 || "Minimum 5 chars required."],
      radioRules: [(w) => w != null || "No party has been selected."],
    };
  },
  methods: {
    submit() {
      /// Validates and prints the input
      /// Should later be used to post new votes.
      /// Maybe navigate to thank you screen.
      if (this.$refs.form.validate()) {
        console.log(this.voterName, this.radioGroup);
        this.$router.push('thanks')
      } else {
        console.log("Input validation showed problems.");
      }
    },
  },
  created() {
    // Simple GET request using fetch
    // Should later be used to fetch title and questions.
    fetch("https://api.npms.io/v2/search?q=vue")
      .then((response) => response.json())
      .then((data) => (this.totalVuePackages = data.total));
  },
};
</script>
