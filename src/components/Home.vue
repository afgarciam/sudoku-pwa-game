<template>
  <div class="home">
    <h1 class="title">SUDOKU</h1>
    <div class="row justify-content-center">
      <div class="col-12 col-sm-12 col-md-6">
        <button @click="play" class="btn btn-lg btn-play btn-block" >PLAY <i class="fa fa-play"></i></button>
      </div>
    </div>
    <div class="row justify-content-center home-controls">
      <div class="col-12 col-sm-12 col-md-6">
         <button class="btn"><i class="fa fa-tachometer"></i></button>
         <button class="btn" @click="goTo('about')" ><i class="fa fa-info"></i></button>
         <button class="btn" @click="goTo('profile')" ><i class="fa fa-user"></i></button>
      </div>
    </div>
  </div>
</template>

<script lang="js">
  import { UsersService } from "../services/UsersService";
  export default  {
    name: 'home',
    props: [],
    mounted() {
      this.$parent.setTitle('Home',false)

    //  const users = UsersService.getAll()
    //  users.then((u)=>{
    //    u.docs.forEach(user => {
    //      console.log(user.data())
    //    });
    //  })
    },
    data() {
      return {

      }
    },
    methods: {
      play:function (event) {
        if(!UsersService.needCheck()){
          this.$router.push({path:'/profile'})
        }else{
          this.$router.push({path:'/board'})
        }
      },
      goTo:function(route){
        this.$router.push({path:`/${route}`})
      }
    },
    computed: {

    }
}
</script>

<style scoped >
  .home{
     font-family:  Passero One;
     color:#E37462;
  }
  .home-controls{
    margin-top: 7rem;
  }
  .home-controls .btn{
    width: 31%;
  }
  .title {
    font-size: 3rem;
    text-align: center;
    margin: 2rem 0;
  }
  .btn-play{
    font-size: 2rem;
    color:#E37462;
  }
</style>
