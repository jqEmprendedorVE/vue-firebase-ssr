import Vue from 'vue'
import firebase from 'firebase'
import 'Firebase/firestore'

var FirebasePlugin = {
  db: () => firebase.database(),
  firestore: () => firebase.firestore(),
  auth: () => firebase.auth(),
  storage: () => firebase.storage()
}

export default function (Vue, options) {
  if (!firebase.apps.length) firebase.initializeApp(options)
  Vue.firebase = FirebasePlugin
  Object.defineProperties(Vue.prototype, {
    $firebase: {
      get: function () {
        return Vue.firebase
      }
    }
  })
}