import firestore from './FirebaseService'

export const UsersService = {
  getAll(){
    return firestore.collection('users').get()
  },
  get(id){
    return firestore.collection('users').doc(`users/${id}`)
  },
  get(){
    let id = localStorage.getItem('userId')
    return firestore.doc(`users/${id}`).get()
  },
  register(user){
    let reg = firestore.collection('users').add(user).then(res =>{
      localStorage.setItem('userId',res.id)
      alert('User registered success!')
      return res;
    }).catch(err=> console.error(err))

    return reg;
  },
  update(user){
    let id = localStorage.getItem('userId')
    let reg = firestore.collection('users').doc(id).update(user).then(res =>{
     console.log('user updated success')
     alert('User updated success!')
    }).catch(err=> console.error(err))

    return reg;
  },
  needCheck(){
    return localStorage.getItem('userId') != undefined;
  },
  checkEmail(email){
    var exists =false
    firestore.collection('users').where('email','==',email).get().then(val=>{
     exists = val.empty
    })
    return exists
  }
}
