import firebase from 'firebase/app'
import 'firebase/database'

export function db (state) {
  if(firebase.apps.length===0) firebase.initializeApp(state.config)
  return firebase.database()
}

export function fetch (ref) {
  return new Promise((resolve, reject) => {
    ref.once('value',snapshot=>{
      resolve(snapshot.val())
    }, reject)
  })
}
