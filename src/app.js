import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import Firebase from './firebase/plugin'
import headMixin from './util/head'

Vue.mixin(headMixin)

export function createApp (context) {
  const router = createRouter()
  const store = createStore()

  /*
   * Add property $firebase tu Vue instance
   */
  Vue.use(Firebase, store.state.config)

  // sync so that route state is available as part of the store
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}