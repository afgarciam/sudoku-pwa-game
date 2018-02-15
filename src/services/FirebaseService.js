import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '../../config/firebase'

const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebase.firestore()
