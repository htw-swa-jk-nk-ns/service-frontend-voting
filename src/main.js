import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'


Vue.config.productionTip = false


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setZero(state) {
      state.count = 0;
    },
    setOne(state) {
      state.count = 1;
    }
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App),
  store: store
}).$mount('#app')
