import firestore from './FirebaseService'

export const UsersService = {
  get(){
    let id = localStorage.getItem('userId')
    return firestore.doc(`users/${id}`).get()
  },

  register(user){
    let reg;
    let id = localStorage.getItem('userId')
    if(!id){
      reg = firestore.collection('users').add(user).then(res =>{
        localStorage.setItem('userId',res.id)
        // alert('User registered success!')
        return res;
      }).catch(err=> console.error(err))
    }else{
      reg = firestore.collection('users').doc(id).update(user).then(res =>{
        // alert('User updated success!')
       }).catch(err=> console.error(err))
    }
    return reg;
  },

  needCheck(){
    return localStorage.getItem('userId') != undefined;
  },

  emailRegistered(email){
    return firestore.collection('users').where('email','==',email).get()
  }
}
