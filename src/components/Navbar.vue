<template>
  <nav>
    <v-app-bar flat class="grey--text">
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="font-weight-light">Voting</span>
        <span>Application</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="navigateToGithub">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="drawer = false" router to="/">
            <v-list-item-title>Home Page</v-list-item-title>
          </v-list-item>

          <v-list-item router to="/about">
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  methods: {
    navigateToGithub: function () {
      window.location.href = "https://github.com/htw-swa-jk-nk-ns";
    },
  },
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
};
</script> 