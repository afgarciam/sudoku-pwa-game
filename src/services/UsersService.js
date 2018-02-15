import firestore from './FirebaseService'

export const UsersService = {
  getAll(){
    return firestore.collection('users').get()
  }
}
