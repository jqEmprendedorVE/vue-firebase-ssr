import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

import Firebase from './plugins/Firebase.js'

Vue.use(Firebase, {
  apiKey: "AIzaSyAAK1BbKbm-8yvXYM1KoR46WMV8Mmwvp_M",
  authDomain: "vue-firebase-ssr.firebaseapp.com",
  databaseURL: "https://vue-firebase-ssr.firebaseio.com",
  projectId: "vue-firebase-ssr",
  storageBucket: "vue-firebase-ssr.appspot.com",
  messagingSenderId: "1095964078851"  
})

export function createApp (context) {
  const router = createRouter()
  const store = createStore()

  // sync so that route state is available as part of the store
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}