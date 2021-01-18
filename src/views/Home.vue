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
      <v-alert
        :value="alert"
        elevation="8"
        type="error"
        transition="scale-transition"
        max-width="250"
        >Error while sending vote.
      </v-alert>
    </v-container>
  </div>
</template>

<script>
import country from "countries-list";

///DEBUG URL
///http://cors-anywhere.herokuapp.com/https://webhook.site/4442ad66-8721-4774-ac71-543e49583b28

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
      items: [...this.getCountries()],
      options: [
        "http://voting-app.com/vote",
        "http://voting-app.com/",
        "http://192.168.64.2:31117/vote",
      ],
      alert: false,
      error: 0,
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
        this.postVote(
          {
            name: this.voterName,
            country: this.selectModel,
            candidate: this.radioGroup,
          },
          this.navigateToThanks,
          this.errorHandling
        );
      } else {
        console.log("Input validation showed problems.");
      }
    },
    navigateToThanks() {
      this.$router.push("thanks");
    },
    postVote(vote, callback, errorCallback) {
      //Log constructed vote object
      console.log(vote);
      console.log("\n");

      this.postURL = this.options[this.$store.state.count];

      //Log used PostURL
      var url = this.postURL;
      console.log("POST_URL::" + url + "\n");

      // construct an HTTP request
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

      // send the collected data as JSON
      xhr.send(JSON.stringify(vote));

      xhr.onerror = function () {
        console.log("Error occured");
        this.error = 1;
      };

      xhr.onloadend = function () {
        // done
        if (this.error == 0) {
          console.log("Message sent.");
          callback();
        } else {
          errorCallback();
        }
      };
    },
    errorHandling() {
      // reset form and display alert
      this.error = 0;
      this.alert = true;
      //this.$refs.form.reset();
      setTimeout(() => {
        console.log("time out set");
        this.alert = false;
      }, 5000);
    },
  },
  created() {
    //console.log("Value of url field: " + this.postURL + "\n");

    // Simple GET request using fetch
    // Should later be used to fetch title and questions.
    fetch("https://api.npms.io/v2/search?q=vue")
      .then((response) => response.json())
      .then((data) => (this.totalVuePackages = data.total));
  },
};
</script>
