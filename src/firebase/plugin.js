import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

var FirebasePlugin = {
  db: () => firebase.database(),
  firestore: () => firebase.firestore(),
  auth: () => firebase.auth(),
  storage: () => firebase.storage()
}

export default function (Vue, options) {
  if (!firebase.apps.length) firebase.initializeApp(options)
  Vue.prototype.$firebase = FirebasePlugin
}