import Vue from 'vue'
import Vuex from 'vuex'

import { db, fetch } from '../firebase'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      config: {
        apiKey: "AIzaSyAAK1BbKbm-8yvXYM1KoR46WMV8Mmwvp_M",
        authDomain: "vue-firebase-ssr.firebaseapp.com",
        databaseURL: "https://vue-firebase-ssr.firebaseio.com",
        projectId: "vue-firebase-ssr",
        storageBucket: "vue-firebase-ssr.appspot.com",
        messagingSenderId: "1095964078851"  
      },
      items: {}
    },
    actions: {
      fetchItem ({ commit, state }, id ) {
        return fetch(
          db(state).ref('data')
        ).then(item => {
          commit('setItem', { id, item } )
        })
      }
    },
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    }
  })
}