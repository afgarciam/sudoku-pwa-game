<template>

  <section class="profile">
    <div id="check" v-if="!checked">
      <h1>Vefiry you Email</h1>
      <form @submit.prevent="checkEmail">
        <div class="col-12 form-group">
          <label for="emailChek" class="d-none d-md-block">Email</label>
          <input type="emailChek" name="emailChek" id="emailChek" v-model="emailChek" class="form-control" required placeholder="Email">
        </div>
         <button type="submit" class="btn btn-lg btn-block">Verify</button>
      </form>

    </div>

    <div id="register" v-if="register">
       <h1>Register</h1>
    <form @submit.prevent="setUser">
      <div class="row">
        <div class="col-12 form-group">
          <label for="email" class="d-none d-md-block">Email</label>
          <input type="email" name="email" id="email" v-model="email" class="form-control" required placeholder="Email">
        </div>
        <div class="col-12 form-group">
          <label for="firstName"  class="d-none d-md-block">First Name</label>
          <input type="text" name="firstName" id="firstName" v-model="firstName" class="form-control" required placeholder="First Name">
        </div>
        <div class="col-12 form-group">
          <label for="lastName" class="d-none d-md-block">Last name</label>
          <input type="text" name="lastName" id="lastName" v-model="lastName" class="form-control" placeholder="Last Name" >
        </div>
        <div class="col-12 form-group">
          <label for="nick"  class="d-none d-md-block">Nick</label>
          <input type="text" name="nick" id="nick" v-model="nick" class="form-control" placeholder="Nick">
        </div>
      </div>
      <input type="submit" class="btn btn-lg btn-block" :value="registerAction" />
    </form>
    </div>


  </section>

</template>

<script lang="js">
  import { UsersService } from "../services/UsersService.js";
  export default  {
    name: 'profile',
    props:[],
    data() {
      return {
        checked:false,
        register:false,
        emailChek:'',
        firstName:'',
        lastName:'',
        email:'',
        nick:'',
        registerAction:'Register'
      }
    },
    beforeMount(){
      this.checked = UsersService.needCheck()
     if(this.checked){
       UsersService.get().then(u=>{
        this.register = true
        let user = u.data()
         this.firstName = user.firstName
         this.lastName = user.lastName
         this.email = user.email
         this.nick = user.nick
       })
     }
    },
    mounted(){
     this.$parent.setTitle('Profile')
    },
    methods: {
      setUser:function (event) {
           UsersService.register({
           firstName: this.firstName,
           lastName: this.lastName,
           email: this.email,
           nick: this.nick
          })
        this.$router.push({path:'/board'})
      },
      checkEmail:function(){
        UsersService.emailRegistered(this.emailChek).then(val=>{
           this.register = !val.empty
           let data = val.docs[0].data()
           this.firstName = data.firstName
           this.lastName = data.lastName
           this.email = data.email
           this.nick = data.nick
           localStorage.setItem('userId', val.docs[0].id)
           this.registerAction = 'Update'
        }).catch(err =>{
          this.register = true
          console.error(err)
        })

        this.checked = true;
      }
    },
    computed: {

    }
}
</script>

<style scoped>
.profile {
}
</style>
