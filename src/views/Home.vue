<template>
  <div class="home">
    <h1 class="subheading grey--text">HomePage</h1>

    <v-container class="my-5">
      <v-layout row wrap justify-space-around>
        <v-card>
          <v-card-title>
            <h2>Whats the best color?</h2>
          </v-card-title>
          <v-card-text>
            <v-form class="px-3" ref="form">
              <h4 class="mt-5">About you</h4>
              <v-text-field
                label="Your Name"
                v-model="voterName"
                :rules="inputRules"
              ></v-text-field>
              <v-select
                :items="items"
                label="Select your country."
                v-model="selectModel"
                :rules="selectRules"
              ></v-select>
              <h4 class="mt-5">Your vote</h4>
              <v-radio-group v-model="radioGroup" :rules="radioRules">
                <v-radio
                  v-for="n in ['red', 'green', 'blue']"
                  :key="n"
                  :label="`${n}`"
                  :value="n"
                  :color="n"
                ></v-radio>
              </v-radio-group>
              <v-btn text class="success mt-3" @click="submit">Vote</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import country from "countries-list";

export default {
  data() {
    return {
      country: "country.countries.ad.name",
      voterName: "",
      radioGroup: null,
      selectModel: null,
      totalVuePackages: 0,
      inputRules: [(w) => w.length > 5 || "Minimum 5 chars required."],
      radioRules: [(w) => w != null || "No party has been selected."],
      selectRules: [(w) => w != null || "No country has been selected."],
      postURL: "https://reqbin.com/echo/post/json",
      items: [...this.getCountries()],
    };
  },
  methods: {
    getCountries() {
      let countries = [];
      // eslint-disable-next-line no-unused-vars
      Object.entries(country.countries).forEach(([key, value]) => {
        countries.push(value.name);
      });
      return countries;
    },

    getCountriesReduced() {
      return Object.entries(country.countries).reduce(function (acc, next) {
        //console.log(next);
        return acc.concat(next[1].name);
      }, []);
    },

    submit() {
      /// Validates and prints the input
      /// Should later be used to post new votes.
      /// Maybe navigate to thank you screen.
      if (this.$refs.form.validate()) {
        //console.log(this.voterName, this.radioGroup, this.selectModel);
        this.postVote({
          name: this.voterName,
          country: this.selectModel,
          candidate: this.radioGroup,
        });
        this.$router.push("thanks");
      } else {
        console.log("Input validation showed problems.");
      }
    },
    postVote(vote) {
      console.log(vote);
      var url = this.postURL;

      // construct an HTTP request
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

      // send the collected data as JSON
      xhr.send(JSON.stringify(vote));

      xhr.onloadend = function () {
        // done
        console.log("Message sent.");
      };
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
